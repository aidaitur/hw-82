import { Route, Routes } from 'react-router-dom';
import AppToolbar from './components/UI/AppToolbar.tsx';
import Artists from './features/artist/Artists.tsx';
import Albums from './features/albums/Albums';
import Tracks from './features/tracks/Tracks';
import Register from './features/users/Register';
import Login from './features/users/Login';

const App = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <header>
                <AppToolbar />
            </header>

            <main className="container mx-auto py-6">
                <Routes>
                    <Route path="/" element={<Artists />} />
                    <Route path="/artists/:id" element={<Albums />} />
                    <Route path="/albums/:id" element={<Tracks />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={
                        <div className="text-center mt-20">
                            <h1 className="text-4xl font-bold text-gray-800">404</h1>
                            <p className="text-gray-600">Page not found</p>
                        </div>
                    } />
                </Routes>
            </main>
        </div>
    );
};

export default App;