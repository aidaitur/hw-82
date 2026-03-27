import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchAlbums } from "./albumsThunks";

const Albums = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const albums = useAppSelector(s => s.albums.items);

    useEffect(() => {
        if (id) dispatch(fetchAlbums(id));
    }, [id, dispatch]);

    const sortedAlbums = [...albums].sort((a, b) => b.year - a.year);

    return (
        <div className="container mt-4">
            {albums.length > 0 && (
                <h2 className="mb-4">{albums[0].artist?.name}</h2>
            )}
            <div className="row g-4">
                {sortedAlbums.map(a => (
                    <div className="col-3" key={a._id}>
                        <div className="card h-100">
                            <img
                                src={`http://localhost:8000/${a.cover}`}
                                className="card-img-top"
                                style={{
                                    height: "250px",
                                    objectFit: "contain",
                                    backgroundColor: "white"
                                }}
                            />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{a.title}</h5>
                                <p className="text-muted">{a.year}</p>
                                <Link
                                    to={`/albums/${a._id}/tracks`}
                                    className="btn btn-dark mt-auto"
                                >
                                    Tracks
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Albums;