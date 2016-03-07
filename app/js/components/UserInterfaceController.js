import React 				 from 'react';
import MicroEvent    from '../microEvent';
import UserStore 	 	 from '../stores/UserStore';
import UserInterface from '../components/UserInterface';

export default React.createClass({

	getInitialState() {

		return {

			user: UserStore.returnUserInfo()
		}
	},

	_storeUpdate() {

		this.setState({

			user: UserStore.returnUserInfo()
		});
	},

	componentDidMount() {
		
		UserStore.bind('update', this._storeUpdate);
	},

	componentWillUnmount() {

		UserStore.unbind('update', this._storeUpdate);
	},

	render() {

		return (

			<UserInterface user_info={this.state.user}/>
		)
	}
});