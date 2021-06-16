import React, { Component } from 'react';
import './EditAccountPage.css'
import ShowMessage from '../../components/ShowMessage/ShowMessage';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class EditAccountPage extends Component {
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
            alreadyExist: false,
            itsDifferent: false,
            toHomePage: false,
            user: {},
            oldPassword: ''
        };

        this.handleEditUser = this.handleEditUser.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleVerifySamePass = this.handleVerifySamePass.bind(this);
        this.handleVerifyUsername = this.handleVerifyUsername.bind(this);
    }

    componentDidMount() {
        //get the user with the correct id and then fill the prop user of the component
        axios.get(`http://localhost:3000/users/${this.props.location.state.idUser}`)
          .then(res => {
            const user = res.data;
            this.setState({ 
                user : user,
                fullname : user.fullname,
                username : user.username,
                mail : user.mail,
            });
        });

        //get all user's to authenticate the password
        axios.get(`http://localhost:3000/users`)
          .then(res => {
            const users = res.data;
            this.setState({ users });
        })
    }

    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        });
    }

    handleVerifyUsername(event) {
        
        this.setState({alreadyExist: false});

        //check already exist this username..
        for (var i = 0; i < this.state.users.length; i++) {
            if (this.state.users[i].username === event.target.value) {
                this.setState({
                    msgUsername: 'That username already has been used', 
                    alreadyExist: false
                });
                break;
            } else {
                this.setState({
                    msgUsername: '', 
                })
            }
        }
    }
    
    handleVerifySamePass(event) {

        const pass = event.target.value;

        if (pass.length < 8) { //Verify if the pass has more then 8 characters
        
            this.setState({msgErrors: "That password is too short"});

        } else if (!/[0-9]/.test(pass)) { //Verify if the pass has numbers
            
            this.setState({msgErrors: "That password doesn't have numbers"});
            
        } else if (!/[-!$%^&*()_+|~=`{}[\]:";'<>?,./]/.test(pass)) { //Verify if the pass has symbols
        
            this.setState({msgErrors: "it's required at least one symbol at the password"});
        
        } else {  
        
            //check if the pass is the same..
            if (pass !== this.state.password || pass !== this.state.passwordConfirm) {
                this.setState({msgErrors: "It's not the same"});
            } else {
                //if yes, remove the error message
                this.setState({msgErrors: ''});
            }
        }
    }

    
    handleEditUser() {
        let correctPass = false;
console.log(this.state.user.id, this.state.user.password, this.state.oldPassword);
        //check already exist this username with this pass..
        if (this.state.user.password === this.state.oldPassword) {
            //if has, set the currently user logged and go to the user's dashboard
            correctPass = true;

            this.setState({
                idUser: this.state.user.id,
                redirect: true
            })
        } else {    
            this.setState({msg: "That username with this password doesn't exist"});
        }

        if (this.state.username.length > 0 && correctPass) {
            if (!this.state.alreadyExist) {
                if (!this.state.msgErrors.length) {

                    //widhout encapsulate, just put the direct obj, that way don't mess up with the auto incremment
                    axios.put(`http://localhost:3000/users/${this.state.user.id}`,{
                        username: this.state.username,
                        fullname: this.state.fullname,
                        password: (this.state.password.length ? this.state.password : this.state.oldPassword),
                        confirmPassword: this.state.confirmPassword,
                        mail: this.state.mail 
                    }).then(res => {
                        console.log(`The user ${res.data.username} has been added`);
                        this.setState({ toDashboard: true });
                    });    
                    
                } else {
                    this.setState({msgErrors: "The password didn't has been confirmed"})
                }
            } else {
                this.setState({msgUsername: "The username already exist's, please write another"})
            }
        } else {
            this.setState({msgErrors: "The username or your password is not correct"})
        }
    }

    render() {
        if (this.state.toDashboard) {
            return <Redirect to={{
                pathname: "/dashboard/",
                state: {userID: this.state.user.id}
            }} />
        } else {
            return(
                <section className="FormAccount">
                    <h1 className="title">Edit the {this.state.user.fullname} account</h1>

                    <form>
                        <label htmlFor="fullname">Fullname</label>
                        <input 
                            type="text" 
                            placeholder="Write your name and lastname" 
                            name="fullname"
                            value={this.state.fullname}
                            onChange={this.handleInputChange}
                        />
                        
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text" 
                            placeholder="Write a username" 
                            name="username"
                            value={this.state.username}
                            onChange={this.handleInputChange}
                            onKeyUp={this.handleVerifyUsername}
                        />

                        <div className="msg-text">
                            
                            <ShowMessage msg={this.state.msgUsername} />
                            
                        </div>
                        
                        <label htmlFor="mail">Mail</label>
                        <input 
                            type="text" 
                            placeholder="Write your mail like lorem@ipsum.com" 
                            name="mail"
                            value={this.state.mail}
                            onChange={this.handleInputChange}
                        />

                        <label htmlFor="oldPassword">Your password *</label>
                        <input 
                            type="password" 
                            autoComplete="off" 
                            placeholder="Write your password like Fg8horseGo192@!" 
                            name="oldPassword"
                            value={this.state.oldPassword}
                            onChange={this.handleInputChange}
                        />
                        
                        <label htmlFor="password">A new password</label>
                        <input 
                            type="password" 
                            autoComplete="off" 
                            placeholder="Write your password like Fg8horseGo192@!" 
                            name="password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            onKeyUp={this.handleVerifySamePass}
                        />

                        <label htmlFor="passwordConfirm">Confirm your password</label>
                        <input 
                            type="password" 
                            autoComplete="off" 
                            placeholder="Write your password again" 
                            name="passwordConfirm"
                            value={this.state.passwordConfirm}
                            onChange={this.handleInputChange}
                            onKeyUp={this.handleVerifySamePass}
                        />

                        <div className="msg-text">
                            
                            <ShowMessage msg={this.state.msgErrors} />
                            
                        </div>
                    
                    </form>

                    <div className="wrapper-btns">
                        <button type="button" onClick={this.handleEditUser} className="btn btn-info">Register</button>

                        <Link to="/">
                            <button type="button" className="btn btn-secondary">Cancel</button>
                        </Link>
                    </div>

                </section>
            );
        }
    }
}

export default EditAccountPage