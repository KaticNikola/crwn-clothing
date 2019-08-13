import React from 'react';

import { Route, Switch } from 'react-router-dom'

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop';
import Header from './components/header/header';
import SignInAndSignUp from './pages/signIn-signUp/signIn-signUp';
import { auth } from './firebase/fireabse.utils';



class App extends React.Component {


  state = {
    currentUser: null
  }

  unsbscribeFromAuth = null

  componentDidMount(){
    this.unsbscribeFromAuth = auth.onAuthStateChanged( user =>{
      this.setState({ currentUser: user })

      console.log(user)
    })
  }

componentWillUnmount(){
  this.unsbscribeFromAuth()
}

  render(){
    return (
      <div >
        <Header currentUser={ this.state.currentUser } />
        <Switch>
             <Route exact path="/" component={ HomePage } />
             <Route path="/shop" component={ ShopPage } />
             <Route path='/signin' component={SignInAndSignUp} />
        </Switch>
      </div>
    );
  }
}

export default App;
