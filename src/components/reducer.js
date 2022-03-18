/* eslint-disable linebreak-style */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
export default function reducer(state, action) {
  if (state === undefined) {
    state = {
      chechBoxAll: true,
      chechBoxTransferNull: true,
      chechBoxTransferOne: true,
      chechBoxTransferTwo: true,
      chechBoxTransferThree: true,
      loadTickets: false,
      error: false,
      tickets: [],
      showTickets: 5,
    };
  }

  if (action.type === 'CHECH_BOX_All_TRUE') {
    return state = {
      ...state,
      chechBoxAll: true,
      chechBoxTransferNull: true,
      chechBoxTransferOne: true,
      chechBoxTransferTwo: true,
      chechBoxTransferThree: true,
    };
  }
  if (action.type === 'CHECH_BOX_TRANSFER_NULL_TRUE') return { ...state, chechBoxTransferNull: true };
  if (action.type === 'CHECH_BOX_TRANSFER_ONE_TRUE') return { ...state, chechBoxTransferOne: true };
  if (action.type === 'CHECH_BOX_TRANSFER_TWO_TRUE') return { ...state, chechBoxTransferTwo: true };
  if (action.type === 'CHECH_BOX_TRANSFER_THREE_TRUE') return { ...state, chechBoxTransferThree: true };

  if (action.type === 'CHECH_BOX_All_FALSE') {
    return state = {
      ...state,
      chechBoxAll: false,
      chechBoxTransferNull: false,
      chechBoxTransferTwo: false,
      chechBoxTransferOne: false,
      chechBoxTransferThree: false,
    };
  }
  if (action.type === 'CHECH_BOX_TRANSFER_NULL_FALSE') return { ...state, chechBoxTransferNull: false };
  if (action.type === 'CHECH_BOX_TRANSFER_ONE_FALSE') return { ...state, chechBoxTransferOne: false };
  if (action.type === 'CHECH_BOX_TRANSFER_TWO_FALSE') return { ...state, chechBoxTransferTwo: false };
  if (action.type === 'CHECH_BOX_TRANSFER_THREE_FALSE') return { ...state, chechBoxTransferThree: false };

  if (action.type === 'CHECH_BOX_ONLY_All_FALSE') return { ...state, chechBoxAll: false };
  if (action.type === 'CHECH_BOX_ONLY_All_TRUE') return { ...state, chechBoxAll: true };

  if (action.type === 'ADD_TIKETS') action.func();
  if (action.type === 'ADD_TIKETS_TWO') return { ...state, tickets: action.tikets.tickets, loadTickets: true };
  if (action.type === 'ERROR') return { ...state, error: true, loadTickets: true };

  if (action.type === 'SHOW_MORE_TICKETS') return { ...state, showTickets: state.showTickets + 5 };
  return state;
}
