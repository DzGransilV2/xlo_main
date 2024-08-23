import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const navigate = useNavigate();
    const [uname, setUname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [comparePass, setComparePass] = useState("");
    const [error, setError] = useState("");

    const signupData = async (e) => {
        e.preventDefault();
        if (password !== comparePass) {
            setError("Passwords do not match");
            return; // Stops further processing if passwords do not match
        }
        setError("");
        // console.log(uname, email, password);
        try {
            const response = await axios.post('http://localhost:8000/signup', { uname, email, password });
            // console.log(response.data);
            localStorage.setItem("user",JSON.stringify(response.data));
            navigate('/login');
        } catch (err) {
            // console.error('Error signing up:', err);
            setError('Error signing up. Please try again.');
        }
    }

    useEffect(()=>{
        if(localStorage.getItem("user")){
            navigate('/');
        }
    })

    return (
        <div
            className="w-80 rounded-lg shadow h-auto p-6 bg-myGrey relative overflow-hidden"
        >
            <div className="flex flex-col justify-center items-center space-y-2">
                <h2 className="text-2xl font-medium text-slate-700">Sign Up</h2>
                <p className="text-black">Enter details below.</p>
            </div>
            <form className="w-full mt-4 space-y-3" onSubmit={signupData}>
                <div>
                    <input
                        className="outline-none border-2 rounded-md px-2 py-1 text-black w-full focus:border-blue-300"
                        placeholder="Username"
                        id="username"
                        name="username"
                        type="text"
                        onChange={(e) => setUname(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        className="outline-none border-2 rounded-md px-2 py-1 text-black w-full focus:border-blue-300"
                        placeholder="Email"
                        id="email"
                        name="email"
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        className="outline-none border-2 rounded-md px-2 py-1 text-black w-full focus:border-blue-300"
                        placeholder="Password"
                        id="password"
                        name="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        className="outline-none border-2 rounded-md px-2 py-1 text-black w-full focus:border-blue-300"
                        placeholder="Confirm Password"
                        id="confirmpassword"
                        name="confirmpassword"
                        type="password"
                        onChange={(e) => setComparePass(e.target.value)}
                    />
                </div>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <button
                    className="w-full justify-center py-1 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md text-white ring-2"
                    id="login"
                    name="login"
                    type="submit"
                >
                    Sign Up
                </button>
                <p className="flex justify-center space-x-1">
                    <span className="text-slate-700"> Have an account? </span>
                    <Link to='/login' className="text-blue-500 hover:underline">Login</Link>
                </p>
            </form>
        </div>
    )
}

export default SignUp
