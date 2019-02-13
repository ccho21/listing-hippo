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
                { this.state.product_title }
            </div>
        );
    }
}