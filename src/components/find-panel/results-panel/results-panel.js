/* eslint-disable linebreak-style */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */

import React from 'react';
import './results-panel.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import add from 'date-fns/add';
import { LoadingOutlined } from '@ant-design/icons';
import * as actions from '../../action';

function ReultsPanel({
  tickets, state, loadTickets, error, showMoreTickets,
}) {
  const filterTickets = (tickets, parametrs) => {
    let arr = [];
    let finalArr = [];
    arr = tickets.filter((elem) => {
      if (parametrs.chechBoxAll) return true;
      if (
        elem.segments[0].stops.length === 0
        && elem.segments[1].stops.length === 0
        && parametrs.chechBoxTransferNull
      ) { return true; }
      if (
        elem.segments[0].stops.length === 1
        && elem.segments[1].stops.length === 1
        && parametrs.chechBoxTransferOne
      ) { return true; }
      if (
        elem.segments[0].stops.length === 2
        && elem.segments[1].stops.length === 2
        && parametrs.chechBoxTransferTwo
      ) { return true; }
      if (
        elem.segments[0].stops.length === 3
        && elem.segments[1].stops.length === 3
        && parametrs.chechBoxTransferThree
      ) { return true; }
      return false;
    });

    for (let i = 0; i < parametrs.showTickets; i++) {
      if (arr[i] === undefined) return [];
      finalArr = [...finalArr, arr[i]];
    }
    return finalArr;
  };

  let id = 1;

  const transfer = (arr) => {
    if (arr.stops.length === 0) {
      return <span> Без пересадок </span>;
    }
    if (arr.stops.length > 0) {
      return (
        <span>
          {' '}
          Количество пересадок :
          {arr.stops.length}
        </span>
      );
    }
  };

  function NumberTransfers(arr) {
    if (arr.length === 0) return;
    if (arr.length > 0) {
      let kek = '';
      arr.map((item) => (kek += ` ${item}`));
      return (
        <span className="transfers">
          {' '}
          {kek}
          {' '}
        </span>
      );
    }
  }

  const dateConvert = (date) => {
    if (date.length === 1) {
      return `0${date}`;
    }
    return date;
  };
  if (filterTickets(tickets, state).length === 0 && loadTickets && !error) {
    return (
      <div className="noTickets">По данным фильтрам билетов не найдено.</div>
    );
  }
  if (!loadTickets) {
    return (
      <div className="loader">
        <LoadingOutlined className="Spinner" spin />
      </div>
    );
  }

  if (error) {
    return <div className="noTickets">Что-то пошло не так.</div>;
  }
  const addMoreTickets = () => {
    if (filterTickets(tickets, state).length !== 0) {
      return (
        <div className="addMoreTickets" onClick={showMoreTickets}>
          Показать ещё 5 билетов!
        </div>
      );
    }
  };

  return (
    <>
      {filterTickets(tickets, state).map((item) => (
        <div className="element" key={id++}>
          <div className="price">
            <div>
              {' '}
              {item.price}
              {' '}
              ₽
              {' '}
            </div>
            <img
              className="logo_element"
              src={`http://pics.avs.io/99/36/${item.carrier}.png`}
              alt="logo"
            />
          </div>

          {item.segments.map((item) => {
            const startTime = {
              hours: String(new Date(item.date).getHours()),
              minutes: String(new Date(item.date).getMinutes()),
            };

            const firstDate = `${dateConvert(startTime.hours)}:${dateConvert(
              startTime.minutes,
            )}`;
            const sumTime = add(new Date(item.date), {
              minutes: item.duration,
            });
            const endTime = {
              hours: String(new Date(sumTime).getHours()),
              minutes: String(new Date(sumTime).getMinutes()),
            };

            const secondDate = `${dateConvert(endTime.hours)}:${dateConvert(
              endTime.minutes,
            )}`;
            const durationHours = Math.trunc(item.duration / 60);
            const durationMinut = item.duration - Math.trunc(item.duration / 60) * 60;

            return (
              <div className="info" key={id++}>
                <div className="info_elem">
                  <span>
                    {item.origin}
                    {' '}
                    —
                    {' '}
                    {item.destination}
                  </span>
                  <span>
                    {firstDate}
                    {' '}
                    -
                    {' '}
                    {secondDate}
                  </span>
                </div>

                <div className="info_elem">
                  <span>В пути</span>
                  <span>
                    {durationHours}
                    {' '}
                    часов
                    {' '}
                    {durationMinut}
                    {' '}
                    минут
                    {' '}
                  </span>
                </div>

                <div className="info_elem">
                  {transfer(item)}
                  <span>{NumberTransfers(item.stops)}</span>
                </div>
              </div>
            );
          })}
        </div>
      ))}
      {addMoreTickets()}
    </>
  );
}

const mapStateToProps = (state) => ({
  tickets: state.tickets,
  state,
  loadTickets: state.loadTickets,
  error: state.error,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ReultsPanel);
