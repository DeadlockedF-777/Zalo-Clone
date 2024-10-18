import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { io } from 'socket.io-client';

import classNames from 'classnames/bind';
import styles from './MainLayout.module.scss';
import Sidebar from './Sidebar';
import Welcome from '@/components/Welcome';
import Chat from '@/pages/Chat';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useTranslate } from '@/hooks';
import * as userServices from '@/services/userServices';

const cx = classNames.bind(styles);

function MainLayout() {
	const socketRef = useRef();
	const [contacts, setContacts] = useState([]);
	const [currentUser, setCurrentUser] = useState();
	const [currentChat, setCurrentChat] = useState();
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();
	const handleChangeChat = (contact) => {
		setCurrentChat(contact);
	};

	const [t] = useTranslate();
	useEffect(() => {
		async function getUserFromLocalStorage() {
			if (!localStorage.getItem('account')) navigate('/login');
			else {
				setIsLoading(true);

				const { phone } = await JSON.parse(localStorage.getItem('account'));
				const { data } = await userServices.getUserByPhone(phone);
				setCurrentUser(data.user);

				setIsLoading(false);
			}
		}
		getUserFromLocalStorage();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		async function getAllFriends() {
			const { data } = await userServices.getFriends({
				params: {
					phone: currentUser.phone,
				},
			});

			if (data.status) {
				setContacts((prev) => data.friends);
			} else {
				console.log('No Friends');
			}
		}
		if (!!currentUser) {
			getAllFriends();
		}
	}, [currentUser]);

	useEffect(() => {
		if (currentUser) {
			socketRef.current = io(process.env.REACT_APP_SOCKET_URL);
			socketRef.current.on('connect', () => {
				socketRef.current.emit('add-user', currentUser._id);
			});

			socketRef.current.on('receive-status', (onlineUsers) => {
				console.log('onlineUsers: ', onlineUsers);
				//onlineUsers: []
			});
		}
	}, [currentUser]);

	useEffect(() => {
		if (socketRef.current) {
			socketRef.current.on('receive-status', (onlineUsers) => {
				console.log('onlineUsers: ', onlineUsers);
				//onlineUsers: []
			});
		}
	}, []);

	return (
		<>
			{isLoading ? (
				<LoadingSpinner title={t('IsLogIn')} />
			) : (
				<div className={cx('wrapper')}>
					<Sidebar
						contacts={contacts}
						currentUser={!!currentUser && currentUser}
						setCurrentUser={setCurrentUser}
						setContacts={setContacts}
						onChangeChat={handleChangeChat}
						hideSidebar={!!currentChat}
					/>
					<div className={cx('container', { 'show-container': !!currentChat })}>
						<div className={cx('content')}>
							{currentChat === undefined ? (
								<Welcome className={'hide-welcome'} />
							) : (
								<Chat
									handleChangeChat={handleChangeChat}
									currentUser={currentUser}
									currentChat={currentChat}
									socket={socketRef}
								></Chat>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default MainLayout;
