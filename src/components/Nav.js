import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { handleAllCategories, handleCategoriesByPost } from '../actions/category';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { handleAllPosts, receiveAllPost } from '../actions/post';

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
    this.props.dispatch(handleCategoriesByPost(category.name))
    this.props.history.push(`/${category.name}`)
  }

  onClickMainPage = (e) => {
    e.preventDefault()
    this.props.dispatch(receiveAllPost())
    this.props.history.push(`/`)
  }

  render (){
    const { classes, categories } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
          {categories && categories.length > 0 && categories.map((category) => 
            <Button onClick={(e) => this.onClick(e,category)} key={category.name} color="inherit">{category.name}</Button>
            )}
            <Typography onClick={(e) => this.onClickMainPage(e)} variant="h6" color="inherit" className={classes.grow}>
              Blog
            </Typography>
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
