import { Button, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import Alert from '@material-ui/lab/Alert';
import React from "react";
import "./index.css";

interface LoginProps {
    username: string;
    usernameError: boolean;
    usernameErrorText: string;
    password: string;
    passwordError: boolean;
    passwordErrorText: string;    
    showPassword: boolean;
    enableSubmit: boolean;
    authenticationFailed: boolean;
    onUsernameChange(event: any): void;
    onPasswordChange(event: any): void;
    onPasswordVisibleChange(event: any): void;
    onSubmit(event: any): void;
}

const LoginForm: React.FC<LoginProps> = (props) => {
    var errorMessage : any;

    if (props.authenticationFailed === true) {
        errorMessage = <Alert severity="error">Wrong credentials!</Alert>;
    }

    return (
        <div className="loginForm">
            { errorMessage }

            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={6} xl={4}>
                    <TextField
                        required
                        id="username"
                        label="Username"
                        variant="outlined"
                        value={props.username}
                        onChange={props.onUsernameChange}
                        autoComplete="off"
                        error={props.usernameError}
                        helperText={props.usernameErrorText}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6} xl={4}>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="password" error={props.passwordError}>Password * </InputLabel>
                        <OutlinedInput
                            id="password"
                            type={props.showPassword ? 'text' : 'password'}
                            value={props.password}
                            onChange={props.onPasswordChange}
                            autoComplete="off"
                            required
                            error={props.passwordError}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        edge="end"
                                        onClick={props.onPasswordVisibleChange}
                                    >
                                        {props.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                        <FormHelperText error={props.passwordError}>
                            {props.passwordErrorText}
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6} xl={4}>
                    <Button variant="contained" onClick={props.onSubmit} disabled={!props.enableSubmit}>Login</Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default LoginForm;