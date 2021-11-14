import React from "react";
import LoginForm from "../../components/LoginForm";
import ProductService from "../../services/ProductService";
import SessionStorageHelper from "../../tools/SessionStorageHelper";
import { withRouter, RouteComponentProps } from 'react-router';

interface LoginState {
    username: string;
    usernameModified: boolean;
    usernameError: boolean;
    usernameErrorText: string;
    password: string;
    passwordModified: boolean;
    passwordError: boolean;
    passwordErrorText: string;
    showPassword: boolean;
    enableSubmit: boolean;
    authenticationFailed: boolean;
}

/**
 * LoginPage Container
 * @extends {Component<Props, State>}
 */
class LoginPage extends React.Component<RouteComponentProps, LoginState> {
    state = {
        username: '',
        usernameModified: false,
        usernameError: false,
        usernameErrorText: '',
        password: '',
        passwordModified: false,
        passwordError: false,
        passwordErrorText: '',
        showPassword: false,
        enableSubmit: false,
        authenticationFailed: false
    };

    render() {
        return (
            <LoginForm username={this.state.username} password={this.state.password} 
                onSubmit={this.handleSubmit} onPasswordChange={this.handlePasswordChange} 
                onUsernameChange={this.handleUsernameChange} onPasswordVisibleChange={this.handlePasswordVisibleChange}
                showPassword={this.state.showPassword} enableSubmit={this.state.enableSubmit} 
                usernameError={this.state.usernameError} usernameErrorText={this.state.usernameErrorText}
                passwordError={this.state.passwordError} passwordErrorText={this.state.passwordErrorText}
                authenticationFailed={this.state.authenticationFailed}
            />
        )
    }

    handleSubmit = (event: any) => {


        this.setState({ enableSubmit : false, authenticationFailed : false });

        ProductService.login(this.state.username, this.state.password)
            .then(response => {
                const jsonWebToken = response.data;
                console.log(jsonWebToken);
                SessionStorageHelper.updateToken(jsonWebToken.token);
                this.props.history.push('/products');
            }).catch(error => {
                console.log(error);

                if (error.response.status === 401) {
                    console.log("Authentication failed");
                    this.setState({ authenticationFailed : true, enableSubmit : true });
                }
            });
    }

    handleUsernameChange = (event: any) => {
        let target = event.currentTarget as HTMLInputElement;
        let value = target.value;
        this.setState({ username: value, usernameError: false, usernameErrorText: '', usernameModified: true }, () => {
            this.validateForm();
        });
    }

    handlePasswordChange = (event: any) => {
        let target = event.currentTarget as HTMLInputElement;
        let value = target.value;
        this.setState({ password: value, passwordError: false, passwordErrorText: '', passwordModified: true }, () => {
            this.validateForm();
        });
    }

    handlePasswordVisibleChange = (event: any) => {
        this.setState({ showPassword: !this.state.showPassword });
    }

    validateForm = () => {
        if (this.state.username === '' && this.state.usernameModified) {
            this.setState({ usernameError: true, usernameErrorText: 'Username is mandatory' });
        }

        if (this.state.password === '' && this.state.passwordModified) {
            this.setState({ passwordError: true, passwordErrorText: 'Password is mandatory' });
        }

        if (this.state.username === '' || this.state.password === '') {
            this.setState({ enableSubmit : false });
        } else {
            this.setState({ enableSubmit : true });
        }
    }
}

export default withRouter(LoginPage);