import React 								   from 'react';
import LogOutAction 			     from '../actions/LogOutAction';
import { Link }                from 'react-router';


export default React.createClass({
		
	//componentDidMount needs refactoring
	//too big function
	componentDidMount: function() {

    let $header_logo_user_name     = $('.app__user-header-top-line-content h3'),
				$window 							     = $(window);
		
		$('body, html')
		.animate({

			scrollTop: 0
		}, 200);

		$window
		.on('scroll', function() {
			
			let st = $window.scrollTop();

			$header_logo_user_name.css({

				transform: 'translate(0px, '+st+'px)',
				opacity: 1 - st/200
			});
		});
	},

	_logOut: function() {

		LogOutAction();
	},

	render: function() {

		return (
	
			<div className="app__user-interface">
        
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
							
							<div className="row header__menu">
								
                <div className="col-sm-9">
                  
                  <div className="header__menu__logo">
                 
                    <h5>
                      <em>{this.props.user_info.login}</em>
                    </h5>
                  </div>
                  
                  <ul className="header__menu-items">
                    <li className="header__menu-items__item">
                      
                      <Link to="jek/profile"
                            activeClassName="header__menu-items__item-link--active"
                            className="header__menu-items__item-link">
                        Мій профіль
                      </Link>
                    </li>
                    <li className="header__menu-items__item">
                      
                      <Link to="jek/payments"
                            activeClassName="header__menu-items__item-link--active"
                            className="header__menu-items__item-link">
                       Платежі
                      </Link>
                    </li>
                  </ul>
                </div>
								<div className="col-sm-3">
									
									<div className="header__log-out">
									
										<button onClick={this._logOut} className="waves-effect waves-light btn">Вийти</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</header>
			</div>
		)
	}
});