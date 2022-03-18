import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from './components/header/header';
import FindPanel from './components/find-panel/find-panel';
import { store } from './components/store';

import * as actions from './components/action';

function App() {
  return (
    <>
      <header className="">
        <Header />
      </header>
      <h1>
        <FindPanel />
      </h1>
    </>
  );
}

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
