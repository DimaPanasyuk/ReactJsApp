import AppDispatcher from '../dispatcher/AppDispatcher';

export default function(data) {

	AppDispatcher.dispatch({

		event: 'CHANGE_PAYMENT',
		value: data
	});
}