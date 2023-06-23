import BASE_URL from '../config/apiConfig';
import axios from 'axios';

export const addNewCrib = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/cribs`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        return error;
    }
}

export const getcribList = async (data) => {
    try {
        const response = await axios.get(`${BASE_URL}/cribs`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        return error;
    }
}

export const updateCrib = async (data, id) => {
    try {
        const response = await axios.put(`${BASE_URL}/cribs/${id}`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        return error;
    }
}

export const deleteCrib = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/cribs/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        return error;
    }
}