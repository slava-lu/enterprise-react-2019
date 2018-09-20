import React, { Component } from 'react';
import { withStyles, } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import compose from 'recompose/compose';
import { Route } from 'react-router-dom';

import Header from '../header/Header';
import SearchFormContainer from '../searchForm/SearchFormContainer';
import SearchResultContainer from '../searchResult/SearchResultContainer';

const styles = theme => ({
  container: {
    maxWidth: 1200,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: theme.spacing.unit * 6,
    backgroundColor: theme.palette.background.paper,
    fontSize: theme.typography.fontSize,
    fontFamily: theme.typography.fontFamily,
  },
  headerContainer: {
    height: 100,
  },
  contentContainer: {
    padding: theme.spacing.unit * 2,
    minHeight: 120,
  },
});

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <div className={classes.headerContainer}>
          <Header />
        </div>
        <Paper className={classes.contentContainer}>
          <Route exact path="/" component={SearchFormContainer} />
          <SearchResultContainer />
        </Paper>
      </div>
    );
  }
}

export default compose(
  withStyles(styles)
)(App);