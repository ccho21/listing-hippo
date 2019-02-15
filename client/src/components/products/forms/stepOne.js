import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'

export default class StepOne extends Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.saveAndSubmit = this.saveAndSubmit.bind(this);
        this.nextStep = this.nextStep.bind(this);

        this.state = {
            product_client_code: '',
            product_title: '',
            product_brand: '',
            product_model_number: '',
            product_dimensions: '',
            product_weight: '',
            product_quantity: '',
            product_category: '',
            product_condition: '',
            product_status: 'Pending List',
            product_steps_completed: 1,

            linkActive: false
        };
    }

    saveAndSubmit(e) {
        e.preventDefault();
        // save in child component
        let data = this.state;
        console.log('stepOne: save and submit', data);
        this.props.saveAndSubmit(data)
            .then((res) => {
                console.log('step one save and submit success', res);
                this.setState({
                    linkActive: true
                })
            }).catch((error) => {
            console.log('step one save and submit', error);
            this.setState({
                linkActive: false
            })
        });
    }

    nextStep(e) {
        e.preventDefault();
        const data = this.state;
        console.log('data in next step one', data);
        this.props.handleDataFromChild(data);
        this.props.showNextForm();
    }

    // MULTI FORMS ENDS
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
         this.setState({
            [name]: value
        });
    }

    render() {
        const linkActive = this.state.linkActive;
        const redirectTo = () => {
            return linkActive ? <Redirect to="/index"/> : false;
        };

        return (
            <div style={{marginTop: 10}}>
                <div className="tab">
                    <h1> STEP ONE</h1>
                    <div className="form-group">
                        <label>Client Code: </label>
                        <input
                            type="text"
                            className="form-control"
                            name="product_client_code"
                            value={this.state.product_client_code}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Condition: </label>
                        <select className="custom-select"
                                name="product_condition"
                                value={this.state.product_condition}
                                onChange={this.handleInputChange}>
                            <option>Select product condition</option>
                            <option value="New">New</option>
                            <option value="Used">Used</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Product Title: </label>
                        <input
                            type="text"
                            className="form-control"
                            name="product_title"
                            value={this.state.product_title}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Product Brand: </label>
                        <input type="text"
                               className="form-control"
                               name="product_brand"
                               value={this.state.product_brand}
                               onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Model Number: </label>
                        <input type="text"
                               className="form-control"
                               name="product_model_number"
                               value={this.state.product_model_number}
                               onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Dimensions: </label>
                        <input type="text"
                               className="form-control"
                               name="product_dimensions"
                               value={this.state.product_dimensions}
                               onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Weight: </label>
                        <input type="text"
                               className="form-control"
                               name="product_weight"
                               value={this.state.product_weight}
                               onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Quantity: </label>
                        <input type="text"
                               className="form-control"
                               name="product_quantity"
                               value={this.state.product_quantity}
                               onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Category: </label>
                        <input type="text"
                               className="form-control"
                               name="product_category"
                               value={this.state.product_category}
                               onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="form-group text-right">
                        <button type="button" value="SAVE & EXIT" className="btn btn-primary"
                                onClick={this.saveAndSubmit}>SAVE & EXIT
                        </button>
                        <button className="btn btn-success mx-3" onClick={this.nextStep}>Next step</button>
                        {redirectTo()}
                    </div>
                </div>
            </div>
        )
    }
}