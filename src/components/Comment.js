import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import * as FontAwesome from 'react-icons/lib/fa'
import '../styles/post.css'
import { connect } from 'react-redux';
import formatDate from '../helpers/format';
import { UP_VOTE } from '../constants/util';
import { handleVoteComment } from '../actions/comments';

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
    const date = formatDate(comment.timestamp)
    return (
        <Card className={classes.card}>
        <CardContent>
            <Typography  color="textSecondary">
                {comment.author}  {date}
            </Typography>
            <Typography className={classes.postIcons} variant="h5" component="h5">
                <button className='icon-button' onClick={(e) => props.onClickVote(e, comment.id)}>
                    <FontAwesome.FaHeart className='post-icon'/>
                </button>
                <span className='icon-info'>{comment && comment.voteScore !== 0 && comment.voteScore}</span>
            </Typography>
            <Typography component="p">
            {comment.body}
            </Typography>
        </CardContent>
        </Card>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClickVote: (e, commentId) => {
            e.preventDefault()
            dispatch(handleVoteComment(commentId, UP_VOTE))
        }
    }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(Comment));