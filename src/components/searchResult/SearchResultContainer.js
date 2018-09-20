import React, { Component } from 'react';
import compose from 'recompose/compose';
import { withStyles, } from '@material-ui/core/styles';
import { Route } from 'react-router-dom';

import CurrentWeather from './CurrentWeather';

const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center'
  }
});

class SearchResultContainer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Route path="/current" component={CurrentWeather} />
      </div>
    );
  }
}

export default compose(
  withStyles(styles)
)(SearchResultContainer);