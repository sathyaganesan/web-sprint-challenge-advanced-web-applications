import axios from 'axios';

const mockFetchColor = () => {
    return axios
        .get(`http://localhost:5000/api/colors`)
        .then((res) => {
            return res;
        });
};
export default mockFetchColor;