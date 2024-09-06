import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { hostname } from '../config';
import { signUp } from '../store/auth-slice';
import { useDispatch, useSelector } from 'react-redux';

const SignUp = () => {

    const navigate = useNavigate();
    const [uname, setUname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [comparePass, setComparePass] = useState("");
    const [error1, setError] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [file, setFile] = useState("");

    const { loading, error } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'image/jpeg') {
            setSelectedFile(file);
        } else {
            setSelectedFile(null);
            setError('Please upload a valid JPG image.');
        }
        if (!file) {
            console.error('No file selected');
            return;
        }
        setFile(file);
    };

    const signupData = async (e) => {
        e.preventDefault();
        if (password !== comparePass) {
            setError("Passwords do not match");
            return; // Stops further processing if passwords do not match
        }

        const userpic = selectedFile;
        // console.log(userpic)

        const formData = new FormData();  // Create a new FormData object
        formData.append('uname', uname);  // Append all form fields
        formData.append('email', email);
        formData.append('password', password);
        formData.append('userpic', selectedFile);
        
        // if (selectedFile) {
        //       // Append the file
        // }

        dispatch(signUp(formData))
            .then((result) => {
                // console.log(result.payload.result)
                if (result.payload && !result.payload.result) {
                    setUname("");
                    setEmail("");
                    setSelectedFile(null);
                    setPassword("");
                    setError("");
                    navigate('/');
                } else {
                    setError(result.payload.result);
                    // console.log(result.payload ? result.payload.result : result.error.message);
                    // console.log(error);
                }
            })
            .catch((error) => {
                console.error("Sign-up error:", error);
            });
    }

    useEffect(() => {
        if (localStorage.getItem("user")) {
            navigate('/');
        }
    }, [navigate])

    return (
        <div
            className="w-80 rounded-lg shadow h-auto p-6 bg-myGrey relative overflow-hidden"
        >
            <div className="flex flex-col justify-center items-center space-y-2">
                <h2 className="text-2xl font-medium text-slate-700">Sign Up</h2>
                <p className="text-black">Enter fake details below.</p>
            </div>
            <form className="w-full mt-4 space-y-3" onSubmit={signupData} encType="multipart/form-data">
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
                        id="userpic"
                        name="userpic"
                        type="file"
                        accept=".jpg, .jpeg"
                        onChange={handleImageChange}
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
                {error1 && <p className="text-red-500 text-center">{error1}</p>}
                <button
                    className="w-full justify-center py-1 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md text-white ring-2"
                    id="login"
                    name="login"
                    type="submit"
                >
                    {loading ? 'Loading...' : 'Sign Up'}
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
