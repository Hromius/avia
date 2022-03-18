/* eslint-disable linebreak-style */
export default class Serwise {
  ApiSearchId = 'https://front-test.beta.aviasales.ru/search';

  ApiTickets = 'https://front-test.beta.aviasales.ru/tickets';

  async getId() {
    const res = await fetch('https://front-test.beta.aviasales.ru/search');

    if (!res.ok) {
      throw new Error(`ошибка ${res.status}`);
    }
    return res.json();
  }

  async getTickets(id) {
    const res = await fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${id}`);

    if (!res.ok) {
      throw new Error(`ошибка ${res.status}`);
    }
    return res.json();
  }
}
