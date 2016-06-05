import AppDispatcher from '../dispatcher/AppDispatcher';

export default data => {

	AppDispatcher.dispatch({

		event: 'CHANGE_USERINFO',	
		value: data
	});
}