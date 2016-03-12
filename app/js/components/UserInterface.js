import React 								   from 'react';
import AddPaymentAction     	 from '../actions/AddPaymentAction';
import RemovePaymentAction  	 from '../actions/RemovePaymentAction';
import ChangePaymentInfoAction from '../actions/ChangePaymentInfoAction';
import ChangeUserInfoAction    from '../actions/ChangeUserInfoAction';
import LogOutAction 			     from '../actions/LogOutAction';
import SinglePayment           from '../components/SinglePayment';


let	Payment = function(options) {

	options 			  		 = (options || {});
	this.payment_name 	 = options.payment_name;
	this.payment_account = options.payment_account;
	this.payment_title   = options.payment_name.slice(0, 1).toUpperCase();
	this.payment_color   = (function () {
		
		let color,
				first_sign = Math.round(Math.random()*9),
				second_sign = Math.round(Math.random()*9),
				third_sign = Math.round(Math.random()*9),
				fourth_sign = Math.round(Math.random()*9),
				fifth_sign = Math.round(Math.random()*9),
				sixth_sign = Math.round(Math.random()*9);
				

		color = `#${first_sign}${second_sign}`;
		color += `${third_sign}${fourth_sign}${fifth_sign}${sixth_sign}`;
		return color;
	})();
	this.user_address    = null;
};


