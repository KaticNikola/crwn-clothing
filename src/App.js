import React from 'react';

import { Route, Switch } from 'react-router-dom'

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop';
import Header from './components/header/header';
import SignInAndSignUp from './pages/signIn-signUp/signIn-signUp';
import { auth, creteUserProfileDocument } from './firebase/fireabse.utils';




class App extends React.Component {


  state = {
    currentUser: null
  }

  unsbscribeFromAuth = null

  componentDidMount(){
    this.unsbscribeFromAuth = auth.onAuthStateChanged( async userAuth =>{
      if(userAuth){
        const userRef = await creteUserProfileDocument(userAuth);
        
        userRef.onSnapshot( snapshot =>{
          this.setState({
            currentUser:{
              id: snapshot.id,
              ...snapshot.data()
            }
          })
        })
      } else{
        this.setState({ currentUser: userAuth })
      }
      
    })
  }

componentWillUnmount(){
  this.unsbscribeFromAuth()
}

  render(){
    return (
      <div>
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
