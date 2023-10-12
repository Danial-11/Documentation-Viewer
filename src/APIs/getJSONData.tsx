import axios from 'axios';

interface Page {
  title: string;
  bodyText: string;
}

interface ApiResponse {
  Pages: Page[];
}

export const getJSONData = async (url: string): Promise<ApiResponse> => {
    return await axios.get(url).then(res => res.data);
}
