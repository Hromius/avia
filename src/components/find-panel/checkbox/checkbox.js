/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './checkbox.css';
import * as actions from '../../action';
import { store } from '../../store';

function Chexbox({
  checkedAll, chechBoxAllFalse, chechBoxAllTrue,
  checkedNull, chechBoxTransferNullFalse, chechBoxTransferNullTrue,
  checkedOne, chechBoxTransferOneFalse, chechBoxTransferOneTrue,
  checkedTwo, chechBoxTransferTwoFalse, chechBoxTransferTwoTrue,
  checkedThree, chechBoxTransferThreeFalse, chechBoxTransferThreeTrue,
  chechBoxOnlyAllFalse, chechBoxOnlyAllTrue, state,
  addTicets,
}) {
  const chechBoxAll = () => ((checkedAll) ? chechBoxAllFalse() : chechBoxAllTrue());

  const checkCheckBoxAll = () => {
    state = store.getState();
    if (state.chechBoxTransferNull && state.chechBoxTransferOne
        && state.chechBoxTransferTwo && state.chechBoxTransferThree) chechBoxOnlyAllTrue();
    else
    if (state.chechBoxTransferNull || state.chechBoxTransferOne
        || state.chechBoxTransferTwo || state.chechBoxTransferThree) chechBoxOnlyAllFalse();
  };

  const chechBoxNull = () => {
    (checkedNull) ? chechBoxTransferNullFalse() : chechBoxTransferNullTrue();
    checkCheckBoxAll();
  };
  const chechBoxOne = () => {
    (checkedOne) ? chechBoxTransferOneFalse() : chechBoxTransferOneTrue();
    checkCheckBoxAll();
  };
  const chechBoxTwo = () => {
    (checkedTwo) ? chechBoxTransferTwoFalse() : chechBoxTransferTwoTrue();
    checkCheckBoxAll();
  };
  const chechBoxThree = () => {
    (checkedThree) ? chechBoxTransferThreeFalse() : chechBoxTransferThreeTrue();
    checkCheckBoxAll();
  };

  useEffect(() => {
    addTicets();
  }, [addTicets]);

  return (
    <div className="checkbox">
      <span>Количество пересадок</span>
      <p>
        <input
          type="checkbox"
          checked={checkedAll}
          onChange={chechBoxAll}
        />
        Все
      </p>

      <p>
        <input
          type="checkbox"
          checked={checkedNull}
          onChange={chechBoxNull}
        />
        Без пересадок
      </p>

      <p>
        <input
          type="checkbox"
          checked={checkedOne}
          onChange={chechBoxOne}
        />
        1 пересадка
      </p>

      <p>
        <input
          type="checkbox"
          checked={checkedTwo}
          onChange={chechBoxTwo}
        />
        2 пересадки
      </p>

      <p>
        <input
          type="checkbox"
          checked={checkedThree}
          onChange={chechBoxThree}
        />
        3 пересадки
      </p>
    </div>
  );
}

const mapStateToProps = (state) => ({
  statetickets: state.tickets,
  checkedAll: state.chechBoxAll,
  checkedNull: state.chechBoxTransferNull,
  checkedOne: state.chechBoxTransferOne,
  checkedTwo: state.chechBoxTransferTwo,
  checkedThree: state.chechBoxTransferThree,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Chexbox);
