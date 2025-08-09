import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../AuthPorvider';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {

    const { login, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    // const from = location?.state || "/" ;


    // useEffect(() => {
    //     if (user?.email) {
    //         navigate(`${from}`);
    //     }


    // }, [user, navigate, from]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        login(email, password)
    
    };

    return (
          <div className="md:h-screen mx-auto my-auto">
            <div className="relative flex w-72 md:w-96 flex-col rounded-xl bg-white text-black shadow-md mx-auto mt-32">
                <div className="relative mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-r from-red-700 via-red-800 to-red-900 text-white shadow-lg shadow-red-200">
                    <h3 className="text-3xl font-semibold">Sign In</h3>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-black">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-black">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-6 p-0">
                            <button type="submit" className="btn bg-gradient-to-r from-red-700 via-red-800 to-red-900 text-white">Log In</button>
                        </div>
                    </form>
                    <p className="mt-6 flex justify-center text-sm font-light text-inherit">
                        Don't have an account?
                        <a href="/Registration" className="ml-1 text-sm font-bold text-pink-500">Registration</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;