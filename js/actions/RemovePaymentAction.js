import AppDispatcher from '../dispatcher/AppDispatcher';

export default data => {

	AppDispatcher.dispatch({

		event: 'REMOVE_PAYMENT',
		value: data
	});
}