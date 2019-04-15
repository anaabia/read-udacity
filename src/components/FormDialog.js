import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import NewForm from './NewForm';

const FormDialog = (props) => {
    return (
      <div>
        <Dialog
          open={props.open}
          onClose={props.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <NewForm post={props.post} commentId={props.commentId} isComment/>
        </DialogContent>
        </Dialog>
      </div>
    );
}

export default FormDialog