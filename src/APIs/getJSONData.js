import axios from 'axios';

export const getJSONData = async (url) => {
    return await axios.get(url).then(res => res.data);
}
