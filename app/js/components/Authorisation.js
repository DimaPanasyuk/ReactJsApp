import React 	    from 'react';
import LogIn        from './logIn';
import SignUp       from './signUp';
import LogInAction  from '../actions/LogInAction';
import SignUpAction from '../actions/SignUpAction';

export default React.createClass({

	componentDidMount: function() {

		let $login_btn   = $('.app__auth-login'),
				$signup_btn  = $('.app__auth-signup'),
				$signup_form = $('.app__auth-signup-form'),
				$login_form  = $('.app__auth-login-form');

		$signup_form.hide();
		$signup_btn
		.on('click', function() {

			$login_form.hide();
			$signup_form.fadeIn('slow');
		});

		$login_btn
		.on('click', function() {

			$signup_form.hide();
			$login_form.fadeIn('slow');
		});

	},

	_handleLogIn: function(user_data) {

		LogInAction(user_data);
	},

	_handleSignUp: function(new_user) {

		SignUpAction(new_user);
	},

	render: function() {
		
		return (

			<div className="app__auth">

				<header className="app__auth-header">
					
					<div className="container">
						
						<div className="row">
							
							<div className="col-md-12">
								
								<h1>ЖЕК.ua</h1>
								<h4>Твій комунальний помічник</h4>
							</div>
						</div>
					</div>
				</header>

				<section className="app__auth-forms">
		
					<div className="container">
						
						<div className="row">
							
							<div className="col-md-12">
								
								<button className="app__auth-login waves-effect waves-light btn">Вхід</button>
								<button className="app__auth-signup waves-effect waves-light btn">Реєстрація</button>
										
								<LogIn logIn = {this._handleLogIn} />
								<SignUp signUp = {this._handleSignUp} />

							</div>
						</div>
					</div>				
				</section>
			</div>
		)
	}
})