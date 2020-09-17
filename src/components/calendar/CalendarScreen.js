import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import Navbar from '../ui/Navbar';

import 'react-big-calendar/lib/css/react-big-calendar.css'
import { messages } from '../../helpers/calendar-messages-es';

moment.locale('es');

const localizer = momentLocalizer(moment);

const events = [{
    title: 'Cumpleaños del jefe',
    start: moment().toDate(), //Sinonimo d ehacer un new Date(), pero en moment
    end: moment().add(2, 'hour').toDate(),
    bgcolor: '#fafafa'
}]

const CalendarScreen = () => {

    const eventStyleGetter = (event, start, end, isSelected) => {

        const style = {
            backgroundColor: '#367cf7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
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
            />

        </div>
    )
}

export default CalendarScreen
