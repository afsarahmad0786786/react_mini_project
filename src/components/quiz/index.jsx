import { useState, useEffect } from 'react';
import axios from 'axios';
import './style.scss'
import '../../assets/styles/global.scss';

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        const res = await axios.get('https://opentdb.com/api.php?amount=10&type=multiple');
        setQuestions(res.data.results);
    };

    const handleAnswerOptionClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    return (
        <div className='login-form-container'>
            <div className='app1'>
                {showScore ? (
                    <div className='score-section'>
                        You scored {score} out of {questions.length}
                    </div>
                ) : (
                    questions.length > 0 && (
                        <>
                            <div className='question-section'>
                                <div className='question-count'>
                                    <span>Question {currentQuestion + 1}</span>/{questions.length}
                                </div>
                                <div className='question-text'>{questions[currentQuestion].question}</div>
                            </div>
                            <div className='answer-section'>
                                {questions[currentQuestion].incorrect_answers.map((answer, index) => (
                                    <button className='mb-2' onClick={() => handleAnswerOptionClick(false)} key={index}>{answer}</button>
                                ))}
                                <button onClick={() => handleAnswerOptionClick(true)}>
                                    {questions[currentQuestion].correct_answer}
                                </button>
                            </div>
                        </>
                    )
                )}
            </div>
        </div>
    );
};

export default Quiz;
