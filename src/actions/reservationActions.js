import axiosInstance from './axios';

export const stopBooking = (id) => {
    return axiosInstance.get(`reservations/${id}/stop`);
};

const handleDates = (date) =>
    ('0' + date.getDate()).slice(-2) +
    '/' +
    ('0' + (date.getMonth() + 1)).slice(-2) +
    '/' +
    date.getFullYear() +
    ' ' +
    ('0' + date.getHours()).slice(-2) +
    ':' +
    ('0' + date.getMinutes()).slice(-2);

export const reserveRoom = (
    dateIn,
    dateOut,
    roomId,
    employeeId,
    reservationName,
    reservationDescription
) => {
    dateIn = handleDates(new Date(dateIn));
    dateOut = handleDates(new Date(dateOut));
    return axiosInstance.post(`reservations`, {
        dateIn,
        dateOut,
        roomId,
        employeeId,
        reservationName,
        reservationDescription,
    });
};
