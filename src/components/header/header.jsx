import React from 'react'
import { Link } from 'react-router-dom';

import { auth } from '../../firebase/fireabse.utils';

import { ReactComponent as Logo } from '../../assets/crown.svg'

import './header.scss'

const Header = ({ currentUser })=>{
	return(
		<div className="header">
			<Link className='logo-container' to='/' >
				<Logo className="logo"></Logo>
			</Link>
			<div className="options">
				<Link className="option" to='/shop'>SHOP</Link>
				<Link className="option" to='/contact'>CONTACT</Link>
				{
					currentUser ?
					<div className="option" onClick={ ()=> auth.signOut() }> SING OUT </div>
					:
					<Link className="option" to="/signin">SING IN</Link>
				}
			</div>
		</div>
	)
}

export default Header;