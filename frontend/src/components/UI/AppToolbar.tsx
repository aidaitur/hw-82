import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout } from '../../features/users/usersSlice.ts';
import { apiURL } from '../../constants.ts';

const AppToolbar = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.users.user);

    return (
        <nav className="bg-white border-b border-slate-200 py-4 px-6 mb-8 shadow-sm">
            <div className="container mx-auto flex justify-between items-center max-w-6xl">

                <Link to="/" className="no-underline group">
                    <span className="text-2xl font-black tracking-tighter uppercase">
                        <span className="text-pink-600">Music</span>
                        <span className="text-slate-800 group-hover:text-pink-600 transition-colors">App</span>
                    </span>
                </Link>

                <div className="flex items-center gap-6">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <div className="text-right leading-tight hidden sm:block">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Account</p>
                                <p className="text-sm font-bold text-slate-800">{user.displayName || user.username}</p>
                            </div>

                            <div className="h-10 w-10 rounded-full border-2 border-pink-100 overflow-hidden bg-slate-100 flex items-center justify-center shadow-sm">
                                {user.avatar ? (
                                    <img
                                        src={user.avatar.startsWith('http') ? user.avatar : `${apiURL}/${user.avatar}`}
                                        alt="avatar"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <span className="text-pink-600 font-bold uppercase">
                                        {(user.displayName || user.username)?.[0] || 'U'}
                                    </span>
                                )}
                            </div>

                            <button
                                onClick={() => dispatch(logout())}
                                className="text-xs font-bold text-slate-400 hover:text-pink-600 uppercase tracking-wider transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-pink-600 no-underline px-2">
                                Sign In
                            </Link>
                            <Link to="/register" className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold no-underline shadow-lg shadow-pink-100 transition-all active:scale-95">
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default AppToolbar;