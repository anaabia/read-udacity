import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import * as FontAwesome from 'react-icons/lib/fa'
import { formatDate } from '../helpers/format'
import '../styles/post.css'
import { handleVotePost, handleDeletePost } from '../actions/post';
import { UP_VOTE, DOWN_VOTE } from '../constants/util';
import { connect } from 'react-redux';
import { handleCommentsByPost, closeDialogComment, openDialogComment } from '../actions/comments';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom'
import Comment from './Comment';
import FormDialog from './FormDialog';
import ActionsEdit from './ActionsEdit';
import VoteScore from './VoteScore';
import ListComments from './ListComments';

const styles = {
    card: {
        minWidth: 275,
        width: '90%',
        marginLeft: '5%',
        marginBottom: '1%'
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

class Post extends Component {

    static propTypes = {
        classes: PropTypes.object.isRequired,
    }

    state = {
        commentId: 0,
    }

    componentDidMount() {
        const isExistComment = this.props.post && this.props.comment ?
            this.props.comment.comments.find(c => c.parentId === this.props.post.id)
            : this.props.comment.comments.find(c => c.parentId === this.props.match.params.id)
        if (!isExistComment) {
            this.props.dispatch(handleCommentsByPost(this.props.post ? this.props.post.id : this.props.match.params.id))
        }
    }

    onClickVote = (e, vote) => {
        const { post } = this.props;
        e.preventDefault()
        this.props.dispatch(handleVotePost(post.id, vote))
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
        this.props.history.push(`/category/${this.props.post.category}`)
    }

    onClickEditPost = (e) => {
        e.preventDefault()
        this.props.history.push(`/newPost/${this.props.post.id}`)
    }

    onClickEditComment = (e, commentId) => {
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
                {post ?
                    <Card className={classes.card}>
                        <Link to={`/category/${post.category}/${post.id}`}>
                            <CardContent>
                                <Typography variant="h5" component="h2" className={classes.postIcons}>
                                    <h2>{post.title}</h2>
                                    <button className='icon-button'>
                                        <FontAwesome.FaComment className='post-icon' />
                                    </button>
                                    <span>{post.commentCount > 0 && post.commentCount}</span>
                                    <VoteScore
                                        onClickVoteUp={(e) => this.onClickVote(e, UP_VOTE)}
                                        onClickVoteDown={(e) => this.onClickVote(e, DOWN_VOTE)}
                                        object={post}
                                    />
                                    {isShowComments && (
                                        <ActionsEdit onClickDelete={this.onClickDeletePost} onClickEdit={this.onClickEditPost} />
                                        )
                                    }
                                </Typography>
                                <Typography color="textSecondary">
                                    {post.author}  {date}
                                </Typography>
                                <hr width="100px" color="lavender"></hr>
                                <Typography component="p">
                                    {post.body}
                                </Typography>
                                    {isShowComments &&
                                        <ListComments onClickOpenDialog={this.onClickOpenDialog} commentsByPost={commentsByPost} />
                                    }
                            </CardContent>
                        </Link>
                        <FormDialog commentId={this.state.commentId} post={post} handleClose={this.onClickCloseDialog} open={this.props.comment.isShowDialog} />
                    </Card> : (
                        <Typography>
                            404 Post not found
                </Typography>
                    )}
            </div>
        );
    };
}

const mapStatesToProps = ({ posts, comment }, ownProps) => {
    return {
        posts,
        comment,
        post: ownProps.match.params.id ? posts[ownProps.match.params.id] : ownProps.post
    }
}
export default withRouter(connect(mapStatesToProps)(withStyles(styles)(Post)));
