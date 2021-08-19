import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { getAllPosts, likeOnePost } from "../../store/post"
import './homepage.css'


const HomePage = () => {
    const user = useSelector(state => state.session.user)

    const posts = useSelector(state => Object.values(state.posts))
    const dispatch = useDispatch();

    const [postId, setPostId] = useState(false);
    // const allPosts = posts.sort()
    const sortedPosts = posts.reverse()

    useEffect(() => {
        dispatch(getAllPosts())
    }, [])

    // console.log(postId)

    // const handleLikes =(e) => {
    //     // dispatch(likeOnePost(postId))
    // }

    return (
        <div className='photo-feed__container'>
            <h1>Welcome {user.username}!</h1>
            {sortedPosts?.map(post =>
            (<div key={post.id} className='single-post__container'>
                <div className='icon-username__container'>
                    <img className='post-icon' id='post-icon' src={`${post.user?.profile_pic}`} />
                    <span className='post-username'> {post.user?.username}</span>
                </div>
                <div>
                    <Link to={`post/${post.id}`}>
                        <img width="600px" src={post.pic_url} alt={`img-${post.id}`} />
                    </Link>
                </div>
                <div>
                    <button onClick={() => dispatch(likeOnePost(post))} ><i className="far fa-heart"></i></button>
                </div>
                <div>likes: {post.likesnum}</div>
                <div>{post.caption}</div>
                <div>comments: {post.commentsnum}</div>
                <div>{post.timestamp}</div>
            </div>)
            )}
        </div>
    )
}

export default HomePage
