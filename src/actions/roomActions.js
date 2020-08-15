import axiosInstance from './axios';
import { RECORD_PER_PAGE } from '../constant/constants';

export const fetchRooms = (currentPage) => {
    return axiosInstance.get(`rooms`, {
        params: { currentPage, recordAmount: RECORD_PER_PAGE },
    });
};
