import React, { useEffect, useState } from 'react';

import './RoomShower.css';
import { fetchRooms } from '../../actions/roomActions';
import RoomInstance from './RoomInstance';
import Pagination from '@material-ui/lab/Pagination';

const RoomShower = () => {
    const [rooms, setRooms] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [page, setPage] = useState(1);

    const paginationOnClick = (e, value) => {
        setPage(value);
    };

    useEffect(() => {
        fetchRooms(page - 1)
            .then((response) => setRooms(response.data))
            .catch((error) => setErrorMessage(error));
    }, [page]);

    return (
        <div className="rooms-container">
            {rooms &&
                rooms.models &&
                rooms.models.map((room) => (
                    <RoomInstance key={room.id} room={room} />
                ))}
            <Pagination
                onChange={paginationOnClick}
                count={rooms && rooms.totalPages}
                variant="outlined"
                shape="rounded"
            />
        </div>
    );
};

export default RoomShower;
