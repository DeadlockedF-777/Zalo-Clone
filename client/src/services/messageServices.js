import { axiosInstance } from '../utils/axios-instance';

export const createMessage = async (data, config = {}) => {
	try {
		const result = await axiosInstance.post('/api/message/add-message', data, config);

		return result;
	} catch (err) {
		console.log(err);
	}
};

export const getMessages = async (config) => {
	try {
		const result = await axiosInstance.get('/api/message/get-all-messages', config);

		return result;
	} catch (err) {
		console.log(err);
	}
};

export const getLatestMessage = async (config) => {
	try {
		const result = await axiosInstance.get('/api/message/get-latest-message', config);

		return result;
	} catch (err) {
		console.log(err);
	}
};

export const createMessageEmotion = async (data, config) => {
	try {
		const result = await axiosInstance.post('/api/message/add-interactive', data, config);

		return result;
	} catch (err) {
		console.log(err);
	}
};

export const uploadMessageImage = async (data, config) => {
	try {
		const result = await axiosInstance.post('/api/message/upload-image', data, config);

		return result;
	} catch (err) {
		console.log(err);
	}
};

export const uploadMessageFile = async (data, config) => {
	try {
		const result = await axiosInstance.post('/api/message/upload-file', data, config);

		return result;
	} catch (err) {
		console.log(err);
	}
};