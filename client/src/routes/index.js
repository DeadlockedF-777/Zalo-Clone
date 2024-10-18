import FrontLayout from '@/layouts/FrontLayout';

import LoginPage from '@/pages/Login';
import RegisterPage from '@/pages/Register';
import ChatPage from '@/pages/Chat';

const publicRoutes = [
	{ path: '/login', element: LoginPage, layout: FrontLayout },
	{ path: '/register', element: RegisterPage, layout: FrontLayout },
	{ path: '/', element: ChatPage },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
