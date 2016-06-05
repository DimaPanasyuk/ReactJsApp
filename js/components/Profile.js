import React 								   from 'react';
import ChangeUserInfoAction    from '../actions/ChangeUserInfoAction';

export default React.createClass({
		
	//componentDidMount needs refactoring
	//too big function
	componentDidMount: function() {

    console.debug('rendered component profile');

		let $change_user_info_btn      = $('.app__user-about-change'),
				$change_user_info_modal    = $('.app__user-change-user-info-modal'),
				$change_user_info_form     = $('.app__user-change-user-info-form'),
				$change_user_info_inputs   = $change_user_info_form.find('input'),
				$cancel_user_info_change   = $('.cancel-user-info-change'),

				$header_logo_user_name     = $('.app__user-header-top-line-content h3'),
				$window 							     = $(window);

		$('select').material_select();

		$change_user_info_btn
		.on('click', function() {

			$change_user_info_modal.fadeIn('slow');
			$('html, body')
			.on('touchmove scroll mousewheel', function() {

				return false;
			});
		});
    
		$cancel_user_info_change
		.on('click', function() {

			$change_user_info_modal.fadeOut('fast');
			$change_user_info_inputs.val('').blur();
			$('select').val('');
			$('html, body')
			.off('touchmove scroll mousewheel');
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
	},
	
	_changeUserInfo: function(e) {
	
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

	render: function() {

		return (
	
			<div>
        
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

				<section className="app__user-about">
					
					<div className="container">
						
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
										Редагувати
									</button>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		)
	}
});