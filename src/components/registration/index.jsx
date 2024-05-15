import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';



import './style.scss'

const Registration = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await fakeRegisterAPI(data);  // Assuming this is an async function
            console.log("Registration successful:", response);
            navigate('/')  // Redirect to login on successful registration
        } catch (error) {
            console.error("Registration failed:", error);
            // Handle errors (e.g., show error message to user)
        }

    };

    const fakeRegisterAPI = (data) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (data.email === "test@example.com") {
                    reject("Email already exists");
                } else {
                    resolve("Registered successfully");
                }
            }, 1000);
        });
    };

    return (
        <div className="registration-form">
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
                    {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        {...register("password", { required: "Password is required" })}
                        type="password"
                        id="password"
                    />
                    {errors.password && <p>{errors.password.message}</p>}
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Registration;