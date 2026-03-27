import { Routes, Route } from "react-router-dom";
import Artists from "./artists/Artists";
import Albums from "./albums/Albums";
import Tracks from "./tracks/Tracks";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Artists />} />
            <Route path="/artists/:id/albums" element={<Albums />} />
            <Route path="/albums/:id/tracks" element={<Tracks />} />

        </Routes>
    );
};

export default App;