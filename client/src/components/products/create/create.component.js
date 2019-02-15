// create.component.js

import React, {Component} from 'react';
import axios from 'axios';

import StepOne from '../forms/stepOne';
import StepTwo from '../forms/stepTwo';
import StepThree from '../forms/stepThree';

export default class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product_client_code: null,
            product_title: null,
            product_brand: null,
            product_model_number: null,
            product_dimensions: null,
            product_weight: 0,
            product_quantity: 0,
            product_category: null,
            product_condition: null,
            // product_SKU: 0,
            product_images: null,
            product_description: null,
            product_location: null,
            product_reserve: 0,
            product_selling_price: 0,
            product_listed_price: 0,
            product_steps_completed: 0,
            childComponents: ['StepOne', 'StepTwo', 'StepThree'],
            currentTab: 0,
            linkActive: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDataFromChild = this.handleDataFromChild.bind(this);
        this.showNextForm = this.showNextForm.bind(this);
        this.saveAndSubmit = this.saveAndSubmit.bind(this);
    }

    handleInputChange() {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    async handleDataFromChild(data) {
        const entries = Object.entries(data);

        // store data only
        for (let [key, value] of entries) {
            if(key.includes('product_')) {
                await this.setState({[key]: value});
            }
        }
        return this.state;
    }

    async saveAndSubmit(item) {
        const data = await this.handleDataFromChild(item);
        console.log('CREATE COMPONENT : SAVE AND SUBMIT', data);
        return new Promise((resolve, reject) => {
            this.postData(data).then((res) => {
                console.log('Successfully saved', res);
                resolve(res)
            }).catch((error) => {
                console.log('ERROR! in SAVING DATA', error);
                reject(error);
            });
        })
    }

    postData(data) {
        return new Promise((resolve, reject) => {
            axios.post('http://localhost:3000/product/create', data)
                .then(res => {
                    console.log('Uploading success!!');
                    resolve(res);
                })
                .catch((error) => {
                    console.log('ERROR!!!', error.response);
                    reject(error);
                });
        });
    }

    showForm(n) {
        let currentTab = n;

        // This function will display the specified tab of the form...
        let childElements = this.state.childComponents;
        let lastIndex = childElements.length;

        // Validate data-index
        if (currentTab > lastIndex) {
            currentTab = lastIndex
        }
        if (currentTab < 0) {
            currentTab = 0;
        }
        let currentComponent = null;
        switch (currentTab) {
            case 0:
                currentComponent = (<StepOne
                    handleDataFromChild={this.handleDataFromChild}
                    showNextForm={this.showNextForm}
                    saveAndSubmit={this.saveAndSubmit}/>);
                break;
            case 1:
                currentComponent = (<StepTwo handleDataFromChild={this.handleDataFromChild}
                                             showNextForm={this.showNextForm}
                                             saveAndSubmit={this.saveAndSubmit}
                                             state={this.state}/>);
                break;
            case 2:
                currentComponent = (<StepThree saveAndSubmit={this.saveAndSubmit}
                                               state={this.state}/>);
        }
        return currentComponent;
    }

    showNextForm() {
        let currentTab = this.state.currentTab += 1;
        this.setState({currentTab});
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Add New Product</h3>
                <form encType="multipart/form-data">
                    {this.showForm(this.state.currentTab)}
                </form>
            </div>
        )
    }
}