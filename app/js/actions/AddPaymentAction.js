import AppDispatcher from'../dispatcher/AppDispatcher';

export default data => {

	AppDispatcher.dispatch({

		event: 'ADD_PAYMENT',
		value: data
	})
}