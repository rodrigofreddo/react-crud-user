import React, { Component } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';

class HomePage extends Component {
    render() {
        return(
            <section>
                <LoginForm title="Welcome to my React APP"/>
            </section>
        );
    }
}

export default HomePage