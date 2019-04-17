import React from 'react';
import { connect } from 'react-redux';
import Post from "./Post";
import { Typography } from '@material-ui/core';
import Filter from './Filter';

const PageView = (props) => {
    const { posts } = props;
    return (
        <div>
            {posts && posts.length > 0 && <Filter />}
            {posts && posts.length > 0 ? posts.map(post =>
                <Post key={post.id} post={post} />
            ) : (
                    <Typography> No post found  </Typography>
                )}
        </div>
    )
}

const mapStateToProps = ({ posts }, ownProps) => {
    return {
        posts: ownProps.match.params.category && posts ? Object.values(posts).filter(post => post.category === ownProps.match.params.category)
            : posts ? Object.values(posts) : []
    }
}
export default connect(mapStateToProps)(PageView)