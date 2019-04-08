import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAllPosts } from '../actions/post';
import Post from "./Post";
import { handleCategoriesByPost } from '../actions/category';

class PageView extends Component {

    componentDidMount(){
        if(this.props.match.params && this.props.match.params.category){
            this.props.dispatch(handleCategoriesByPost(this.props.match.params.category))
        }else{
            this.props.dispatch(handleAllPosts())
        }
    }

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

const mapStateToProps = ({ posts, comments }) => {
    return {
      posts: posts ?  Object.values(posts) : [],
      comments
    }
  }
  
export default connect(mapStateToProps)(PageView)