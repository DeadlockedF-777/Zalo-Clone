import axios from 'axios';

export const axiosInstance = axios.create({
	baseURL: 'http://localhost:5000',
	withCredentials: true,
});

export const get = async (url, config = {}) => {
	const res = await axiosInstance.get(url, config);

	return res.data;
};

export const post = async (url, data, config = {}) => {
	const res = await axiosInstance.post(url, data, config);
	console.log('res.data', res.data);

	return res.data;
};
