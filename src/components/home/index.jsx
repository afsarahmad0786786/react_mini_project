import { Link } from 'react-router-dom';
import './style.scss';
import quiz from "../../assets/images/quiz.png";
import weather from "../../assets/images/weather.jpg";
import movies from "../../assets/images/movies.png";
import ecommerce from "../../assets/images/ecommerce.png";
import github from "../../assets/images/github.webp";
import notes from "../../assets/images/notes.png";
import task from "../../assets/images/task.png";

const Home = () => {
    // Sample data for cards
    const cardsData = [
        { id: 1, name: 'quiz', title: 'Quiz Game', description: 'Try Quiz..', image: quiz },
        { id: 2, name: 'weather', title: 'Weather', description: 'Check Current Weather', image: weather },
        { id: 3, name: 'ecommerce', title: 'Ecommerce', description: 'Try Online Shopping', image: ecommerce },
        { id: 4, name: 'task', title: 'Task Manager', description: 'Create your task', image: task },
        { id: 5, name: 'notesapp', title: 'Notes App', description: 'Create your Notes', image: notes },
        { id: 6, name: 'movie', title: 'Movies List', description: 'Find Your Movies', image: movies },
        { id: 7, name: 'github', title: 'Git Hub', description: 'Check Your GitHUb Profile', image: github },
        // { id: 8, name: 'weather', title: 'Weather', description: 'Check Current Weather', image: weather },
        // Add more card data as needed
    ];

    return (
        <div>
            <h2>Mini Project of React</h2>
            <div className="cards">
                {cardsData.map((card) => (
                    <div key={card.id} className="card1">
                        <Link to={`project/${card.name}`}> {/* Removed leading / from to attribute */}
                            <img src={card.image} alt={card.title} />
                            <h3>{card.title}</h3>
                            <p>{card.description}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
