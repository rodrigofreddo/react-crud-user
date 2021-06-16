import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import './DashboardPage.css'

class DashboardPage extends Component {
    constructor(props) {
        super(props);
        
        //add the user prop to be accessed for the get request of the API
        this.state = {
            user: {},
            toLogin: false
        }

        //Bind of the delete event of the button
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        //get the user with the correct id and then fill the prop user of the component
        axios.get(`http://localhost:3000/users/${this.props.location.state.idUser}`)
          .then(res => {
            const user = res.data;
            this.setState({ user });
        })
    }

    handleDelete() {
        let deleted = axios.delete(`http://localhost:3000/users/${this.state.user.id}`, { data: this.users });
        if (deleted) {
            this.setState({
                toHomePage: true
            });
        }
    }
    
    render() {
        if (this.state.toHomePage) {
            return <Redirect to="/" />
        } else {
            return(
                <section className="Dashboard">
                    <h1 className="title">{ this.state.user.username }'s Dashboard</h1>
                    <ul>
                        <li>Full name: { this.state.user.fullname }</li>
                        <li>E-mail: { this.state.user.mail }</li>
                        <li>Username: { this.state.user.username }</li>
                    </ul>

                    
                    <div className="wrapper-btns">
                        
                        <Link to={{
                            pathname: '/edit-account',
                            state: { idUser: this.state.user.id }
                        }}>
                            <button type="button" className="btn btn-info">Edit</button>
                        </Link>
                        
                        <button onClick={this.handleDelete} type="button" className="btn btn-danger">Deletar</button>
                        
                        <Link to="/">
                            <button type="button" className="btn btn-secondary">Sigh Out</button>
                        </Link>
                    </div>
                    
                </section>
            );
        }
    }
}

export default DashboardPage