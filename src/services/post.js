const api = "http://localhost:3001"

const headers = {
    'Accept': 'application/json',
    'Authorization': 'whatever-you-want',
}

export const getAllPost = () =>
    fetch(`${api}/posts/`, { headers })
        .then(res => res.json())

export const getPost = (postId) =>
    fetch(`${api}/posts/${postId}`, { headers })
        .then(res => {return res.json()});

export const createPost = (newPost) =>
    fetch(`${api}/posts`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ newPost })
    }).then(res => res.json())
        .then(data => data)

export const votePost = (postId, votePost) =>
    fetch(`${api}/posts/${postId}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ votePost })
    }).then(res => res)

export const updatePost = (post) =>
    fetch(`${api}/posts/${post.id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ post })
    }).then(res => res.json())
        .then(data => data)

export const deletePost = (postId) =>
    fetch(`${api}/posts/${postId}`, {
        method: 'DELETE',
        headers,
    }).then(res => res.json())
        .then(data => data)