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
                <Button onClick={onClickOpenDialog} size="small">New Comment</Button>
            </div>
            {commentsByPost && commentsByPost.length > 0 && (
                commentsByPost.map((comment) =>
                    comment ?
                        <Comment onClickEditComment={onClickOpenDialog} key={comment.id} comment={comment} /> 
                        : null
                )
            )}
        </div>
    )
}

export default ListComments
