import AppDispatcher from '../dispatcher/AppDispatcher';


export default data => {

	$.ajax({

		type: 'GET',
		url:  'js/database.json',

		success: response => {

			AppDispatcher.dispatch({

				event : 'USER_LOGIN',
				value : [
					
					data,
					response
				]
			});
		}
	})
}