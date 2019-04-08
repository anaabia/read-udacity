import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import * as FontAwesome from 'react-icons/lib/fa'
import formatDate from '../helpers/format'
import '../styles/post.css'
import { handleVotePost, handlePost } from '../actions/post';
import { UP_VOTE } from '../constants/util';
import { connect } from 'react-redux';
import { handleCommentsByPost } from '../actions/comments';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom'
import Comment from './Comment';

const styles = {
    card: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    postIcons: {
        color: '#3f51b5',
        margin: '0 15px 0 5px',
        fontSize: '18px !important',
    }
  };

class Post extends Component{

    static propTypes = {
        classes: PropTypes.object.isRequired,
      }

    componentDidMount(){
        if(this.props.post && (!this.props.comments || !this.props.comments.find(comment => comment.parentId === this.props.post.id))){
            this.props.dispatch(handleCommentsByPost(this.props.post.id))
        }else{
            if(this.props.match.params.id && !this.props.post){
                this.props.dispatch(handlePost(this.props.match.params.id))
            }
        }
    }

    onClickVote = (e) => {
        const { post } = this.props;
        e.preventDefault()
        this.props.dispatch(handleVotePost(post.id, UP_VOTE))
    }

    onClickReadMore = (e) => {
            e.preventDefault()
            this.props.history.push(`/${this.props.post.id}`)
    }
    
    render() {
    const { post, comments, classes } = this.props;
    const date = post && formatDate(post.timestamp) 
    const isShowComments = Boolean(this.props.match.params.id)
    const commentsByPost = comments && comments.filter(comment => comment.parentId === post.id)
    return (
        <div>
            { post ?
            <Card className={classes.card}>
            <Link to={`/${post.category}/${post.id}`}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {post.title}
                    </Typography>
                    <Typography  color="textSecondary">
                        {post.author}  {date}
                    </Typography>
                    <Typography className={classes.postIcons} variant="h5" component="h5">
                        <button className='icon-button'>
                            <FontAwesome.FaComment className='post-icon'/> { }
                        </button>
                        <span>{commentsByPost && commentsByPost.length > 0 && commentsByPost.length}</span>  {   }
                        <button className='icon-button' onClick={(e) => this.onClickVote(e)}>
                            <FontAwesome.FaHeart className='post-icon'/>
                        </button>
                        <span className='icon-info'>{post && post.voteScore !== 0 && post.voteScore}</span>
                    </Typography>
                    <Typography component="p">
                    {post.body}
                    </Typography>
                    {isShowComments && <Typography variant="h5" component="h4">
                        Comments
                    </Typography>}
                    {isShowComments && commentsByPost && commentsByPost.length > 0  && (
                        commentsByPost.map((comment) =>
                            comment ? 
                            <Comment key={comment.id} comment={comment} /> : null)
                    )}
                </CardContent>
            </Link>
            {!isShowComments && <CardActions>
                <Button onClick={this.onClickReadMore} size="small">Learn More</Button>
            </CardActions>}
            </Card> :  null}
        </div>
    );
};
}

const mapStatesToProps = ({posts, comments}, ownProps) => {
    return {
        posts,
        comments,
        post: ownProps.match.params.id ?  posts[ownProps.match.params.id]  :  ownProps.post
    }
}
export default withRouter(connect(mapStatesToProps)(withStyles(styles)(Post)));
