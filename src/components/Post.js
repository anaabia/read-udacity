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
import { handleVotePost, handlePost, handleDeletePost } from '../actions/post';
import { UP_VOTE } from '../constants/util';
import { connect } from 'react-redux';
import { handleCommentsByPost, closeDialogComment, openDialogComment } from '../actions/comments';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom'
import Comment from './Comment';
import FormDialog from './FormDialog';

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

      state = {
        commentId: 0,
      }

    componentDidMount(){
        const isExistComment = this.props.post && this.props.comment ? 
            this.props.comment.comments.find(c => c.parentId === this.props.post.id)
            : this.props.comment.comments.find(c => c.parentId === this.props.match.params.id)
        if(!isExistComment) {
            this.props.dispatch(handleCommentsByPost(this.props.post ? this.props.post.id:this.props.match.params.id))
        }
    }

    onClickVote = (e) => {
        const { post } = this.props;
        e.preventDefault()
        this.props.dispatch(handleVotePost(post.id, UP_VOTE))
    }

    onClickReadMore = (e) => {
        e.preventDefault()
        this.props.history.push(`/category/${this.props.post.category}/${this.props.post.id}`)
    }
    
    onClickCloseDialog = () => {
        this.props.dispatch(closeDialogComment())
    }

    onClickOpenDialog = () => {
        this.setState({
            commentId: 0
        })
        this.props.dispatch(openDialogComment())
    }

    onClickDeletePost = (e) => {
        e.preventDefault()
        this.props.dispatch(handleDeletePost(this.props.post.id))
    }

    onClickEditPost = (e) => {
        e.preventDefault()
        this.props.history.push(`/newPost/${this.props.post.id}`)
    }

    onClickEditComment =  (e, commentId) => {
        e.preventDefault()
        this.setState({
            commentId
        })
        this.props.dispatch(openDialogComment())
    }

    render() {
    const { post, comment: { comments }, classes } = this.props;
    const date = post && formatDate(post.timestamp) 
    const isShowComments = Boolean(this.props.match.params.id)
    const commentsByPost = comments && post && comments.filter(comment => comment.parentId === post.id)
    return (
        <div>
            { post ?
            <Card className={classes.card}>
            <Link to={`/category/${post.category}/${post.id}`}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {post.title} 
                        <button onClick={this.onClickDeletePost} className='icon-button'>
                            <FontAwesome.FaTrashO className='post-icon'/> 
                        </button>
                        <button onClick={this.onClickEditPost} className='icon-button'>
                            <FontAwesome.FaEdit className='post-icon'/> 
                        </button>
                    </Typography>
                    <Typography  color="textSecondary">
                        {post.author}  {date}
                    </Typography>
                    <Typography className={classes.postIcons} variant="h5" component="h5">
                        <button className='icon-button'>
                            <FontAwesome.FaComment className='post-icon'/> 
                        </button>
                        <span>{post.commentCount > 0 && post.commentCount}</span>  
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
                        <Button onClick={this.onClickOpenDialog} size="small">New Comment</Button>
                    </Typography>}
                    {isShowComments && commentsByPost && commentsByPost.length > 0  && (
                        commentsByPost.map((comment) =>
                            comment ? 
                            <Comment onClickEditComment={this.onClickEditComment} key={comment.id} comment={comment} /> : null)
                    )}
                </CardContent>
            </Link>
            {!isShowComments && <CardActions>
                <Button onClick={this.onClickReadMore} size="small">Learn More</Button>
            </CardActions>}
            <FormDialog commentId={this.state.commentId} post={post} handleClose={this.onClickCloseDialog} open={this.props.comment.isShowDialog} />
            </Card> :  null}
        </div>
    );
};
}

const mapStatesToProps = ({posts, comment}, ownProps) => {
    return {
        posts,
        comment,
        post: ownProps.match.params.id ?  posts[ownProps.match.params.id]  :  ownProps.post
    }
}
export default withRouter(connect(mapStatesToProps)(withStyles(styles)(Post)));
