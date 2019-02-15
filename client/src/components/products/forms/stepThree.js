import axios from "axios";
import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

export default class Create extends Component {
    constructor(props) {
        super(props);
        console.log('step three ', props);

        // Enter Listed Price, Selling Price, and Reserve
        this.state = {
            product_listed_price: 0,
            product_selling_price: 0,
            product_reserve: 0,
            product_status: 'Item Available',
            product_steps_completed: 3,

            linkActive : false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.saveAndSubmit = this.saveAndSubmit.bind(this);
    }

    saveAndSubmit(e) {
        e.preventDefault();
        const data = this.state;

        console.log('last set data ', data);
        this.props.saveAndSubmit(data)
            .then((res) => {
                console.log('step THREE save and submit success', res);
                this.setState({
                    linkActive: true
                })
            }).catch((error) => {
            console.log('step THREE save and submit', error);
            this.setState({
                linkActive: false
            });
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    render() {
        let linkActive = this.state.linkActive;
        const redirectTo = () => {
            return linkActive ? <Redirect to="/index"/> : false;
        };

        return (
            <div style={{marginTop: 10}}>
                <h1>STEP THREE</h1>
                <div className="tab">
                    <div className="form-group">
                        <label>Listed Price: </label>
                        <input type="number"
                               className="form-control"
                               name="product_listed_price"
                               value={this.state.product_listed_price}
                               onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Selling Price: </label>
                        <input type="number"
                               className="form-control"
                               name="product_selling_price"
                               value={this.state.product_selling_price}
                               onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Reserve: </label>
                        <input type="number"
                               className="form-control"
                               name="product_reserve"
                               value={this.state.product_reserve}
                               onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="form-group text-right">
                        <input type="submit" value="Register Product" onClick={this.saveAndSubmit} className="btn btn-primary"/>
                    </div>
                    {redirectTo()}
                </div>
                {/*STEP THREE ENDS*/}
            </div>
        )
    }
}