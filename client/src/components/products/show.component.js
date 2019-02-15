// index.component.js

import React, { Component } from 'react';
import axios from 'axios';
// SHOULD BE DONE BY REDUX
export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {product: []};
        console.log('show component props', this.props);
    }
    componentDidMount(){
        console.log('show mounted??');
        console.log(this.props.match.params.id);
        axios.get('http://localhost:3000/product/show/' + this.props.match.params.id)
            .then(response => {
                console.log(response.data);
                this.setState(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        return (
            <div>
              <h2>DETAIlS DETAILS</h2>
                <div>
                    <span>Title: </span>
                    { this.state.product_title }
                </div>
                <div>
                    <span>Client code: </span>
                    { this.state.product_client_code }
                </div>
                <div>
                    <span>Condition: </span>
                    { this.state.product_condition }
                </div>
                <div>
                    <span>SKU: </span>
                    { this.state.product_SKU }
                </div>
                <div>
                    <span>Status: </span>
                    { this.state.product_status }
                </div>
                <div>
                    <span>Brand: </span>
                    { this.state.product_brand }
                </div>
                <div>
                    <span>Model Number: </span>
                    { this.state.product_model_number }
                </div>
                <div>
                    <span>Dimensions: </span>
                    { this.state.product_dimensions }
                </div>
                <div>
                    <span>Weight: </span>
                    { this.state.product_weight }
                </div>
                <div>
                    <span>Quantity: </span>
                    { this.state.product_quantity }
                </div>
                <div>
                    <span>Listed Price: </span>
                    { this.state.product_listed_price }
                </div>
                <div>
                    <span>Selling Price: </span>
                    { this.state.product_selling_price }
                </div>
                <div>
                    <span>Location: </span>
                    { this.state.product_location }
                </div>
                <div>
                    <span>Payment Method: </span>
                    { this.state.product_payment_method }
                </div>
                <div>
                    <span>Transaction Detail: </span>
                    { this.state.product_transaction_details }
                </div>
                <div>
                    <span>Amount Received: </span>
                    { this.state.product_amount_received }
                </div>
                <button type="button" className="btn btn-primary"
                        onClick={this.saveAndSubmit}>EDIT PRODUCT
                </button>
            </div>
        );
    }
}