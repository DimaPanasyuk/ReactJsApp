
//Method to delete array element by index
Array.prototype.remove = function(from, to) {
  
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  
  return this.push.apply(this, rest);
};

import AppDispatcher     from '../dispatcher/AppDispatcher';
import MicroEvent        from '../microEvent';
import { hashHistory   } from 'react-router';

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
	returnUserInfo: function() {

		return this.current_user;
	},
  
  returnUserPayments: function() {
    
    return this.current_user.payments;
  },
	
	//Returns valid_login and password
	//as array of values
	returnValidStatus: function() {

		return this.valid_login_info;
	}
};

UserStore.dispatch = AppDispatcher.register(function(action) {

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
				hashHistory.push('/jek/profile');
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
		
		hashHistory.push('/');
		UserStore.current_user = {};
		Materialize.toast('Виконано вихід з акаунту', 3000);
		UserStore.trigger('update');
		break;

	case 'CREATE_USER':

		UserStore.current_user = action.value;
		UserStore.trigger('update');
		Materialize.toast(`Виконано перший вхід у акаунт 
											 під логіном ${action.value.login}`, 4000);
		hashHistory.push('/jek/profile');
		break;

	case 'CHANGE_USERINFO':
	
		let u_user 						= UserStore.current_user;
				u_user.email   		= action.value.email || u_user.email;
				u_user.address 		= action.value.address || u_user.address;
				u_user.number  		= (action.value.phone.length === 10) ? action.value.length : u_user.number,
				u_user.background = action.value.background || u_user.background;

		Materialize.toast('Інформація про користувача оновлена', 3000);
		UserStore.trigger('update');
		break;

	case 'ADD_PAYMENT':
		
		action.value.user_address = UserStore.current_user.address;
		UserStore.current_user.payments.push(action.value);
		Materialize.toast('Додано новий комунальний платіж', 3000);
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