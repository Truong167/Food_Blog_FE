import axios from 'axios';
import { apiUrl } from '../utils/constant';
// import * as request from '../utils/axiosInstance';

export const search = async (q) => {
    try {
        const res = await axios.get(`${apiUrl}/recipe/search`, {
            params: {
                q,
            },
        });
        console.log(res)
        return res.data.data;
    } catch (error) {
        console.log(error)
    }
};
