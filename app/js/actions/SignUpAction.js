import AppDispatcher from '../dispatcher/AppDispatcher';

export default data => {

	AppDispatcher.dispatch({

		event: 'CREATE_USER',
		value: data
	});
}