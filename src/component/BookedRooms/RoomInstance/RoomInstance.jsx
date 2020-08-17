import React, { useState } from 'react';
import './RoomInstance.css';
import { TextField, Button, Popover } from '@material-ui/core';
import { stopBooking } from '../../../actions/reservationActions';

export default function RoomInstance({ employeeId, room, isUpdate }) {
    const defaultDate = (isStart) => {
        const date = new Date();
        return isStart
            ? date.getFullYear() +
                  '-' +
                  ('0' + (date.getMonth() + 1)).slice(-2) +
                  '-' +
                  ('0' + date.getDate()).slice(-2) +
                  'T' +
                  ('0' + date.getHours()).slice(-2) +
                  ':' +
                  ('0' + date.getMinutes()).slice(-2)
            : date.getFullYear() +
                  '-' +
                  ('0' + (date.getMonth() + 1)).slice(-2) +
                  '-' +
                  ('0' + date.getDate()).slice(-2) +
                  'T' +
                  ('0' + (date.getHours() + 1)).slice(-2) +
                  ':' +
                  ('0' + date.getMinutes()).slice(-2);
    };

    const [dateIn, setDateIn] = useState(defaultDate(true));
    const [dateOut, setDateOut] = useState(defaultDate(false));
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        room.dates && room.dates.length > 0 && setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const stopRoom = () => {
        stopBooking(room.id)
            .then((response) => isUpdate(true))
            .catch((error) => alert(error.message));
    };

    return (
        <div className="reservation-instance-container">
            <div className="reservation-instance-header">{`Room ${room.roomNumber}`}</div>
            <hr />
            <img src="./room.jpeg" className="reservation-img" alt="room" />
            <div className="reservation-instance-date">
                {room && room.dates && (
                    <div>{`${room.dates.first} - ${room.dates.second}`}</div>
                )}
                <Button
                    onClick={stopRoom}
                    variant="contained"
                    color="secondary"
                >
                    Stop
                </Button>
            </div>
        </div>
    );
}
