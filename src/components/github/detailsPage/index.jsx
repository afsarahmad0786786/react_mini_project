import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './style.scss';
import '../../../assets/styles/global.scss'

const DetailsPage = () => {
    const { username } = useParams();
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`https://api.github.com/users/${username}`);
                setUserDetails(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [username]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!userDetails) return <div>No user details available.</div>;

    return (
        <div className='login-form-container'>
            <div className="details-container">
                <div>
                    <Link to="/project/github">Back</Link>
                </div>
                <div className="card">
                    <div className="card-header">
                        <img src={userDetails.avatar_url} className="d-flex justify-content-center avatar" style={{ height: "256px", width: "17rem", marginLeft: "40%" }} alt={userDetails.name} />
                        <h1>{userDetails.name || userDetails.login}</h1>
                        <p>{userDetails.bio}</p>
                    </div>
                    <div className="card-body">
                        <ul>
                            <li><strong>Username:</strong> {userDetails.login}</li>
                            <li><strong>Company:</strong> {userDetails.company || 'N/A'}</li>
                            <li><strong>Location:</strong> {userDetails.location || 'N/A'}</li>
                            <li><strong>Number of Repositories:</strong> {userDetails.public_repos}</li>
                            <li><strong>Followers:</strong> {userDetails.followers}</li>
                            <li><strong>Following:</strong> {userDetails.following}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailsPage;
