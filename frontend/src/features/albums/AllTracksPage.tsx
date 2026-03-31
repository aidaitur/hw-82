import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchTracks } from './tracksThunks';
import { selectTracks } from './tracksSlice';
import { addTrackToHistory } from '../trackHistory/trackHistoryThunks';

const AllTracksPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const tracks = useAppSelector(selectTracks);

    useEffect(() => {
        dispatch(fetchTracks());
    }, [dispatch]);

    const handlePlay = async (trackId: string) => {
        await dispatch(addTrackToHistory(trackId));
        navigate('/track-history');
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">All Tracks</h1>

            <div className="row">
                {tracks.map(track => (
                    <div key={track._id} className="col-md-4 mb-3">
                        <div className="card h-100">
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{track.title}</h5>
                                <button
                                    className="btn btn-primary mt-auto"
                                    onClick={() => handlePlay(track._id)}
                                >
                                    Play
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllTracksPage;