
const GET_POSTS = 'posts/GET_POSTS'
const DELETE_POST = 'post/DELETE_POST'
const CREATE_POST = 'posts/CREATE_POST'
const EDIT_CAPTION = 'posts/EDIT_CAPTION'

const getPosts = (posts) => ({
    type: GET_POSTS,
    posts
})

const deletePost = id => ({
    type: DELETE_POST,
    id
})

const newPost = (post) => ({
    type: CREATE_POST,
    payload: post
})

const editCaption = (post) => ({
    type: EDIT_CAPTION,
    post
})

export const getAllPosts = () => async dispatch => {
    const req = await fetch(`/api/posts/`);
    if (req.ok) {
        const posts = await req.json();
        dispatch(getPosts(posts))
    }
    return req
}

export const updateCaption = (post) => async dispatch => {
    const { id, caption, } = post
    console.log(caption)
    const res = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
    })
    if (res.ok) {
        const editPost = await res.json();
        dispatch(editCaption(editPost))
        return editPost
    }
}

export const deleteOnePost = (id) => async dispatch => {
    const res = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        const deleted = await res.json()
        dispatch(deletePost(id))
        return deleted
    }
}

export const createPost = (caption, pic_url) => async dispatch => {

    const req = await fetch(`/api/posts/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            caption, pic_url
        })
    });

    if (req.ok) {
        const data = await req.json();
        dispatch(newPost(data))

    } else if (req.status < 500) {
        const data = await req.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}



const initialState = {};

export default function posts(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS: {

            return { ...state, ...action.posts }
        }
        case DELETE_POST: {
            let afterState = { ...state }

            delete afterState[action.id]
            return afterState

        }
        case EDIT_CAPTION: {
            const updatedState = { ...state, [action.post.id]: action.post }

            return updatedState
        }

        case CREATE_POST: {
            const newState = { ...state }
            return newState
        }
        default:
            return state;
    }
}
