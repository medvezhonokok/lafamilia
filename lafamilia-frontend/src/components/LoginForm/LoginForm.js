import React, {useState} from 'react';
import * as client from "../../client/client";
import './LoginForm.css';

const LoginForm = ({setUser, setJwtToken}) => {
    const [credentials, setCredentials] = useState({
        login: "",
        password: ""
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setError(null);

        client.login(credentials)
            .then(token => {
                localStorage.setItem('jwt', token);
                setJwtToken(token);
                client.getUser(token)
                    .then(userJson => setUser(userJson))
                    .catch(ignored => console.log(ignored));
            })
            .catch(err => {
                setError(err.response.data.split("=-=-=")[1]);
            })
            .finally(() => setIsLoading(false))
        ;
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="login">username</label>
                        <input
                            type="text"
                            id="login"
                            name="login"
                            value={credentials.login}
                            onChange={handleInputChange}
                            required
                            autoComplete="username"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleInputChange}
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="login-button"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;