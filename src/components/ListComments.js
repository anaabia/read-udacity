import React from 'react'
import { Typography, Button } from '@material-ui/core';
import Comment from './Comment';

const ListComments = ({onClickOpenDialog, commentsByPost}) => {
    return (
        <div className='comments'>
            <div>
                <Typography variant="h5" component="h4">
                    Comments
                </Typography>
                <Button onClick={onClickOpenDialog} id='new-comment' size="small">New Comment</Button>
            </div>
            {commentsByPost && commentsByPost.length > 0 && (
                commentsByPost.sort((c1, c2) =>  c2.timestamp - c1.timestamp).map((comment, index) =>
                    comment ?
                        <Comment index={index} onClickEditComment={(e) => onClickOpenDialog(e, comment.id)} key={comment.id} comment={comment} /> 
                        : null
                )
            )}
        </div>
    )
}

export default ListComments
