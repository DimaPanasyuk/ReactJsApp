import React         from 'react';
import UserStore     from '../stores/UserStore';
import Profile       from './Profile';

export default React.createClass({
  
  getInitialState() {
    
    return {
      
      profileInfo: UserStore.returnUserInfo()
    }  
  },
  
  componentDidMount() {
    
    UserStore.bind('update', this._userInfoUpdate);
  },
  
  _userInfoUpdate() {
    
    let profileInfo = UserStore.returnUserInfo();
    this.setState({
      
      profileInfo: profileInfo
    })
  },
  
  componentWillUnmount() {
    
    UserStore.unbind('update');
  },
  
  render() {
    
    return (
      
      <Profile user_info={this.state.profileInfo}>
      </Profile>      
    )
  }
})