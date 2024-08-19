import React from 'react'

const SignUp = () => {
    return (
        <div
            className="w-80 rounded-lg shadow h-auto p-6 bg-myGrey relative overflow-hidden"
        >
            <div className="flex flex-col justify-center items-center space-y-2">
                <h2 className="text-2xl font-medium text-slate-700">Sign Up</h2>
                <p className="text-black">Enter details below.</p>
            </div>
            <form className="w-full mt-4 space-y-3">
                <div>
                    <input
                        className="outline-none border-2 rounded-md px-2 py-1 text-black w-full focus:border-blue-300"
                        placeholder="Username"
                        id="username"
                        name="username"
                        type="text"
                    />
                </div>
                <div>
                    <input
                        className="outline-none border-2 rounded-md px-2 py-1 text-black w-full focus:border-blue-300"
                        placeholder="Email"
                        id="email"
                        name="email"
                        type="text"
                    />
                </div>
                <div>
                    <input
                        className="outline-none border-2 rounded-md px-2 py-1 text-black w-full focus:border-blue-300"
                        placeholder="Password"
                        id="password"
                        name="password"
                        type="password"
                    />
                </div>
                <div>
                    <input
                        className="outline-none border-2 rounded-md px-2 py-1 text-black w-full focus:border-blue-300"
                        placeholder="Confirm Password"
                        id="confirmpassword"
                        name="confirmpassword"
                        type="password"
                    />
                </div>
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
                    <a className="text-blue-500 hover:underline" href="#">Login</a>
                </p>
            </form>
        </div>
    )
}

export default SignUp
