
import { useForm } from 'react-hook-form';
import './style.scss';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log("Login with:", data);
        // Add logic for login
    };

    const handleRegisterClick = () => {
        navigate('/register');
    };

    return (
        <div className="login-form-container">
            <div className="login-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                            type="email"
                            id="email"
                        />
                        {errors.email && <p className="error-message">{errors.email.message}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            {...register("password", { required: "Password is required" })}
                            type="password"
                            id="password"
                        />
                        {errors.password && <p className="error-message">{errors.password.message}</p>}
                    </div>
                    <div className="form-actions">
                        <button type="submit">Login</button>
                        <button type="button" onClick={handleRegisterClick}>Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
