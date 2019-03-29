const api = "https://reactnd-books-api.udacity.com"

const headers = {
    'Accept': 'application/json',
    'Authorization': token
}

export const getAllCategories = () =>
    fetch(`${api}/categories`, { headers })
        .then(res => res.json())
        .then(data => console.log(data));

export const getCategory = (categoryId) =>
    fetch(`${api}/${categoryId}/post`, { headers })
        .then(res => res.json())
        .then(data => console.log(data));