import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux'
import { MenuItem, Button } from '@material-ui/core';
import '../styles/NewPost.css';
import { handleNewComment } from '../actions/comments';
import { convertToNewComment, convertToNewPost } from '../helpers/mapping';
import { handleNewPost } from '../actions/post';

class NewForm extends Component {

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
       if(this.props.isComment){
        this.props.dispatch(handleNewComment(convertToNewComment(this.state, this.props.post.id), this.props.post))
       } else {
        this.props.dispatch(handleNewPost(convertToNewPost(this.state), this.actionToRedirect))
       }
    }

    actionToRedirect = (category, id) => 
        this.props.history.push(`/category/${category}/${id}`)
    
    render () {
        const { isComment } = this.props
        return (
            <div className='form'>
                  <form autoComplete="off">
                <TextField
                    fullWidth
                    required
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
                    id="standard-name"
                    label="Title"
                    margin="normal"
                    onChange={this.handleChange('title')}
                    variant="outlined"
                />}
                {!isComment && <TextField
                    fullWidth
                    required
                    id="standard-select-currency"
                    select
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
                    rows={isComment ? 5 :35}
                    required
                    label='Body'
                    onChange={this.handleChange('body')}
                    value={this.state.body}
                    variant="outlined"
                    fullWidth
                />
                 <Button disabled={!this.state.isValid} onClick={this.save} variant="contained" color="primary" >
                    Send
                </Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = ({ categories }) => {
    return {
        categories,
    }
}

export default connect(mapStateToProps)(NewForm)
