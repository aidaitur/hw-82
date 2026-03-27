import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchTracks } from "./tracksThunks";

const Tracks = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();

    const tracks = useAppSelector(s => s.tracks.items);
    const albums = useAppSelector(s => s.albums.items);

    const album = albums.find(a => a._id === id);

    useEffect(() => {
        if (id) {
            dispatch(fetchTracks(id));
        }
    }, [id, dispatch]);

    const sortedTracks = [...tracks].sort((a, b) => a.trackNumber - b.trackNumber);

    return (
        <div className="container mt-4">
            {album && (
                <>
                    <h2 className="mb-2">{album.artist?.name}</h2>
                    <h4 className="mb-4">
                        {album.title} ({album.year})
                    </h4>
                </>
            )}
            <div className="list-group">
                {sortedTracks.map((t, index) => (
                    <div
                        key={t._id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                    >
                        <span>
                            {(t.trackNumber ?? index + 1)}. {t.title}
                        </span>
                        <span className="text-muted">
                            {t.duration}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tracks;