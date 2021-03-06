import React, { useEffect, useState } from 'react';

import './RoomShower.css';
import { fetchRooms } from '../../actions/roomActions';
import RoomInstance from './RoomInstance';
import Pagination from '@material-ui/lab/Pagination';

const RoomShower = ({ employeeId }) => {
    const [rooms, setRooms] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [page, setPage] = useState(1);

    const paginationOnClick = (e, value) => {
        setPage(value);
    };

    const isUpdate = (flag) => {
        fetchRooms(page - 1)
            .then((response) => setRooms(response.data))
            .catch((error) => setErrorMessage(error));
    };

    useEffect(() => {
        fetchRooms(page - 1)
            .then((response) => setRooms(response.data))
            .catch((error) => setErrorMessage(error));
    }, [page]);

    return (
        <React.Fragment>
            <div className="rooms-container">
                {rooms &&
                    rooms.models &&
                    rooms.models.map((room) => (
                        <RoomInstance
                            employeeId={employeeId}
                            isUpdate={isUpdate}
                            key={room.id}
                            room={room}
                        />
                    ))}
            </div>
            <Pagination
                onChange={paginationOnClick}
                count={rooms && rooms.totalPages}
                className="rooms-pagination"
                variant="outlined"
                shape="rounded"
            />
        </React.Fragment>
    );
};

export default RoomShower;
