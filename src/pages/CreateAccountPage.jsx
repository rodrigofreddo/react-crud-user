import React, { Component } from 'react';
import ShowMessage from '../components/ShowMessage/ShowMessage';
import { Link } from 'react-router-dom';
import axios from 'axios';

class CreateAccountPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msgUsername: '',
            msgErrors: '',
            users: [],
            username: '',
            password: '',
            passwordConfirm: '',
            fullname: '',
            mail: '',
            msg: '',
            alreadyExist: false,
            itsDifferent: false,
            toHomePage: false
        };

        this.handleRegisterUser = this.handleRegisterUser.bind(this);
    }

    componentDidMount() {
        axios.get(`http://localhost:3000/users`)
          .then(res => {
            const users = res.data;
            this.setState({ users });
        })
    }

    handleVerifyUser(){
        this.setState = {
            alreadyExist: false
        }
        //check already exist this username..
        for (var i = 0; i < this.state.users.length; i++) {
            if (this.state.users[i].username === this.state.username) {
                this.setState = {
                    alreadyExist: true
                }
                break;
            }
        }
    }
    
    handleVerifySamePass(event) {

        //initialize the variable if is different and get the value of the target element
        this.setState = {
            itsDifferent: false
        }

        let pass = event.target.value;

        if (pass.length < 8) { //Verify if the pass has more then 8 characters
        
            this.setState = {
                msg: "That password is too short"
            }  

        } else if (!/[0-9]/.test(pass)) { //Verify if the pass has numbers
            
            this.setState = {
                msg: "That password doesn't have numbers"
            }
            
        } else if (!/[-!$%^&*()_+|~=`{}[\]:";'<>?,./]/.test(pass)) { //Verify if the pass has symbols
        
            this.setState = {
                msg: "it's required at least one symbol at the password"
            }
        
        } else {
        
            //check if the pass is the same..
            if (pass !== this.state.password || pass !== this.state.passwordConfirm) {
                this.setState = {
                    itsDifferent: true,
                    msg: "It's not the same"
                }
            } else {
                //if yes, remove the error message
                this.setState = {
                    msg: ""
                }
            }
        }
    }

    
    handleRegisterUser() {
        if (this.state.username.length > 0 && this.state.password.length > 0 && this.state.passwordConfirm.length > 0) {
            if (!this.state.alreadyExist) {
                if (!this.state.itsDifferent) {
                    // const { data } = await axios.post("http://localhost:3000/users", {
                    //     username: this.state.username,
                    //     password: this.state.password,
                    //     fullname: this.state.fullname,
                    //     mail: this.state.mail
                    // });

                    //Clean the variables
                    

                    //comes back to the login page
                    this.setState({ toHomePage: true });
                } else {
                    this.setState = {msg: "The password didn't has been confirmed"}
                }
            } else {
                this.setState = {msg: "The username already exist's, please write another"}
            }
        } else {
            this.setState = {msg: "Please fill the required field's"}
        }
    }

    render() {
        return(
            <section>
                <h1 className="title">Create a new account</h1>

                <form>
                    <label htmlFor="fullname">Fullname</label>
                    <input type="text" placeholder="Write your name and lastname" name="fullname"/>
                    
                    <label htmlFor="username">Username</label>
                    <input type="text" placeholder="Write a username" name="username"/>

                    <div className="msg-text">
                        
                        <ShowMessage msg={this.state.msgUsername} />
                        
                    </div>
                    
                    <label htmlFor="mail">Mail</label>
                    <input type="text" placeholder="Write your mail like lorem@ipsum.com" name="mail"/>
                    
                    <label htmlFor="password">A decent password *</label>
                    <input type="password" autoComplete="off" placeholder="Write your password like Fg8horseGo192@!" name="password"/>

                    <label htmlFor="passwordConfirm">Confirm your password</label>
                    <input type="password" autoComplete="off" placeholder="Write your password again" name="passwordConfirm"/>

                    <div className="msg-text">
                        
                        <ShowMessage msg={this.state.msgErrors} />
                        
                    </div>
                
                </form>

                <button onClick={this.handleRegisterUser} className="btn-primary">Register</button>

                <Link to="/">
                    <button className="btn-secondary">Cancel</button>
                </Link>

            </section>
        );
    }
}

export default CreateAccountPage