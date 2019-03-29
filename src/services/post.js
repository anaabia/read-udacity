const api = "https://reactnd-books-api.udacity.com"

const headers = {
    'Accept': 'application/json',
    'Authorization': token
}

export const getAllPost = () =>
    fetch(`${api}/post/`, { headers })
        .then(res => res.json())
        .then(data => console.log(data));

export const getPost = (postId) =>
    fetch(`${api}/post/${postId}`, { headers })
        .then(res => res.json())
        .then(data => console.log(data));

export const createPost = (newPost) =>
    fetch(`${api}/post`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ newPost })
    }).then(res => res.json())
        .then(data => data)

export const votePost = (postId, votePost) =>
    fetch(`${api}/post/${postId}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ votePost })
    }).then(res => res.json())
        .then(data => data)

export const updatePost = (post) =>
    fetch(`${api}/post/${post.id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ post })
    }).then(res => res.json())
        .then(data => data)

export const deletePost = (postId) =>
    fetch(`${api}/post/${postId}`, {
        method: 'DELETE',
        headers,
    }).then(res => res.json())
        .then(data => data)