/* eslint-disable linebreak-style */

import React from 'react';
import './find-panel.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Chexbox from './checkbox/checkbox';
import Filter from './filter/filter';
import ReultsPanel from './results-panel/results-panel';
import * as actions from '../action';

function FindPanel() {
  return (
    <div className="findPanel">
      <div>
        <Chexbox />
      </div>
      <div className="resultsBox">
        <Filter />
        <ReultsPanel />

      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FindPanel);
