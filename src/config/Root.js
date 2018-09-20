import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';

import store from '../redux/store';
import theme from './theme';
import App from '../components/container/App';

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <MuiThemeProvider theme={theme}>
            <App />
          </MuiThemeProvider>
        </Router>
      </Provider>
    );
  }
}

export default Root;
