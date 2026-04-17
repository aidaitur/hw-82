import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchArtists } from './artistsThunks';
import { apiURL } from '../../constants';
import type { RootState } from '../../app/store';
import type { Artist } from '../../types';

const Artists = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const artists = useAppSelector((state: RootState) => state.artists.items);
    const loading = useAppSelector((state: RootState) => state.artists.loading);

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);

    if (loading) return <div className="text-center mt-10 text-pink-600 animate-pulse">Loading Artists...</div>;

    return (
        <div className="max-w-6xl mx-auto mt-8 px-4">
            <h1 className="text-4xl font-bold mb-10 text-gray-900 text-left">Artists</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {artists.map((artist: Artist) => ( // Указываем тип для artist
                    <div
                        key={artist._id}
                        onClick={() => navigate(`/artists/${artist._id}`)}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-lg transition-all flex flex-col items-center group"
                    >
                        <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-pink-100 group-hover:border-pink-300 transition-colors">
                            {artist.photo ? (
                                <img
                                    src={`${apiURL}/${artist.photo}`}
                                    alt={artist.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                />
                            ) : (
                                <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-400 font-bold text-2xl">
                                    {artist.name[0]}
                                </div>
                            )}
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-pink-600 transition-colors">
                            {artist.name}
                        </h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Artists;