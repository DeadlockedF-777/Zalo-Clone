import { axiosInstance } from '../utils/axios-instance';

export const register = async (data, config = {}) => {
	try {
		const result = await axiosInstance.post('/api/auth/register', data, config);

		return result;
	} catch (err) {
		console.log(err);
	}
};

export const login = async (data, config = {}) => {
	try {
		const result = await axiosInstance.post('/api/auth/login', data, config);

		return result;
	} catch (err) {
		console.log(err);
	}
};

export const logout = async (data, config = {}) => {
	try {
		const result = await axiosInstance.post('/api/auth/log-out', data, config);

		return result;
	} catch (err) {
		console.log(err);
	}
};

export const refreshToken = async (data, config = {}) => {
	try {
		const result = await axiosInstance.post('/api/auth/refresh-token', data, config);

		return result;
	} catch (err) {
		console.log(err);
	}
};
