import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/auth-slice';

const Login = () => {

    const [uname, setUname] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const {loading} = useSelector((state)=>state.auth);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const loginData = async (e) => {
        e.preventDefault();
        // try {
        //     const response = await axios.post(`${hostname}/login`, { uname, password });
        //     // console.log(response.data)
        //     if (!response.data.result) {
        //         // console.log(response.data)
        //         localStorage.setItem("user", JSON.stringify(response.data));
        //         navigate('/');
        //         setError("");
        //     } else {
        //         setError(response.data.result);
        //     }
        // } catch (error) {
        //     setError("An error occurred while logging in. Please try again.");
        // }

        let userCredential = { uname, password }

        dispatch(login(userCredential)).then(
            (result) => {
                // console.log("Payload",result.payload);
                if (!result.payload.result) {
                    setUname("");
                    setPassword("");
                    setError("")
                    navigate('/');
                }else{
                    setError(result.payload.result);
                    // console.log(result.payload.result)
                }
            }
        );

    }

    const userData = {"_id": "66db1d8773424607c1a0deda",
        "uname": "dz",
        "email": "asfas@gmal.com",
        "userpic": "https://firebasestorage.googleapis.com/v0/b/xlomain.appspot.com/o/userpics%2F64697d422c453e1976381812a55e8d81_20181209_202141.jpg?alt=media&token=80702fb1-cf7c-4d0a-97fd-d5f9df97c157",
        "__v": 0}
    localStorage.setItem("user", JSON.stringify(userData));
    console.log(userData)
    const auth = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY2ZGIxZDg3NzM0MjQ2MDdjMWEwZGVkYSIsInVuYW1lIjoiZHoiLCJlbWFpbCI6ImFzZmFzQGdtYWwuY29tIiwidXNlcnBpYyI6Imh0dHBzOi8vZmlyZWJhc2VzdG9yYWdlLmdvb2dsZWFwaXMuY29tL3YwL2IveGxvbWFpbi5hcHBzcG90LmNvbS9vL3VzZXJwaWNzJTJGNjQ2OTdkNDIyYzQ1M2UxOTc2MzgxODEyYTU1ZThkODFfMjAxODEyMDlfMjAyMTQxLmpwZz9hbHQ9bWVkaWEmdG9rZW49ODA3MDJmYjEtY2Y3Yy00ZDBhLTk3ZmQtZDVmOWRmOTdjMTU3IiwiX192IjowfSwiaWF0IjoxNzI1ODg5MjkzLCJleHAiOjE3MjY0OTQwOTN9.SVjAK-1KlJbCXhRNHHOCS5_MErma53-oqQlk_J-wFDg";
    localStorage.setItem("token", JSON.stringify(auth));
    console.log(auth)

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
                <h2 className="text-2xl font-medium text-slate-700">Login</h2>
                <p className="text-black">Enter details below.</p>
            </div>
            <form className="w-full mt-4 space-y-3" onSubmit={loginData}>
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
                        placeholder="Password"
                        id="password"
                        name="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {/* <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            className="mr-2 w-4 h-4"
                            id="remember"
                            name="remember"
                            type="checkbox"
                        />
                        <span className="text-black">Remember me </span>
                    </div>
                    <a className="text-blue-500 font-medium hover:underline" href="#"
                    >Forgot Password</a
                    >
                </div> */}
                {error && <p className="text-red-500 text-center">{error}</p>}
                <button
                    className="w-full justify-center py-1 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md text-white ring-2"
                    id="login"
                    name="login"
                    type="submit"
                >
                    {loading?'Loading...':'Login'}
                </button>
                <p className="flex justify-center space-x-1">
                    <span className="text-slate-700"> Don't have an account? </span>
                    <Link to='/signup' className="text-blue-500 hover:underline" >Sign Up</Link>
                </p>
            </form>
        </div>

    )
}

export default Login
