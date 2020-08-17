import React, { useState } from 'react';
import './RoomInstance.css';
import { TextField, Button, Popover } from '@material-ui/core';
import { reserveRoom } from '../../../actions/reservationActions';

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

    const bookRoom = () => {
        reserveRoom(dateIn, dateOut, room.id, employeeId, name, description)
            .then((response) => isUpdate(true))
            .catch((error) => alert(error.message));
    };

    return (
        <div className="room-instance-container">
            <div className="room-instance-header">{`Room ${room.number}`}</div>
            <hr />
            <img src="./room.jpeg" className="room-img" alt="room" />
            <div className="room-instance-date">
                <TextField
                    id="dateIn-local"
                    label="Fill date in"
                    type="datetime-local"
                    onChange={(e) => setDateIn(e.target.value)}
                    defaultValue={defaultDate(true)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="dateOut-local"
                    label="Fill date out"
                    type="datetime-local"
                    onChange={(e) => setDateOut(e.target.value)}
                    defaultValue={defaultDate(false)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    id="manipulation-name"
                    label="Manipulation name"
                    name="manipulation-name"
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    id="manipulation-description"
                    label="Manipulation description"
                    name="manipulation-description"
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Button onClick={bookRoom} variant="contained" color="primary">
                    Book
                </Button>
                <Button
                    aria-describedby={id}
                    variant="contained"
                    color={
                        room.dates && room.dates.length > 0
                            ? 'primary'
                            : 'default'
                    }
                    onClick={handleClick}
                >
                    Show booked dates
                </Button>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    {room.dates.map((pair, i) => (
                        <React.Fragment key={i}>
                            <div>{`${pair.first} - ${pair.second}`}</div>
                            <hr />
                        </React.Fragment>
                    ))}
                </Popover>
            </div>
        </div>
    );
}
