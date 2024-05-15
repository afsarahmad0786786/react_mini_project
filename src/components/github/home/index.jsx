import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../../assets/styles/global.scss'
import './style.scss'

const HomePage = () => {
    const [username, setUsername] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch 10 default GitHub profiles
        axios.get('https://api.github.com/users?per_page=10')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleInputChange = (event) => {
        setUsername(event.target.value);
    };

    const handleSearch = () => {
        if (username.trim()) {
            navigate(`/user/${username.trim()}`);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && username.trim()) {
            history.push(`/user/${username.trim()}`);
        }
    };

    return (
        <div className='login-form-container'>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Enter GitHub username"
                    value={username}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className="search-input"

                />
                <button onClick={handleSearch} className="search-button">
                    Search
                </button>
            </div>
            <div className="container mt-5">
                <div className="row">
                    {users.map(user => (
                        <div className="col-md-4" key={user.id}>
                            <div className="card">
                                <img src={user.avatar_url} className="card-img-top" alt={user.login} />
                                <div className="card-body">
                                    <h5 className="card-title">{user.login}</h5>
                                    <Link to={`/user/${user.login}`} className="btn btn-primary">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
