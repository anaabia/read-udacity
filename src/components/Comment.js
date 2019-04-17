import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import '../styles/post.css'
import { connect } from 'react-redux';
import { formatDate } from '../helpers/format';
import { UP_VOTE, DOWN_VOTE } from '../constants/util';
import { handleVoteComment, handleDeleteComment } from '../actions/comments';
import ActionsEdit from './ActionsEdit';
import VoteScore from './VoteScore';

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

const Comment = (props) => {
    const { comment, classes } = props;
    const date = comment && formatDate(comment.timestamp)
    return (
        <Card className={classes.card}>
            {comment && (<CardContent>
                <Typography color="textSecondary">
                    {comment.author}  {date}
                    <ActionsEdit onClickDelete={(e) => props.deleteComment(e, comment)} onClickEdit={(e) => props.onClickEditComment(e, comment.id)} />
                </Typography>
                <Typography className={classes.postIcons} variant="h5" component="h5">
                    <VoteScore 
                        onClickVoteUp={(e) => props.onClickVote(e, comment.id, UP_VOTE)}
                        onClickVoteDown={(e) => props.onClickVote(e, comment.id, DOWN_VOTE)}
                        object={comment}
                    />
                </Typography>
                <Typography component="p">
                    {comment.body}
                </Typography>
            </CardContent>)}
        </Card>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClickVote: (e, commentId, vote) => {
            e.preventDefault()
            dispatch(handleVoteComment(commentId, vote))
        },
        deleteComment: (e, comment) => {
            e.preventDefault()
            dispatch(handleDeleteComment(comment))
        }
    }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(Comment));