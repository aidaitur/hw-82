import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchArtists } from "./artistsThunks";
import { Link } from "react-router-dom";

const Artists = () => {
    const dispatch = useAppDispatch();
    const artists = useAppSelector(state => state.artists.items);

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);

    return (
        <div className="container mt-4">
            <div className="row g-4">
                {artists.map(a => (
                    <div className="col-3" key={a._id}>
                        <div className="card h-100">
                            <img
                                src={`http://localhost:8000/${a.photo}`}
                                className="card-img-top"
                                style={{
                                    height: "250px",
                                    objectFit: "contain",
                                    backgroundColor: "white",
                                }}
                            />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{a.name}</h5>
                                <Link
                                    to={`/artists/${a._id}/albums`}
                                    className="btn btn-primary mt-auto"
                                >
                                    View albums
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Artists;