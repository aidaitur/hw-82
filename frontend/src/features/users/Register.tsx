import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectRegisterError } from './usersSelectors';
import { register } from './usersThunks';
import type { RegisterMutation } from '../../types';

const Register = () => {
    const dispatch = useAppDispatch();
    const error = useAppSelector(selectRegisterError);
    const navigate = useNavigate();

    const [form, setForm] = useState<RegisterMutation>({
        username: '',
        password: '',
        displayName: '',
        avatar: null,
    });

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prevState) => ({ ...prevState, [name]: value }));
    };

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            setForm((prevState) => ({ ...prevState, [name]: files[0] }));
        }
    };

    const onSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(register(form)).unwrap();
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    const getFieldError = (fieldName: string) => {
        return error?.errors?.[fieldName]?.message;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-pink-100 text-pink-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign up</h2>
                </div>

                <form className="mt-8 space-y-4" onSubmit={onSubmitHandler}>
                    <div className="space-y-4 text-left">

                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                className={`mt-1 block w-full px-3 py-2 border ${getFieldError('username') ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm`}
                                value={form.username}
                                onChange={onInputChange}
                            />
                            {getFieldError('username') && <p className="mt-1 text-xs text-red-600">{getFieldError('username')}</p>}
                        </div>

                        <div>
                            <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">Display Name</label>
                            <input
                                id="displayName"
                                name="displayName"
                                type="text"
                                required
                                className={`mt-1 block w-full px-3 py-2 border ${getFieldError('displayName') ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm`}
                                value={form.displayName}
                                onChange={onInputChange}
                            />
                            {getFieldError('displayName') && <p className="mt-1 text-xs text-red-600">{getFieldError('displayName')}</p>}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className={`mt-1 block w-full px-3 py-2 border ${getFieldError('password') ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm`}
                                value={form.password}
                                onChange={onInputChange}
                            />
                            {getFieldError('password') && <p className="mt-1 text-xs text-red-600">{getFieldError('password')}</p>}
                        </div>

                        <div>
                            <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">Avatar</label>
                            <input
                                id="avatar"
                                name="avatar"
                                type="file"
                                accept="image/*"
                                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
                                onChange={onFileChange}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors"
                    >
                        Sign Up
                    </button>

                    <div className="text-right">
                        <Link to="/login" className="text-sm text-pink-600 hover:text-pink-500 font-medium">
                            Already have an account? Sign in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;