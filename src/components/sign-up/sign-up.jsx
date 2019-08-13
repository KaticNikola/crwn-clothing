import React from 'react'

import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';

import { auth, creteUserProfileDocument } from '../../firebase/fireabse.utils'

import './sign-up.scss'


class SingUp extends React.Component{

    state={
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    handleSubmit = async e =>{
        e.preventDefault();

        const { displayName, email, password, confirmPassword } = this.state;

        if( password !== confirmPassword ){
            alert("password don't match");
            return
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword( email, password );

            await creteUserProfileDocument( user, { displayName })

            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })

        } catch (error) {
            console.error(error)
        }

    }

    handleChange = e =>{
        const { name, value } = e.target;

        this.setState({ [ name ]: value })
    }

    render(){
        const { displayName, email, password, confirmPassword } = this.state
        return(
            <div className="sign-up">
                <h2 className="title">I do not have a account</h2>
                <span>Sing up whit your email and password</span>
                <form className="sing-up-form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type='text'
                        name="displayName"
                        value={ displayName }
                        onChange = { this.handleChange }
                        label= "Display Name"
                        required
                        />
                    <FormInput
                        type='email'
                        name="email"
                        value={ email }
                        onChange = { this.handleChange }
                        label= "Email"
                        required
                        />
                    <FormInput
                        type='password'
                        name="password"
                        value={ password }
                        onChange = { this.handleChange }
                        label= "Password"
                        required
                        />
                    <FormInput
                        type='password'
                        name="confirmPassword"
                        value={ confirmPassword }
                        onChange = { this.handleChange }
                        label= "Confirm Password"
                        required
                        />

                        <CustomButton type="submit">Sign UP</CustomButton>
                </form>
            </div>
        )
    }
}

export default SingUp;