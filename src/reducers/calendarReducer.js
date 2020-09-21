import moment from 'moment';
import { types } from '../types/types';

const initialState = {
    events: [{
        id: new Date().getTime(),
        title: 'Cumpleaños del jefe',
        start: moment().toDate(), //Sinonimo d ehacer un new Date(), pero en moment
        end: moment().add(2, 'hour').toDate(),
        bgcolor: '#fafafa',
        user: {
            _id: '123',
            name: 'Jose'
        }
    }

    ],
    activeEvent: null
}

export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }
        case types.eventAddNew:
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ]
            }
        case types.eventClearActiveEvent:
            return {
                ...state,
                activeEvent: null
            }
        case types.eventUpdated:
            return {
                ...state,
                events: state.events.map(
                    event => (event.id === action.payload.id) //action.payload.id id del evento que estoy queriendo modificar
                        ? action.payload : event //el action.payload va a tener toda la info actualziada sino solo el evento
                )
            }

        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter(
                    event => (event.id === state.activeEvent.id)
                ),
                activeEvent: null
            }


        default:
            return state;
    }
}