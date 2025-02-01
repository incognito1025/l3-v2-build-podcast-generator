//App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import HomePage from "./pages/HomePage";
import PodcastForm from "./components/PodcastForm"; // Import PodcastForm
import PodcastPage from "./pages/PodcastPage"; // Import PodcastPage

const App = () => {
  return (
    <Router>
      <div>
        {/* <h1>Podcast Generator App</h1> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/podcast" element={<PodcastPage />} />
          <Route path="/create-podcast" element={<PodcastForm />} />{" "}
          {/* New route for PodcastForm */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
