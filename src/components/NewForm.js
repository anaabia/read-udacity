import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux'
import { MenuItem, Button } from '@material-ui/core';
import '../styles/NewPost.css';
import { handleNewComment, handleUpdateComment } from '../actions/comments';
import { convertToNewComment, convertToNewPost, convertToUpdateComment, convertToUpdatePost } from '../helpers/mapping';
import { handleNewPost, handleUpdatePost } from '../actions/post';

class NewForm extends Component {

    static getDerivedStateFromProps(nextProps, prevState){
        if(prevState.isEditForm === undefined){
            if (nextProps.isComment || nextProps.match){
                const form = nextProps.match ? 
                                nextProps.posts[nextProps.match.params.id] :
                                nextProps.isComment ? 
                                    nextProps.comments.find(comment => comment.id === nextProps.commentId)
                                    : undefined
                    if (form) {
                        return {
                            isEditForm: true,
                            author: form.author,
                            title: nextProps.isComment ? '' : form.title,
                            category: nextProps.isComment ? '' : form.category,
                            body: form.body,
                            isValid: false,
                        }
                    }
            }else{
                return {
                    ...prevState,
                    isEditForm: false
                };
            }
        }
        return null;
    }

    state = {
        author: '',
        title: '',
        category: '',
        body: '',
        isValid: false,
    };

    handleChange = name => event => {
        const { author, title, category, body } = this.state
        this.setState({ 
            [name]: event.target.value,
            isValid: author !== '' && (this.props.isComment || title !== '') && (this.props.isComment || category !== '') && body !== ''
         });
      };

    save = (e) => {
        e.preventDefault()
        if(this.state.isEditForm){
            this.props.dispatch(
                this.props.isComment 
                ? handleUpdateComment(convertToUpdateComment(this.state), this.props.commentId)
                : handleUpdatePost(convertToUpdatePost(this.state), this.props.match.params.id, this.actionToRedirect))
        }else {
             this.props.dispatch(
                this.props.isComment 
                ? handleNewComment(convertToNewComment(this.state, this.props.post.id), this.props.post)
                : handleNewPost(convertToNewPost(this.state), this.actionToRedirect))
        }
    }

    actionToRedirect = (category, id) => 
    this.props.history.push(`/${category}/${id}`)
    
    render () {
        const { isComment } = this.props
        const { isEditForm } = this.state
        return (
            <div className='form'>
            <form autoComplete="off">
                <TextField
                    fullWidth
                    required
                    disabled={isEditForm}
                    value={this.state.author}
                    id="outlined-name"
                    label="Author"
                    margin="normal"
                    onChange={this.handleChange('author')}
                    variant="outlined"
                />
                {!isComment && <TextField
                    fullWidth
                    required
                    value={this.state.title}
                    id="standard-title"
                    label="Title"
                    margin="normal"
                    onChange={this.handleChange('title')}
                    variant="outlined"
                />}
                {!isComment && <TextField
                    fullWidth
                    required
                    id="standard-category"
                    select
                    disabled={isEditForm}
                    value={this.state.category}
                    label="Select"
                    onChange={this.handleChange('category')}
                    helperText="Please select a category"
                    margin="normal"
                    variant="outlined"
                >
                    {this.props.categories.map(option => (
                        <MenuItem key={option.name} value={option.name}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>}
                <TextField
                    multiline={true}
                    id="standard-body"
                    rows={isComment ? 5 :25}
                    required
                    label='Body'
                    onChange={this.handleChange('body')}
                    value={this.state.body}
                    variant="outlined"
                    fullWidth
                />
                 <Button id='form-save' disabled={!this.state.isValid} onClick={this.save} variant="contained" color="primary" >
                    Send
                </Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = ({ categories, posts, comment: {comments}}, ownProps) => {
    return {
        categories,
        posts,
        comments,
        commentId: ownProps.commentId
    }
}

export default connect(mapStateToProps)(NewForm)
