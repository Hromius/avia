/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable camelcase */

import { store } from './store';

function getId() {
  return async () => {
    try {
      const res_id = await fetch('https://front-test.beta.aviasales.ru/search');
      if (!res_id.ok) throw new Error(`ошибка ${res_id.status}`);

      const id = await res_id.json();
      const res_tickets = await fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${id.searchId}`);
      if (!res_tickets) throw new Error(`ошибка ${res_tickets.status}`);
      const tickets = await res_tickets.json();

      return store.dispatch({ type: 'ADD_TIKETS_TWO', tikets: tickets });
    } catch (error) {
      console.log(error);
      return store.dispatch({ type: 'ERROR', error });
    }
  };
}

const loadTickets = () => ({
  type: 'ADD_TIKETS',
  func: getId(),
});

export const chechBoxAllTrue = () => ({ type: 'CHECH_BOX_All_TRUE' });
export const chechBoxTransferNullTrue = () => ({ type: 'CHECH_BOX_TRANSFER_NULL_TRUE' });
export const chechBoxTransferOneTrue = () => ({ type: 'CHECH_BOX_TRANSFER_ONE_TRUE' });
export const chechBoxTransferTwoTrue = () => ({ type: 'CHECH_BOX_TRANSFER_TWO_TRUE' });
export const chechBoxTransferThreeTrue = () => ({ type: 'CHECH_BOX_TRANSFER_THREE_TRUE' });

export const chechBoxAllFalse = () => ({ type: 'CHECH_BOX_All_FALSE' });
export const chechBoxTransferNullFalse = () => ({ type: 'CHECH_BOX_TRANSFER_NULL_FALSE' });
export const chechBoxTransferOneFalse = () => ({ type: 'CHECH_BOX_TRANSFER_ONE_FALSE' });
export const chechBoxTransferTwoFalse = () => ({ type: 'CHECH_BOX_TRANSFER_TWO_FALSE' });
export const chechBoxTransferThreeFalse = () => ({ type: 'CHECH_BOX_TRANSFER_THREE_FALSE' });

export const chechBoxOnlyAllFalse = () => ({ type: 'CHECH_BOX_ONLY_All_FALSE' });
export const chechBoxOnlyAllTrue = () => ({ type: 'CHECH_BOX_ONLY_All_TRUE' });

export const addTicets = () => (loadTickets());
export const showMoreTickets = () => ({ type: 'SHOW_MORE_TICKETS' });
