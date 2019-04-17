import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from "./Post";
import { Typography, TextField, MenuItem } from '@material-ui/core';
import { ORDER_BY } from '../helpers/format';
import { sortPost } from '../actions/post';

class Filter extends Component {

    state = {
        select: ORDER_BY.date
    }

    handleChange = (event) => {
        const value = event.target.value;
        this.setState({
            select: value
        })
        this.props.dispatch(sortPost(value))
    };

    render() {
        return (
            <div class='filter'>
                <TextField
                    style={{ width: 200 }}
                    width='50px'
                    required
                    value={this.state.select}
                    id="standard-select-currency"
                    select
                    label="Select"
                    onChange={this.handleChange}
                    helperText="Order by"
                    margin="normal"
                    variant="outlined"
                >
                    {Object.keys(ORDER_BY).map(option => (
                        <MenuItem key={option} value={ORDER_BY[option]}>
                            {option}
                        </MenuItem>
                    ))
                    }
                </TextField>
            </div>
        )
    }
}

export default connect(null)(Filter)