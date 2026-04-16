import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectLoginError } from './usersSelectors';
import { login, googleLogin } from './usersThunks';
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import type { LoginMutation } from '../../types';

const Login = () => {
    const dispatch = useAppDispatch();
    const error = useAppSelector(selectLoginError);
    const navigate = useNavigate();

    const [form, setForm] = useState<LoginMutation>({
        username: '',
        password: '',
    });

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prevState) => ({ ...prevState, [name]: value }));
    };

    const onSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(login(form)).unwrap();
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    const googleLoginHandler = async (credential: string) => {
        try {
            await dispatch(googleLogin(credential)).unwrap();
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-pink-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in</h2>
                </div>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-400 p-4 mt-4 text-left">
                        <p className="text-sm text-red-700">{error.error}</p>
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={onSubmitHandler}>
                    <div className="rounded-md shadow-sm space-y-4 text-left">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                                placeholder="Username"
                                value={form.username}
                                onChange={onInputChange}
                            />
                        </div>
                        <div>

                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                                placeholder="Password"
                                value={form.password}
                                onChange={onInputChange}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors"
                    >
                        Sign In
                    </button>

                    <div className="flex flex-col items-center space-y-4">
                        <div className="w-full flex justify-center py-2">
                            <GoogleLogin
                                onSuccess={(res: CredentialResponse) => res.credential && googleLoginHandler(res.credential)}
                                onError={() => console.log('Login Failed')}
                            />
                        </div>

                        <Link to="/register" className="text-sm text-pink-600 hover:text-pink-500 font-medium">
                            Or sign up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;