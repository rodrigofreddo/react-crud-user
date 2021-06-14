import React, { Component } from 'react';
import LoginForm from '../components/LoginForm/LoginForm';

class HomePage extends Component {
    render() {
        return(
            <section>
                <h1 className="title">Welcome to my React APP</h1>
                <LoginForm />
            </section>
        );
    }
}

export default HomePage