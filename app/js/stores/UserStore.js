
//Method to delete array element by index
Array.prototype.remove = function(from, to) {
  
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  
  return this.push.apply(this, rest);
};

import AppDispatcher     from '../dispatcher/AppDispatcher';
import MicroEvent        from '../microEvent';
import { browserHistory   } from 'react-router';

let UserStore;


//TODO: if neccessary
//split this store into 
//2 new stores
//and create stores.js
//where different stores have to be imported
UserStore = {

	current_user: {

		login: 'Sample Login',
		password: '123',
		name: 'Sample Name',
		surname: 'Sample Surname',
		address: 'Sample Address',
		email: 'Sample Email',
		number: '+3809876543',
		background: 'img/mountain.jpg',
		payments: [
			
		]
	},

	valid_login_info: true,
	
	//Returns current user's
	//information object
	returnUserInfo() {

		return this.current_user;
	},
	
	//Returns valid_login and password
	//as array of values
	returnValidStatus() {

		return this.valid_login_info;
	}
};

UserStore.dispatch = AppDispatcher.register(action => {

	switch (action.event) {
	case 'USER_LOGIN':

		let user_data 		= action.value[0],
				login 				= user_data.user_login,
				password 		  = user_data.user_password,
				response  		= action.value[1];
		
		if (response[login]) {

			if (response[login]['password'] === password) {

				UserStore.current_user = response[login];

				Materialize.toast(`Виконано вхід у акаунт ${login}`, 4000);

				UserStore.trigger('update');
				browserHistory.push('/userInterface');
				break;

			} else {
 
				Materialize.toast('Введено невірний логін або пароль', 3000);
				UserStore.trigger('update');
				break;
			}
		} else {
			
			Materialize.toast('Введено невірний логін або пароль', 3000);
			UserStore.trigger('update');
			break;
		}

	case 'USER_LOGOUT': 
		
		browserHistory.push('/');
		UserStore.current_user = {};
		Materialize.toast('Виконано вихід з акаунту', 3000);
		UserStore.trigger('update');
		break;

	case 'CREATE_USER':

		UserStore.current_user = action.value;
		UserStore.trigger('update');
		Materialize.toast(`Виконано вхід у акаунт \n
											 під логіном ${action.value.login}`, 4000);
		browserHistory.push('/userInterface');
		break;

	case 'CHANGE_USERINFO':
	
		let u_user 				    = UserStore.current_user;
				u_user.email   		= action.value.email || u_user.email;
				u_user.address 		= action.value.address || u_user.address;
				u_user.number  		= (action.value.phone.length >= 10) ? action.value.phone : u_user.number,
				u_user.background = (action.value.background.length > 2) ? action.value.background : u_user.background;

		Materialize.toast('Дані користувача оновлені', 3000);
		UserStore.trigger('update');
		break;

	case 'ADD_PAYMENT':
		
		action.value.user_address = UserStore.current_user.address;
		UserStore.current_user.payments.push(action.value);
		Materialize.toast('Додано комунальний платіж', 3000);
		UserStore.trigger('update');
		break;
	
	case 'REMOVE_PAYMENT':
		
		let index = action.value;
		UserStore.current_user.payments.remove(index);
		Materialize.toast('Комунальний платіж видалено', 3000);
		UserStore.trigger('update');
		break;
	
	case 'CHANGE_PAYMENT':
		
		let payment_to_change = UserStore.current_user.payments[action.value.index];
		payment_to_change.payment_name 		= action.value.name;
		payment_to_change.payment_account = action.value.account;
		
		Materialize.toast('Дані комунального платежу змінено', 3000);

		UserStore.trigger('update');
		break;
	default:
	
	}
});

MicroEvent.mixin(UserStore);

export default UserStore;