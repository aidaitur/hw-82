import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchTracks } from "./tracksThunks";
import type { RootState } from "../../app/store";
import type { Album } from "../../types";

const Tracks = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();

    const tracks = useAppSelector((state: RootState) => state.tracks.items);

    const albums = useAppSelector((state: RootState) => state.albums.items);

    const album = albums.find((a: Album) => a._id === id);

    useEffect(() => {
        if (id) {
            dispatch(fetchTracks(id));
        }
    }, [id, dispatch]);

    const sortedTracks = [...tracks].sort((a, b) => a.trackNumber - b.trackNumber);

    return (
        <div className="max-w-4xl mx-auto mt-8 px-4">
            {album && (
                <div className="mb-8 text-left">
                    <h2 className="text-3xl font-bold text-gray-900">
                        {typeof album.artist === 'object' ? album.artist.name : 'Unknown Artist'}
                    </h2>
                    <h4 className="text-xl text-pink-600">
                        {album.title} <span className="text-gray-500 text-lg">({album.year})</span>
                    </h4>
                </div>
            )}

            <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
                {sortedTracks.length > 0 ? (
                    sortedTracks.map((t) => (
                        <div
                            key={t._id}
                            className="flex justify-between items-center p-4 border-b last:border-0 hover:bg-gray-50 transition-colors"
                        >
                            <span className="text-gray-800 font-medium text-left">
                                <span className="text-gray-400 mr-3">{t.trackNumber}.</span>
                                {t.title}
                            </span>
                            <span className="text-gray-500 font-mono text-sm">
                                {t.duration}
                            </span>
                        </div>
                    ))
                ) : (
                    <div className="p-8 text-center text-gray-500">No tracks found for this album.</div>
                )}
            </div>
        </div>
    );
};

export default Tracks;