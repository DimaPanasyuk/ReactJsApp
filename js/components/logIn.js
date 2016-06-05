import React from 'react';


export default React.createClass({
	
	componentDidMount: function() {

		let fields = $('#logIn-login, #logIn-password'),
				error_message = $('p');

		fields
		.on('change', function() {

			error_message.hide();
		});
	},

	_submitLogIn: function(e) {

		e.preventDefault();
		let login    = this.refs.login.value,
				password = this.refs.password.value;

		if (this.props.logIn) {

			this.props.logIn({

				user_login: login,
				user_password: password
			})
		}

		$('#logIn-login, #logIn-password')
		.val('')
		.blur();	
	},

	render: function() {

		return (

			<form className="app__auth-login-form" onSubmit={this._submitLogIn}>
									
				<h4>Вхід</h4>
				<div className="input-field">
					
					<input ref="login" id="logIn-login" type="text" required/>
					<label htmlFor="logIn-login">Логін</label>
				</div>

				<div className="input-field">

					<input ref="password" id="logIn-password" type="password" required/>
					<label htmlFor="logIn-password">Пароль</label>
				</div>
				<button className="waves-effect waves-light btn app__auth-login-submit" type="submit">Увійти!</button>
			</form>
		)
	}
})