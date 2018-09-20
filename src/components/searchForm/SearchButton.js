import React, { Component } from 'react';
import compose from 'recompose/compose';
import { translate } from 'react-i18next';
import { withStyles, } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    margin: theme.spacing.unit * 2,
  }
});

class SearchButton extends Component {
  render() {
    const { t } = this.props;
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Button type="submit" variant="outlined" color="primary">
          {t('get_weather')}
        </Button>
      </div>
    );
  }
}

export default compose(
  withStyles(styles),
  translate()
)(SearchButton);