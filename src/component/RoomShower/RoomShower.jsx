import React, { useEffect, useState } from 'react';

import './RoomShower.css';
import { fetchRooms } from '../../actions/roomActions';
import RoomInstance from './RoomInstance';

const RoomShower = () => {
    const [rooms, setRooms] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchRooms(0)
            .then((response) => setRooms(response.data.content))
            .catch((error) => setErrorMessage(error));
    }, []);
    console.log(rooms);
    return rooms && rooms.map((room) => <RoomInstance room={room} />);
};

export default RoomShower;
