import AppDispatcher from '../dispatcher/AppDispatcher';

export default () => {

	AppDispatcher.dispatch({

		event: 'USER_LOGOUT'
	});
}