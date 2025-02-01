// src/pages/HomePage.jsx
import React from "react";
import Layout from "../components/Layout"; // Import the Layout component
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Layout>
      <h2>Welcome to PodcastGen</h2>
      <p>My Podcasts</p>
      <Link to="/create-podcast">
        <button className="create-button">+ Create New</button>
      </Link>
    </Layout>
  );
};

export default HomePage;
