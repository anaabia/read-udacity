import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { handleAllCategories, handleCategoriesByPost } from '../actions/category';
import { connect } from 'react-redux';
import { withRouter, Link } from "react-router-dom";

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class Nav extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  componentDidMount(){
    this.props.dispatch(handleAllCategories())
  }

  onClick = (e, category) => {
    e.preventDefault()
    this.props.history.push(`/category/${category.name}`)
  }

  onClickMainPage = (e) => {
    e.preventDefault()
    this.props.history.push(`/`)
  }

  render (){
    const { classes, categories } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
          <Button onClick={(e) => this.onClickMainPage(e)} key={'new'} color="inherit">Home</Button>
          <Link className='MuiButtonBase-root-70 MuiButton-root-44 MuiButton-text-46 MuiButton-flat-49 MuiButton-colorInherit-65' to={`/newPost`}  key={'home'} >New Post</Link>
          {categories && categories.length > 0 && categories.map((category) => 
            <Button onClick={(e) => this.onClick(e,category)} key={category.name} color="inherit">{category.name}</Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Nav)));
