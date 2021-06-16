import React, { Component } from 'react';
import './LoginForm.css'
import axios from 'axios'; 
import ShowMessage from '../ShowMessage/ShowMessage';
import { Link, Redirect } from 'react-router-dom';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect: false,
            idUser: 0
        };
    
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    componentDidMount() {
        axios.get(`http://localhost:3000/users`)
          .then(res => {
            const users = res.data;
            this.setState({ users });
        })
    }
    
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let msg = '';
    
        this.setState({
            [name]: value,
            msg
        });
    }

    handleLogin() {
        if (this.state.users !== undefined) {
            //check already exist this username with this pass..
            for (var i = 0; i < this.state.users.length; i++) {
                if (this.state.users[i].username === this.state.username && this.state.users[i].password === this.state.password) {
                    //if has, set the currently user logged and go to the user's dashboard
                    
                    this.setState({
                        idUser: this.state.users[i].id,
                        redirect: true
                    })
                } else {    
                    this.setState({msg: "That username with this password doesn't exist"});
                }
            }
        } else {
            this.setState({msg: "The API Server is down, please try again later"});
        }
    }
    
    render() {
        
        if (this.state.redirect) { //If the user is authenticate, then go to your dashboard
            return <Redirect to={{
                pathname: "/dashboard/",
                state: { idUser: this.state.idUser }
            }} />
        } else { //otherwise, render the form
            return (
                <section className="LoginForm">
                    <h1 className="title">{ this.props.title }</h1>
                    <form>
                        <label htmlFor="username">Username</label>
                        <input
                            name="username"
                            type="text"
                            value={this.state.username}
                            onChange={this.handleInputChange} 
                            placeholder="Write your username"
                        />
                        
                        <label htmlFor="username">Password</label>
                        
                        <input
                            name="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.handleInputChange} 
                            placeholder="Write your password"
                        />
                        
                    </form>

                    <div className="msg-text">
                        
                        <ShowMessage msg={this.state.msg} />
                        
                    </div>

                    <div className="wrapper-btns">
                        <button type="button" className="btn btn-info" onClick={this.handleLogin}>Sigh In</button>
                        <Link to="/create-account">
                            <button type="button" className="btn btn-secondary">Sigh Up</button>
                        </Link>
                    </div>

                </section>
            );
        }
    }
}

export default LoginForm