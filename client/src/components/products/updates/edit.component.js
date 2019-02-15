// edit.component.js

import React, {Component} from 'react';
import axios from 'axios';

// import StepOne from '../forms/stepOne';
import StepTwo from '../forms/stepTwo';
import StepThree from '../forms/stepThree';


export default class Edit extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.goToStep = this.goToStep.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDataFromChild = this.handleDataFromChild.bind(this);
        this.updateData = this.updateData.bind(this);
        this.updateAndSubmit = this.updateAndSubmit.bind(this);
        this.showNextForm  = this.showNextForm.bind(this);
        this.state = {
            currentTab: 0
        }
    }

    handleInputChange() {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    componentDidMount() {
        axios.get('http://localhost:3000/product/edit/' + this.props.match.params.id)
            .then(res => {
                console.log('Successfully fetched data for update', res);
                this.handleDataFromChild(res.data);
                this.setState({
                    currentTab : res.data.product_steps_completed,
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    async handleDataFromChild(data) {
        const entries = Object.entries(data);
        // store data only
        for (let [key, value] of entries) {
            if (key.includes('product_')) {
                await this.setState({[key]: value});
            }
        }
        return this.state;
    }
    async updateAndSubmit(item) {
        const data = await this.handleDataFromChild(item);
        console.log('SAVE SUBMIT ENTERED !!');
        console.log('CREATE COMPONENT : SAVE AND SUBMIT', data);
        return new Promise((resolve, reject) => {
            this.updateData(data).then((res) => {
                console.log('Successfully saved', res);
                resolve(res)
            }).catch((error) => {
                console.log('ERROR! in SAVING DATA', error);
                reject(error);
            });
        })
    }
    updateData(data) {
        return new Promise((resolve, reject) => {
            axios.post('http://localhost:3000/product/update/' + this.props.match.params.id, data)
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
    goToStep(currentStep) {
        const stepsCompleted = currentStep;
        console.log('current step done', stepsCompleted);
        let currentComponent = '';
        switch (stepsCompleted) {
            /*    case 0:
                    currentComponent = (<StepOne handleDataFromChild={this.handleDataFromChild}
                                                 showNextForm={this.showNextForm}
                                                 saveAndSubmit={this.saveAndSubmit}/>);
                    break;*/
            case 1:
                currentComponent = (<StepTwo handleDataFromChild={this.handleDataFromChild}
                                             showNextForm={this.showNextForm}
                                             saveAndSubmit={this.updateAndSubmit}
                                             state={this.state}/>);
                break;
            case 2:
                currentComponent = (<StepThree saveAndSubmit={this.updateAndSubmit}
                                               state={this.state}/>);
        }
        return currentComponent;
    }
    showNextForm() {
        let currentTab = this.state.currentTab += 1;
        this.setState({currentTab});
    }
    onSubmit(e) {
        e.preventDefault();

        axios.post('http://localhost:3000/product/update/' + this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/index');
    }

    render() {
        const currentTab = this.state.currentTab;
        return (
            <div style={{marginTop: 10}}>
                <h1 align="center">Update Product</h1>
                {this.goToStep(currentTab)}
            </div>
        )
    }
}