import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchAlbumsByArtist } from './albumsThunks';
import type { RootState } from '../../app/store';
import { apiURL } from '../../constants';

const Albums = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const albums = useAppSelector((state: RootState) => state.albums.items);
    const loading = useAppSelector((state: RootState) => state.albums.loading);

    useEffect(() => {
        if (id) {
            dispatch(fetchAlbumsByArtist(id));
        }
    }, [id, dispatch]);

    const artistName = albums.length > 0 && typeof albums[0].artist === 'object'
        ? albums[0].artist.name
        : 'Albums';

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto mt-8 px-4">
            {/* Шапка страницы */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 text-left">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">{artistName}</h2>
                    <p className="text-gray-500">Discography</p>
                </div>
                <button
                    onClick={() => navigate('/')}
                    className="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back to Artists
                </button>
            </div>

            {albums.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {albums.map((album) => (
                        <div
                            key={album._id}
                            onClick={() => navigate(`/albums/${album._id}`)}
                            className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 cursor-pointer hover:shadow-xl transition-all duration-300 group"
                        >

                            <div className="aspect-square overflow-hidden bg-gray-100 relative">
                                {album.image ? (
                                    <img
                                        src={`${apiURL}/${album.image}`}
                                        alt={album.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 italic">
                                        No image
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
                            </div>


                            <div className="p-6 text-left">
                                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-pink-600 transition-colors line-clamp-1">
                                    {album.title}
                                </h3>
                                <div className="flex items-center justify-between">
                  <span className="bg-pink-50 text-pink-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {album.year}
                  </span>
                                    <span className="text-pink-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center text-sm font-bold">
                    View tracks
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white p-12 rounded-2xl shadow-sm text-center border border-dashed border-gray-300">
                    <p className="text-gray-500 text-lg">No albums found for this artist.</p>
                </div>
            )}
        </div>
    );
};

export default Albums;