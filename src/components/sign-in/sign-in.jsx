import React from 'react'

import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';

import { auth, signInWithGoogle } from '../../firebase/fireabse.utils'

import './sign-in.scss'

class SignIn extends React.Component {

	state = {
		email: '',
		password: ''
	}

	handleSubmit = async e => {
		e.preventDefault();

		const { email, password } = this.state;

		try {
			await auth.signInWithEmailAndPassword( email, password )
			this.setState({ email: '', password: '' })

		} catch (error) {
			console.log(error)
		}

		
	}
	handleChange = e => {
		const { value, name } = e.target;

		this.setState({ [name]: value })
	}
	render() {
		return (
			<div className="sign-in">
				<h2>I already have an account</h2>
				<span>Sign in with your email and password</span>

				<form onSubmit={this.handleSubmit}>
					<FormInput
						type="email"
						name="email"
						value={this.state.email}
						handleChange={this.handleChange}
						label='email'
						required />

					<FormInput
						type="password"
						name="password"
						value={this.state.password}
						handleChange={this.handleChange}
						label='password'
						required />

					<div className="buttons">
						<CustomButton type="submit">Sign In </CustomButton>
						<CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign In With Google </CustomButton>
					</div>

				</form>
			</div>
		)
	}
}

export default SignIn;