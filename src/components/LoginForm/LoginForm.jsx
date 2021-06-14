import React, { Component } from 'react';
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
        //check already exist this username with this pass..
        for (var i = 0; i < this.state.users.length; i++) {
            if (this.state.users[i].username === this.state.username && this.state.users[i].password === this.state.password) {
                //if has, set the currently user logged and go to the user's dashboard
                
                this.setState({
                    idUser: this.state.users[i].id,
                    redirect: true
                })
            } else {    
                this.setState({
                    msg: "That username with this password doesn't exist"
                });
            }
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
                <section>
                    <form>
                        <label>
                        Username
                        <input
                            name="username"
                            type="text"
                            value={this.state.username}
                            onChange={this.handleInputChange} />
                        </label>
                        <br />
                        <label>
                        Password
                        <input
                            name="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.handleInputChange} />
                        </label>
                    </form>

                    <div className="msg-text">
                        
                        <ShowMessage msg={this.state.msg} />
                        
                    </div>

                    <div className="justify-content-between">
                        <button className="btn-primary" onClick={this.handleLogin}>Sigh In</button>
                        <Link to="/create-account">
                            <button className="btn-secondary">Sigh Up</button>
                        </Link>
                    </div>

                </section>
            );
        }
    }
}

export default LoginForm