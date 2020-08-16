import React, { useState } from 'react';
import './RoomInstance.css';
import { TextField, Button } from '@material-ui/core';

export default function RoomInstance({ room }) {
    const defaultDate = (isStart) => {
        const date = new Date();
        return isStart
            ? date.getFullYear() +
                  '-' +
                  ('0' + (date.getMonth() + 1)).slice(-2) +
                  '-' +
                  ('0' + date.getDate()).slice(-2) +
                  'T' +
                  date.getHours() +
                  ':' +
                  date.getMinutes()
            : date.getFullYear() +
                  '-' +
                  ('0' + (date.getMonth() + 1)).slice(-2) +
                  '-' +
                  ('0' + date.getDate()).slice(-2) +
                  'T' +
                  (date.getHours() + 1) +
                  ':' +
                  date.getMinutes();
    };

    const [dateIn, setDateIn] = useState(defaultDate(true));
    const [dateOut, setDateOut] = useState(defaultDate(false));
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
                <Button variant="contained" color="primary">
                    Book
                </Button>
            </div>
        </div>
    );
}
