import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import '../../styles.css';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventAddNew, eventClearActiveEvent, eventUpdated } from '../../actions/events';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hours');

const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowPlus1.toDate()
}

const CalendarModal = () => {

    const { modalOpen } = useSelector(state => state.ui);
    const { activeEvent } = useSelector(state => state.calendar);
    const dispatch = useDispatch();

    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());
    const [titleValid, setTitleValid] = useState(true);

    const [formValues, setFormValues] = useState(initEvent);

    const { notes, title, start, end } = formValues;

    useEffect(() => { //uso este hook para q al ahcer click en un evento creado me aparezca la info correspondiente en el modal
        if (activeEvent) {
            setFormValues(activeEvent);
        } else {//Estoy pendiente del activeEvent
            setFormValues(initEvent)
        }
    }, [activeEvent, setFormValues])

    const handleInputChange = ({ target }) => { //del evento solo me interesa el target
        setFormValues({
            ...formValues,
            [target.name]: target.value // lo pongo entre [] porque quiero computar el valor de la propiedad
        })
    };

    const closeModal = () => {
        dispatch(uiCloseModal());
        dispatch(eventClearActiveEvent());
        setFormValues(initEvent); // Esto es para purgar la info que esta en el modal, asi cuando vuelvo a tocar el ams no esta la info del evento agregado anteriormente
    };

    const handleStartDateChange = (e) => { //este evento va a ser la fecha
        setDateStart(e);
        setFormValues({
            ...formValues,
            end: e
        })
    };

    const handleEndDateChange = (e) => { //este evento va a ser la fecha
        setDateEnd(e);
        setFormValues({
            ...formValues,
            start: e //el start es igual al evento que recibo 
        })
    };

    const handleSubmitForm = (e) => {
        e.preventDefault(); //para evitar la propagación del formulario 

        const momentStart = moment(start);
        const momentEnd = moment(end);

        // if (momentStart.isSameOrAfter(momentEnd)) {
        //     return Swal.fire('Error', 'La fecha fin debe de ser mayor a la fecha de inicio', 'error')
        // }

        if (title.trim().length < 2) {
            return setTitleValid(false)
        }

        //TODO realizar grabacion 
        if (activeEvent) { //Aca estamos actualizando
            dispatch(eventUpdated(formValues))
        } else { // y  aca estamos creando uno nuevo
            dispatch(eventAddNew({
                ...formValues,
                id: new Date().getTime(),
                user: {
                    _id: '123',
                    name: 'Jose'
                }
            }));
        };

        setTitleValid(true); //estas dos lineas es para cerrar la caja modal
        closeModal();

    };
    return (
        <Modal
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
            isOpen={modalOpen}
            onRequestClose={closeModal}
            style={customStyles}
        >
            <h1> {(activeEvent) ? 'Editar Evento' : 'Nuevo Evento'} </h1>
            <hr />
            <form
                className="container"
                onSubmit={handleSubmitForm}
            >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={handleStartDateChange}
                        value={dateStart}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={handleEndDateChange}
                        value={dateEnd}
                        minDate={dateStart} // la fecha minima va a ser el dateStart, e suna validacion para que la fecha de cierre no sea menor a la de inicio
                        className="form-control"
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${!titleValid && 'is-invalid'} `}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}

export default CalendarModal
