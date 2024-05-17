import axios from 'axios';

// MOVIES
export async function getMovies() {
  try {
    const movies = await axios.get(fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=822cad9e`));
    return movies.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getMovieIfNotExistsAddsDB(name) {
  try {
    const response = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=822cad9e&t=${name}`);
   // return movies.data;
   const data = await response.json(); // Extract JSON data from the response
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getMoviesWithArray(movieArray) {
  try {
    const movies = await axios.post(`http://localhost:8000/movies/watchlist`, {
      movieArray,
    });
    return movies.data;
  } catch (error) {
    throw new Error(error);
  }
}

// USERS
export async function register(user) {
  try {
    const createUser = await axios.post(`http://localhost:8000/register`, user);
    return createUser.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function login(username,password) {
  try {
    const loginUser = await axios.post(`http://localhost:8000/authenticate`, { username, password });
     return loginUser.data;
  //   const response = await fetch('http://localhost:8000/authenticate', {
  //     method: 'POST',
  //     headers: {
  //         'Content-Type': 'application/json'
  //     },
  //     bodys
  //     // body: JSON.stringify(formData)
  // });

  // if (!response.ok) {
  //    // toast.error('Failed to create user');
  //     throw new Error('Failed to submit form');
  }

  //const data = await response.json();
   catch (error) {
    throw new Error(error);
  }
}

export async function getSession() {
  try {
    const logoutUser = await axios.get(`http://localhost:8000/get_session`);
    return logoutUser.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function logout() {
  try {
    const logoutUser = await axios.get(`http://localhost:8000/destroysession`);
    return logoutUser.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateUser(user) {
  try {
    const updateUser = await axios.patch('http://locahost:8000/user', user);
    return updateUser.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function removeFromWatchlist(title) {
  try {
    const result = await axios.patch(`http://localhost:8000/user/removeFromWatchlist/${title}`);
    return result.data;
  } catch (error) {
    throw new Error(error);
  }
}

// POSTS
export async function getPostsByTitle(title) {
  try {
    const posts = await axios.get(`http://localhost:8000/post/${title}`);
    return posts.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function updatePostById(id, post) {
  try {
    const postToBeUpdated = await axios.patch(`http://localhost:8000/post/${id}`, { post });
    return postToBeUpdated.data;
  } catch (error) {
    throw new Error(error);
  }
}
export async function deletePostById(id) {
  try {
    const postToBeUpdated = await axios.delete(`http://localhost:8000/post/${id}`);
    return postToBeUpdated.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function insertPost(postObj) {
  try {
    const { username, title, comment } = postObj;
    const postToBeUpdated = await axios.post(`http://localhost:8000/post`, {
      username,
      title,
      comment,
    });
    return postToBeUpdated.data;
  } catch (error) {
    throw new Error(error);
  }
}
