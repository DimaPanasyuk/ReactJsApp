import React 			 from 'react';

let User = function(options) {

	options 				= (options || {});
	this.name     	= options.name || " ";
	this.surname  	= options.surname || " ";
	this.login    	= options.login || " ";
	this.password 	= options.password || " ";
	this.address  	= options.address || " ";
	this.email    	= options.email || " ";
	this.number   	= options.number || " ";
	this.background = options.background || "img/mountain.jpg";
	this.payments 	= [];
};


export default React.createClass({

	componentDidMount() {

		$('select').material_select();
	},

	_submitSignUp(e) {
		
		let refs = this.refs,
				   new_user;

		e.preventDefault();

		new_user = new User({

			name: refs.name.value,
			surname: refs.surname.value,
			login: refs.login.value,
			password: refs.password.value,
			address: refs.address.value,
			email: refs.email.value,
			number: refs.number.value,
			background: refs.background.value			
		});

		if (this.props.signUp) {

			this.props.signUp(new_user);
		}

		$('input').val('');
	},

	render() {

		return (

			<form className="app__auth-signup-form" onSubmit={this._submitSignUp}>
									
				<h4>Реєстрація</h4>
				<div className="input-field">
					
					<input ref="login" id="sign-up-login" type="text" required/>
					<label htmlFor="sign-up-login">Логін</label>
				</div>

				<div className="input-field">
					
					<input ref="password" id="sign-up-password" type="password" required/>
					<label htmlFor="sign-up-password">Пароль</label>
				</div>

				<div className="input-field">

					<input ref="name" id="sign-up-name" type="text" required/>
					<label htmlFor="sign-up-name">Ім'я</label>
				</div>

				<div className="input-field">

					<input ref="surname" id="sign-up-surname" type="text" required/>
					<label htmlFor="sign-up-surname">Прізвище</label>
				</div>

				<div className="input-field">

					<input ref="address" id="sign-up-address" type="text" required/>
					<label htmlFor="sign-up-address">Адреса</label>
				</div>

				<div className="input-field">

					<input ref="email" id="sign-up-email" type="email" required/>
					<label htmlFor="sign-up-email">Електронна пошта</label>
				</div>
				
				<div className="input-field">

					<input ref="number" id="sign-up-number" type="text" required/>
					<label htmlFor="sign-up-number">Номер телефону</label>
				</div>	

				<div className="input-field">

					<select ref="background" defaultValue="" className="sign-up-select">
						
						<option value="" disabled>Виберіть фон свого акаунту</option>
						<option value="img/devilcircle.jpg">Чортове колесо та захід сонця</option>
						<option value="img/forest_river.jpg">Ліс та річка</option>
						<option value="img/mountain.jpg">Гори</option>
						<option value="img/space.jpg">Космос</option>
						<option value="img/town.jpg">Місто</option>									
					</select>
				</div>	

				<button className="waves-effect waves-light btn app__auth-signup-submit">Зареєструватися!</button>
			</form>
		)
	}
})