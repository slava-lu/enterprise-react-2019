import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { translate } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { withStyles, } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';

import { setLanguage } from '../../modules/common';

const styles = theme => ({
  title: {
    marginLeft: theme.spacing.unit
  },
  langSelector: {
    marginLeft: 'auto',
    marginRight: 30
  },
  radioButtons: {
    display: 'flex',
    flexDirection: 'row',
  }
});

class Header extends Component {
  handleChange = (event) => {
    const { i18n } = this.props;
    const { setLanguage } = this.props;
    const language = event.target.value;
    setLanguage(language);
    i18n.changeLanguage(language);
  };

  render() {
    const { t } = this.props;
    const { classes } = this.props;
    const { history, location } = this.props;
    const { language } = this.props;
    const disabled = location.pathname === '/';
    return (
      <AppBar position="static" color="default">
        <Toolbar>
          <IconButton disabled={disabled} onClick={() => history.goBack()}>
            <ArrowBack />
          </IconButton>
          <div className={classes.title}>{t('app_title')}</div>
          <FormControl component="fieldset" className={classes.langSelector}>
            <RadioGroup name="language" className={classes.radioButtons} value={language} onChange={this.handleChange}>
              <FormControlLabel value="en" control={<Radio color="primary" />} label="EN" />
              <FormControlLabel value="de" control={<Radio color="primary" />} label="DE" />
            </RadioGroup>
          </FormControl>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = ({ common }) => ({
  language: common.language
});

export default compose(
  withRouter,
  connect(mapStateToProps, { setLanguage }),
  withStyles(styles),
  translate()
)(Header);