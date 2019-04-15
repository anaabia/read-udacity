const api = "http://localhost:3001"

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'whatever-you-want',
}

export const getAllComment = (postId) =>
    fetch(`${api}/posts/${postId}/comments`, { headers })
        .then(res => res.json());
        
export const getComment = (commentId) =>
    fetch(`${api}/comment/${commentId}`, { headers })
        .then(res => res.json())

export const createComment = (newComment) =>
    fetch(`${api}/comments`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ ...newComment })
    }).then(res => res.json())

export const voteComment = (commentId, voteComment) =>
    fetch(`${api}/comments/${commentId}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ option: voteComment })
    }).then(res => res.json())
        .then(data => data)

export const updateComment = (commentId, comment) =>
    fetch(`${api}/comments/${commentId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ ...comment })
    }).then(res => res.json())
        .then(data => data)

export const deleteComment = (commentId) =>
    fetch(`${api}/comments/${commentId}`, {
        method: 'DELETE',
        headers,
    }).then(res => res.json())
        .then(data => data)