export default React.createClass({
		
	getInitialState() {

		return {

			payment_index: null
		}
	},

	//componentDidMount needs refactoring
	//too big function
	componentDidMount() {

		let $add_payment_btn    	     = $('.app__user-add-payment-btn'),
				$add_payment_modal  	     = $('.app__user-add-new-payment-modal'),
				$add_payment_form   	     = $('.app__user-add-new-payment-form'),
				$add_payment_inputs 	     = $add_payment_form.find('input'),
				$cancel_payment     	     = $('.cancel-new-payment'),
				
				$change_user_info_btn      = $('.app__user-about-change'),
				$change_user_info_modal    = $('.app__user-change-user-info-modal'),
				$change_user_info_form     = $('.app__user-change-user-info-form'),
				$change_user_info_inputs   = $change_user_info_form.find('input'),
				$cancel_user_info_change   = $('.cancel-user-info-change'),

				$header_logo_user_name     = $('.app__user-header-top-line-content h3'),
				$window 							     = $(window);

		$('select').material_select();
		
		$('body, html')
		.animate({

			scrollTop: 0
		}, 200);


		//Showing Modals
		$add_payment_btn
		.on('click', function() {

			$add_payment_modal.fadeIn('slow');
			$('html, body')
			.on('touchmove scroll mousewheel', function() {

				return false;
			});
		});

		$change_user_info_btn
		.on('click', function() {

			$change_user_info_modal.fadeIn('slow');
			$('html, body')
			.on('touchmove scroll mousewheel', function() {

				return false;
			});
		});

		//Modals form submition cancel
		$cancel_payment
		.on('click', function() {

			$add_payment_modal.fadeOut('fast');
			$add_payment_inputs.val('').blur();
			$('html, body')
			.off('touchmove scroll mousewheel');
		});

		$cancel_user_info_change
		.on('click', function() {

			$change_user_info_modal.fadeOut('fast');
			$change_user_info_inputs.val('').blur();
			$('select').val('');
			$('html, body')
			.off('touchmove scroll mousewheel');
		});

		//Modals form submition
		$add_payment_form
		.on('submit', function() {

			$add_payment_modal.fadeOut('fast');
			$add_payment_inputs.val('');
			$add_payment_inputs.blur();
			$('html, body')
			.off('touchmove scroll mousewheel');
			return false;
		});

		$change_user_info_form
		.on('submit', function() {

			$change_user_info_modal.fadeOut('fast');
			$change_user_info_inputs.val('').blur();
			$('select').val('');
			$('html, body')
			.off('touchmove scroll mousewheel');
			return false;
		});

		$window
		.on('scroll', function() {
			
			let st = $window.scrollTop();

			$header_logo_user_name.css({

				transform: 'translate(0px, '+st+'px)',
				opacity: 1 - st/200
			});
		});
	},

	_addPayment(e) {

		e.preventDefault();
		
		let name 	 			= this.refs.payment_name.value,
				account 	  = this.refs.payment_account.value,
				new_payment = new Payment({

					payment_name: name,
					payment_account: account 
				});
		AddPaymentAction(new_payment);
	},

	_deletePayment(elem_name) {

		RemovePaymentAction(elem_name);
	},
	
	_changeUserInfo(e) {
	
		e.preventDefault();

		let user_email   		= this.refs.user_email.value,
				user_address    = this.refs.user_address.value,
				user_phone   	  = this.refs.user_phone.value,
				user_background = this.refs.user_background.value,
				changes 		 		= {

					email: user_email,
					address: user_address,
					phone: user_phone,
					background: user_background
				};
		
		ChangeUserInfoAction(changes);
	},
	
	_logOut() {

		LogOutAction();
	},

	render() {
		

		let payments,
				_this = this;

		if (this.props.user_info.payments.length === 0) {

			payments = <h5>Ви ще не додали жодного комунального платежа.</h5>;
		} else {

			payments = this.props.user_info.payments.map(function(payment, i) {

				return (
					
					<SinglePayment remove={_this._deletePayment} 
											   key={i} 
											   payment={payment}/>
				)
			});
		};

		return (
	
			<div className="app__user-interface">
				
				<div className="app__user-add-new-payment-modal">
					
					<div className="container">
						
						<div className="row">
							
							<div className="col-md-12">
								
								<form onSubmit={this._addPayment} className="app__user-add-new-payment-form">
									
									<h3>Новий комунальний платіж</h3>
									<div className="input-field">
										
										<input ref="payment_name" id="payment-name" type="text" required/>
										<label htmlFor="payment-name">Назва платежу</label>
									</div>
									<div className="input-field">
										
										<input ref="payment_account" id="payment-account" type="text" required/>
										<label htmlFor="payment-account">Реквізити платежу</label>
									</div>

									<button className="waves-effect waves-light btn submit-new-payment">Додати платіж</button>
								</form>
								<button className="waves-effect waves-light btn cancel-new-payment">Відміна</button>
							</div>
						</div>
					</div>
				</div>

				<div className="app__user-change-user-info-modal">

					<div className="container">
						
						<div className="row">
							
							<div className="col-md-12">
								
								<form onSubmit={this._changeUserInfo} className="app__user-change-user-info-form">
									
									<h3>Інформація про користувача</h3>
									<div className="input-field">
										
										<input ref="user_email" id="user-email" type="email" />
										<label htmlFor="user-email">Нова електронна пошта</label>
									</div>

									<div className="input-field">
										
										<input ref="user_address" id="user-address" type="text" />
										<label htmlFor="user-address">Нова адреса</label>
									</div>

									<div className="input-field">
										
										<input ref="user_phone" id="user-phone" type="text" />
										<label htmlFor="user-phone">Новий мобільний телефон</label>
									</div>
		
									<div className="input-field select-field">

										<select ref="user_background" defaultValue="" className="sign-up-select">
											
											<option value="" disabled>Виберіть фон свого акаунту</option>
											<option value="img/devilcircle.jpg">Чортове колесо та захід сонця</option>
											<option value="img/forest_river.jpg">Ліс та річка</option>
											<option value="img/mountain.jpg">Гори</option>
											<option value="img/space.jpg">Космос</option>
											<option value="img/town.jpg">Місто</option>									
										</select>
									</div>	

									<button className="waves-effect waves-light btn submit-user-info-change" >Підтвердити зміни</button>
								</form>
								<button className="waves-effect waves-light btn cancel-user-info-change">Відміна</button>
							</div>
						</div>
					</div>
				</div>

				<div className="app__user-change-payment-info-modal">

					<div className="container">
						
						<div className="row">
							
							<div className="col-md-12">
								
								<form onSubmit={this._changePaymentInfo} className="app__user-change-payment-info-form">
									
									<h3>Зміна інформації про послугу</h3>
									<div className="input-field">
										
										<input ref="payment_change_name" id="payment-change-name" type="text" required/>
										<label htmlFor="payment-name">Нова назва</label>
									</div>

									<div className="input-field">
										
										<input ref="payment_change_account" id="payment-change-account" type="text" required/>
										<label htmlFor="payment-account">Нові реквізити</label>
									</div>

									<button className="waves-effect waves-light btn submit-payment-info-change" >Підтвердити зміни</button>
								</form>
								<button className="waves-effect waves-light btn cancel-payment-info-change">Відміна</button>
							</div>
						</div>
					</div>
				</div>

				<header className="app__user-header">
						
					<div className="app__user-header-top-line"
							 style={{backgroundImage: `url(${this.props.user_info.background})`}}>
						
						<div className="container">
							
							<div className="row">
								
								<div className="col-md-12">

									<div className="app__user-header-top-line-content">

											<h3>{this.props.user_info.name} {this.props.user_info.surname}</h3>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="app__user-header-bottom-line">
						<div className="container-fluid">
							
							<div className="row">
								
								<div className="col-md-9">
									
									<div className="header__user-login">
										<h5>Увійдено під логіном: <em>{this.props.user_info.login}</em></h5>
									</div>
								</div>
								<div className="col-md-3">
									
									<div className="header__log-out">
									
										<button onClick={this._logOut} className="waves-effect waves-light btn">Вийти</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</header>

				<section className="app__user-body">
					
					<div className="container-fluid">
					
						<div className="row">
					
							<div className="col-md-4">
									
								<section className="app__user-about">
					
										<div className="row">
											
											<div className="col-md-12">
												
												<div className="app__user-about-content">
													
													<ul className="app__user-about-details">
														
														<li>
															<b>Ваша електронна адреса:</b> {this.props.user_info.email}
														</li>
														<li>
															<b>Ваша адреса:</b> {this.props.user_info.address}
														</li>
														<li>
															<b>Ваш номер телефону:</b> {this.props.user_info.number}
														</li>
														<li>
															<b>Вибраний фон: </b>
															<img className="profile-img-small" src={this.props.user_info.background} alt="Background"/>
														</li>		
													</ul>
													
													<button className="waves-effect waves-light btn app__user-about-change">
														Змінити свої дані
													</button>
												</div>
											</div>
										</div>
								</section>								
							</div>
							<div className="col-md-8">

								<section className="app__user-payments">
										
										<div className="row">
											
											<div className="col-md-12">
												
												<div className="app__user-payments-list">

													{payments}
												</div>
											</div>
										</div>
								</section>

								<section className="app__user-add-new-payments">

										<div className="row">
											
											<div className="col-md-12">
												
												<div className="app__user-add-payment">
													
													<a className="waves-effect waves-teal btn-flat app__user-add-payment-btn">Додати новий платіж</a>
												</div>
											</div>
										</div>
								</section>
							</div>
						</div>
					</div>
				</section>	
			</div>
		)
	}
});