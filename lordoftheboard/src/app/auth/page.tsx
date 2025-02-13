"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Auth = () => {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(false);
    const [credential, setCredential] = useState({ username: '', email: '', password: '' });
    

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };
    const handleSign = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { username, email, password } = credential;
            const response = await fetch(process.env.SIGNIN || "http://localhost:3000/api/auth/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (!response.ok) {
                const errorText = await response.text(); // Get the error message from the response
                throw new Error(`Network response was not ok: ${errorText}`);
            }

            const json = await response.json();
            
            sessionStorage.setItem('username', credential.username);// Save the username
            toast.success('Account Created!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            console.log(json);
            setTimeout(() => {
                
            }, 1000);
        } catch (error) {
            toast.error('Fill all the fields correctly!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            console.error('Error during signup:', error);
        }
    }
    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(process.env.LOGIN || 'http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: credential.username,
                    password: credential.password,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text(); // Get the error message from the response
                throw new Error(`Network response was not ok: ${errorText}`);
            }

            const json = await response.json();
            sessionStorage.setItem('token', json.token); // Save the token
            sessionStorage.setItem('username', credential.username);// Save the username

            toast.success('Successfully Logged In!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });

            setTimeout(() => {
                router.push(`/${credential.username}`); 
            }, 1000);

        } catch (error) {
            toast.error('Invalid Credentials or Failed to Fetch User Details!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            console.error('Error during login:', error);
        }
    };
    return (
        <div className="absolute flex h-screen w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
            <ToastContainer />
            {/* Circle Background */}
            <div
                className={`absolute h-[200%] w-1/2 bg-gradient-to-br from-gray-900 to-gray-800 transition-transform duration-700 ease-in-out
                ${isLogin ? 'translate-x-[120%]' : '-translate-x-1/4'}`}
                style={{
                    borderRadius: '50%',
                    top: '-50%',
                }}
            >
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-[-25%] text-center text-white">
                    <h1 className="text-4xl font-bold">
                        {isLogin ? "Welcome Back!" : "Join Us!"}
                    </h1>
                    <p className="mt-2 text-gray-300">
                        {isLogin ? "Please login to continue" : "Create an account to get started"}
                    </p>
                </div>
            </div>


            {/* Form Container */}
            <div className={`absolute w-full flex justify-center transition-transform duration-700 ease-in-out
                ${isLogin ? 'translate-x-[-16.67%]' : 'translate-x-[16.67%]'}`}>
                {/* Main Title */}
                <div className="absolute top-8 w-full text-center z-10">
                    <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 drop-shadow-lg transform hover:scale-105 transition-transform duration-300">
                        Lord Of The Board
                    </h1>
                    <div className="mt-2 text-sm font-medium text-gray-600">
                        Where Strategy Meets Excellence
                    </div>
                </div>
                <div className="w-96 mt-32">
                    <div className="w-full p-8 space-y-6 bg-white shadow-2xl rounded-lg backdrop-blur-sm bg-opacity-95 min-h-[450px]">
                        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700 text-center">
                            {isLogin ? "Login to Your Account" : "Create an Account"}
                        </h2>
                        <form className="space-y-4" onSubmit={isLogin ? handleLogin : handleSign}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Username</label>
                                <input
                                    type="text"
                                    className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                                    required
                                    value={credential.username}
                                    onChange={(e) => setCredential({ ...credential, username: e.target.value })}
                                />
                            </div>
                            {!isLogin && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                                        required
                                        value={credential.email}
                                        onChange={(e) => setCredential({ ...credential, email: e.target.value })}
                                    />
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type="password"
                                    className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                                    required
                                    value={credential.password}
                                    onChange={(e) => setCredential({ ...credential, password: e.target.value })}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-2.5 rounded-md hover:from-gray-800 hover:to-gray-700 transition-all duration-300 transform hover:scale-[1.02] mt-4"
                            >
                                {isLogin ? "Log In" : "Sign Up"}
                            </button>
                        </form>

                        <p className="text-sm text-gray-600 text-center">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}
                            <button
                                onClick={toggleForm}
                                className="text-gray-900 font-medium ml-1 hover:underline hover:text-gray-700 transition-colors"
                            >
                                {isLogin ? "Sign Up" : "Log in"}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;