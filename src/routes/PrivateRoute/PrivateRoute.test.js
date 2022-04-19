// Libraries
import React from 'react';
import { Navigate, Route } from 'react-router';

function PrivateRoute({ element: Component, redirectPath, ...rest }) {
	const isAuth = localStorage.getItem('token')

	return (
		<Route
			{...rest}
			render={(props) =>
				isAuth ? <Component {...props} /> : <Navigate to={redirectPath} />
			}
		/>
	);
}

export default PrivateRoute;