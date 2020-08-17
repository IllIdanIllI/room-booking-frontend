import React, { useEffect, useState } from 'react';

import './BookedRooms.css';
import { fetchEmployeesReservations } from '../../actions/employeeActions';
import RoomInstance from './RoomInstance';
import Pagination from '@material-ui/lab/Pagination';

const BookedRooms = ({ employeeId }) => {
    const [rooms, setRooms] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const isUpdate = (flag) => {
        fetchEmployeesReservations(employeeId)
            .then((response) => setRooms(response.data))
            .catch((error) => setErrorMessage(error));
    };

    useEffect(() => {
        fetchEmployeesReservations(employeeId)
            .then((response) => setRooms(response.data))
            .catch((error) => setErrorMessage(error));
    }, []);

    return (
        <React.Fragment>
            <div className="rooms-container">
                {rooms &&
                    rooms.map((room) => (
                        <RoomInstance
                            employeeId={employeeId}
                            isUpdate={isUpdate}
                            key={room.id}
                            room={room}
                        />
                    ))}
            </div>
        </React.Fragment>
    );
};

export default BookedRooms;
