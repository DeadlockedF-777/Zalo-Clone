import { axiosInstance } from '@/utils/axios-instance';

export const getUserByPhone = async (phone, config = {}) => {
	try {
		const result = await axiosInstance.get(`/api/user/${phone}`, config);

		return result;
	} catch (err) {
		console.log(err);
	}
};

export const updateUserProfile = async (data, config = {}) => {
	try {
		const result = await axiosInstance.post('/api/user/update-information', data, config);

		return result;
	} catch (err) {
		console.log(err);
	}
};

export const getFriends = async (config = {}) => {
	try {
		const result = await axiosInstance.get('/api/user/get-friends', config);

		return result;
	} catch (err) {
		console.log(err);
	}
};

export const uploadAvatar = async (data, config = {}) => {
	try {
		const result = await axiosInstance.post('/api/user/upload-profile-image', data, config);

		return result;
	} catch (err) {
		console.log(err);
	}
};

export const searchUsers = async (config = {}) => {
	try {
		const result = await axiosInstance.get('/api/user/search-users', config);

		return result;
	} catch (err) {
		console.log(err);
	}
};

export const addFriend = async (data, config = {}) => {
	try {
		const result = await axiosInstance.get('/api/user/add-friend', data, config);

		return result;
	} catch (err) {
		console.log(err);
	}
};