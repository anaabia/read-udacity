export const convertToNewComment = (state, parentId) => {
    return {
        author: state.author,
        body: state.body,
        id:  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        parentId,
        timestamp: new Date().getTime(),
    }
}

export const convertToNewPost = (state) => {
    return {
        category: state.category,
        title: state.title,
        author: state.author,
        body: state.body,
        id:  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        timestamp: new Date().getTime(),
        voteScore: 0, 
        deleted: false, 
        commentCount: 0
    }
}