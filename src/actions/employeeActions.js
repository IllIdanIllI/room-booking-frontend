import axiosInstance from './axios';

export const fetchEmployeeTypes = () => {
    return axiosInstance.get(`employees/types`);
};

export const signInEmployee = (firstName, lastName, type) => {
    return axiosInstance.post(`employees/sign-in`, {
        firstName,
        lastName,
        type,
    });
};

export const fetchEmployeesReservations = (id) => {
    return axiosInstance.get(`employees/${id}/reservations`);
};
