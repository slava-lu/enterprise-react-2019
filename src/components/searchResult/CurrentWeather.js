import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { translate } from 'react-i18next';
import { withStyles, } from '@material-ui/core/styles';
import get from 'lodash/get';
import format from 'date-fns/format';
import deLocale from 'date-fns/locale/de';
import enLocale from 'date-fns/locale/en';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

const styles = theme => ({
  card: {
    width: 420
  },
  header: {
    backgroundColor: '#F5F7F9'
  },
  title: {
    fontSize: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  content: {
    paddingTop: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
});

class CurrentWeather extends Component {
  componentDidMount() {
    const { weather: { loaded }, history } = this.props;
    if (!loaded) {
      history.replace('/');
    }
  }

  render() {
    const { t } = this.props;
    const { classes } = this.props;
    const { weather, common: { language } } = this.props;
    const locale = language === 'de' ? deLocale : enLocale;

    const temperature = get(weather, ['currentWeather', 'current', 'temp_c'], ' ');
    const humidity = get(weather, ['currentWeather', 'current', 'humidity'], ' ');
    const wind = get(weather, ['currentWeather', 'current', 'wind_kph'], ' ');
    const city = get(weather, ['currentWeather', 'location', 'name'], ' ');
    const country = get(weather, ['currentWeather', 'location', 'country'], ' ');
    const iconUrl = get(weather, ['currentWeather', 'current', 'condition', 'icon'], ' ');
    const lastUdated = get(weather, ['currentWeather', 'current', 'last_updated_epoch'], ' ');

    return (
      <Card className={classes.card}>
        <CardHeader
          className={classes.header}
          classes={{ title: classes.title }}
          title={`${city}, ${country}`}
          subheader={`${t('last_updated')}: ${format(lastUdated * 1000, 'DD/MMM/YYYY HH:mm', { locale })}`}
          avatar={
            <img src={iconUrl} alt="icon" />
          }
        />
        <CardContent>
          <div className={classes.content}>
            <div>{`${t('temp')}: ${temperature} ${'\u2103'} `}</div>
            <div>{`${t('wind')} : ${wind} Kph `}</div>
            <div>{`${t('humidity')}: ${humidity} %`}</div>
          </div>
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = ({ weather, common }) => ({ weather, common });

export default compose(
  connect(mapStateToProps),
  withStyles(styles),
  translate()
)(CurrentWeather);