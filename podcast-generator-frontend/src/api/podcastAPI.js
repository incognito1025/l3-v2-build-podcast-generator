//podcastAPI.js// src/api/podcastAPI.js

const API_URL = 'https://your-api-url.com'; // Replace with your actual API endpoint

// Function to fetch all podcasts (GET request)
export const fetchPodcasts = async () => {
  try {
    const response = await fetch(`${API_URL}/podcasts`);
    if (!response.ok) {
      throw new Error('Failed to fetch podcasts');
    }
    const data = await response.json();
    return data; // Return the data from the API
  } catch (error) {
    console.error('Error fetching podcasts:', error);
    throw error; // Rethrow to handle it in the component
  }
};

// Function to create a new podcast (POST request)
export const createPodcast = async (podcastData) => {
  try {
    const response = await fetch(`${API_URL}/podcasts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(podcastData), // Send the podcast data as JSON
    });

    if (!response.ok) {
      throw new Error('Failed to create podcast');
    }

    const data = await response.json();
    return data; // Return the newly created podcast
  } catch (error) {
    console.error('Error creating podcast:', error);
    throw error; // Rethrow to handle it in the component
  }
};

// Function to update an existing podcast (PUT request)
export const updatePodcast = async (id, podcastData) => {
  try {
    const response = await fetch(`${API_URL}/podcasts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(podcastData),
    });

    if (!response.ok) {
      throw new Error('Failed to update podcast');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating podcast:', error);
    throw error;
  }
};

// Function to delete a podcast (DELETE request)
export const deletePodcast = async (id) => {
  try {
    const response = await fetch(`${API_URL}/podcasts/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete podcast');
    }

    return { message: 'Podcast deleted successfully' };
  } catch (error) {
    console.error('Error deleting podcast:', error);
    throw error;
  }
};

