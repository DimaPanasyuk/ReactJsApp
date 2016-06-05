import React 				 from 'react';
import UserInterface from '../components/UserInterface';
import UserStore 		 from '../stores/UserStore';
import MicroEvent    from '../microEvent';

export default React.createClass({

	componentDidMount: function() {
		
		UserStore.bind('update', this._storeUpdate);
	},

	_storeUpdate: function() {

		let current_user = UserStore.returnUserInfo();
		this.setState({

			user: current_user
		});
	},	
	
	componentWillMount: function() {

		let current_user = UserStore.returnUserInfo();
		this.setState({

			user: current_user
		});
	},
  
  componentWillUnmount() {
    
    UserStore.unbind('update');
  },

	render: function() {

		return (
      <div>
			  <UserInterface user_info = {this.state.user}/>
        <div className="app__content">
          {this.props.children}
        </div>
      </div>
		)
	}
})