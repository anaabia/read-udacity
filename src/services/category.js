const api = "http://localhost:3001"

const headers = {
    'Accept': 'application/json',
    'Authorization': 'whatever-you-want',
}

export const getAllCategories = () =>
    fetch(`${api}/categories`, { headers })
        .then(res => res.json())

export const getCategory = (categoryId) =>
    fetch(`${api}/${categoryId}/posts`, { headers })
        .then(res => res.json())