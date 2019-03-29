const api = "https://reactnd-books-api.udacity.com"

const headers = {
    'Accept': 'application/json',
    'Authorization': token
}

export const getAllComment = (postId) =>
    fetch(`${api}/posts/${postId}/comments`, { headers })
        .then(res => res.json())
        .then(data => console.log(data));

export const getComment = (commentId) =>
    fetch(`${api}/comment/${commentId}`, { headers })
        .then(res => res.json())
        .then(data => console.log(data));

export const createComment = (newComment) =>
    fetch(`${api}/comment`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ newComment })
    }).then(res => res.json())
        .then(data => data)

export const voteComment = (commentId, voteComment) =>
    fetch(`${api}/comment/${commentId}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ voteComment })
    }).then(res => res.json())
        .then(data => data)

export const updateComment = (commentId, comment) =>
    fetch(`${api}/comment/${commentId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ comment })
    }).then(res => res.json())
        .then(data => data)

export const deleteComment = (commentId) =>
    fetch(`${api}/comment/${commentId}`, {
        method: 'DELETE',
        headers,
    }).then(res => res.json())
        .then(data => data)