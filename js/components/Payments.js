import React                   from 'react';
import AddPaymentAction     	 from '../actions/AddPaymentAction';
import RemovePaymentAction  	 from '../actions/RemovePaymentAction';
import ChangePaymentInfoAction from '../actions/ChangePaymentInfoAction';
import SinglePayment           from './SinglePayment';

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
		console.log(color);
		return color;
	})();
	this.user_address    = null;
};

export default React.createClass({
  
  
  
  componentDidMount() {
    
    let $add_payment_btn    	     = $('.app__user-add-payment-btn'),
				$add_payment_modal  	     = $('.app__user-add-new-payment-modal'),
				$add_payment_form   	     = $('.app__user-add-new-payment-form'),
				$add_payment_inputs 	     = $add_payment_form.find('input'),
				$cancel_payment     	     = $('.cancel-new-payment'),

				$change_payment_info_btn    = $('.app__user-payment-actions-edit'),
				$change_payment_info_modal  = $('.app__user-change-payment-info-modal'),
				$change_payment_info_form   = $('.app__user-change-payment-info-form'),
				$change_payment_info_inputs = $change_payment_info_form.find('input'),
				$cancel_payment_info_change = $('.cancel-payment-info-change');

    //Showing Modals
		$add_payment_btn
		.on('click', function() {

			$add_payment_modal.fadeIn('slow');
			$('html, body')
			.on('touchmove scroll mousewheel', function() {

				return false;
			});
		});

		$change_payment_info_btn
		.on('click', function() {
			console.log('Clicked change');
			$change_payment_info_modal.fadeIn('slow');
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

		$cancel_payment_info_change
		.on('click', function() {

			$change_payment_info_modal.fadeOut('fast');
			$change_payment_info_inputs.val('').blur();
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

		$change_payment_info_form
		.on('submit', function() {

			$change_payment_info_modal.fadeOut('fast');
			$change_payment_info_inputs.val('').blur();
			$('html, body')
			.off('touchmove scroll mousewheel');
			return false;
		});
  },
  
  getInitialState: function() {

		return {

			payment_index: null
		}
	},
  
  _addPayment: function(e) {

		e.preventDefault();
		
		let name 	 			= this.refs.payment_name.value,
				account 	  = this.refs.payment_account.value,
				new_payment = new Payment({

					payment_name: name,
					payment_account: account 
				});
		console.log('added next');
		console.log(new_payment);
		AddPaymentAction(new_payment);
	},

	_deletePayment: function(elem) {

		let $payment_item = elem.parents('.app__user-payment');
		RemovePaymentAction($payment_item.index());
	},
  
  _getPaymentIndex: function(elem) {

		let $payment_item  = elem.parents('.app__user-payment'),
				$payment_index = $payment_item.index();

		this.setState({

			payment_index: $payment_index
		});
	},

	_changePaymentInfo: function(e) {

		e.preventDefault();

		let payment_name 	  = this.refs.payment_change_name.value,
				payment_account = this.refs.payment_change_account.value,
				payment_index   = this.state.payment_index;

		ChangePaymentInfoAction({

			name: payment_name,
			account: payment_account,
			index: payment_index
		});
	},
  
  render() {
    
    let payments,
				_this = this;

		if (this.props.payments.length === 0) {

			payments = <h5>Ви ще не додали жодного комунального платежа.</h5>;
		} else {

			payments = this.props.payments.map(function(payment, i) {

				return (
					
					<SinglePayment remove={_this._deletePayment} 
												 key={i} 
												 payment={payment}/>
				)
			});
		};
    
    return (
      
      <div className="payments-list">
      
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
        
        <div className="payments">
        
          <section className="app__user-add-new-payments">
              
              <div className="container">

                <div className="row">
                  
                  <div className="col-md-12">
                    
                    <div className="app__user-add-payment">
                      
                      <a className="waves-effect waves-teal btn-flat app__user-add-payment-btn">Додати новий платіж</a>
                    </div>
                  </div>
                </div>
              </div>
          </section>

          <section className="app__user-payments">
            
            <div className="container">
              
              <div className="row">
                
                <div className="col-md-12">
                  
                  <div className="app__user-payments-list">

                    {payments}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>      
    )
  }
})