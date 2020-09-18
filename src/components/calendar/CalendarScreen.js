import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import Navbar from '../ui/Navbar';

import 'react-big-calendar/lib/css/react-big-calendar.css'
import { messages } from '../../helpers/calendar-messages-es';
import CalendarEvent from './CalendarEvent';

moment.locale('es');

const localizer = momentLocalizer(moment);

const events = [{
    title: 'Cumpleaños del jefe',
    start: moment().toDate(), //Sinonimo d ehacer un new Date(), pero en moment
    end: moment().add(2, 'hour').toDate(),
    bgcolor: '#fafafa',
    user: {
        _id: '123',
        name: 'Jose'
    }
}]

const CalendarScreen = () => {

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month'); //Intento de mstrar lastView, pero si no funca q me muestre el mes

    const onDoubleClick = (e) => {
        console.log(e)
    }

    const onSelectEvent = (e) => {
        console.log(e)
    }

    const onViewChange = (e) => { // Esto lo voy a usar para que cada vez que actualice la pagina se me quede en donde la deje por ejemplo en semana o dia, se guarda en el localStorage
        setLastView(e);
        localStorage.setItem('lastView', e);
    }

    const eventStyleGetter = (event, start, end, isSelected) => {

        const style = {
            backgroundColor: '#367cf7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white',
        }

        return {
            style
        }
    };

    return (
        <div className="calendar-screen">

            <Navbar />

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                view={lastView}
                components={{
                    event: CalendarEvent
                }}
            />

        </div>
    )
}

export default CalendarScreen
