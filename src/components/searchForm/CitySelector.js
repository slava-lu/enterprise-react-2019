import React, { Component } from 'react';
import compose from 'recompose/compose';
import { translate } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { Select, MenuItem } from '@material-ui/core';
import { Field } from 'redux-form';

import { cities } from '../../config/cities';

const styles = theme => ({
  container: {
    width: 120
  }
});

class CitySelector extends Component {
  renderSelector = ({ input, children, ...rest }) => (
    <Select {...input} children={children} {...rest} />
  );

  render() {
    const { t } = this.props;
    const { classes } = this.props;

    const renderItem = Object.entries(cities)
      .map(([code, name]) => <MenuItem key={code} value={code}>{t(name)}</MenuItem>);

    return (
      <Field className={classes.container} name="city" component={this.renderSelector}>
        {renderItem}
      </Field>
    );
  }
}

export default compose(
  withStyles(styles),
  translate()
)(CitySelector);