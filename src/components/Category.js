import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from "./Post";

class Category extends Component {

    render(){
        const { posts } = this.props;
        return (
            posts && posts.length > 0 ? 
            posts.map(post => 
                <Post key={post.id} post={post} />
            ) : null
        )
    }
}

const mapStateToProps = ({ posts }, ownProps) => {
    return {
      posts: posts ?  Object.values(posts).filter(post => post.category === ownProps.match.params.category) : []
    }
  }
  
export default connect(mapStateToProps)(Category)