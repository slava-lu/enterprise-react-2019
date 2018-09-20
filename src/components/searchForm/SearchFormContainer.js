import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import compose from 'recompose/compose';
import { translate } from 'react-i18next';
import { withStyles, } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import { requestCurrentWeather } from '../../modules/weather';
import SearchButton from './SearchButton';
import CitySelector from './CitySelector';

const styles = theme => ({
  container: {
    display: 'flex',
    alignItems: 'flex-end'

  },
  formControl: {
    margin: theme.spacing.unit * 2,
  }
});

class SearchFormContainer extends Component {
  submit = ({ city }) => {
    const { requestCurrentWeather, history } = this.props;
    requestCurrentWeather(city, history);
  };

  render() {
    const { handleSubmit } = this.props;
    const { t } = this.props;
    const { classes } = this.props;
    return (
      <form className={classes.container} onSubmit={handleSubmit(this.submit)}>
        <FormControl className={classes.formControl}>
          <InputLabel>{t('city')}</InputLabel>
          <CitySelector />
        </FormControl>
        <SearchButton />
      </form>
    );
  }
}

export default compose(
  reduxForm({ form: 'search', initialValues: { city: 'LHR' }, destroyOnUnmount: false }),
  connect(null, { requestCurrentWeather }),
  withStyles(styles),
  translate()
)(SearchFormContainer);