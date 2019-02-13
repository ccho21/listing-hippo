// create.component.js

import React, {Component} from 'react';
import axios from 'axios';

export default class Create extends Component {
    constructor(props) {
        super(props);
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
            product_SKU: '',
            product_images: '',
            product_description: '',
            product_location: '',
            product_reserve: '',
            product_selling_price: '',
            product_listed_price: '',

            currentTab: 0,
            getAllFormElements : [],

        };
        this.onChangeProductImages = this.onChangeProductImages.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        const getAllFormElements = document.querySelectorAll('.tab');
        this.showTab(0);
        this.setState({ getAllFormElements });


    }
    handleInputChange() {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    onChangeProductImages(e) {
        const file = e.target.files[0];
        this.setState({
            product_images: file
        });
    }
    stepOne(e) {
        e.preventDefault();
        const data = {
            product_client_code: this.state.product_client_code,
            product_title: this.state.product_title,
            product_brand: this.state.product_brand,
            product_model_number: this.state.product_model_number,
            product_dimensions: this.state.product_dimensions,
            product_weight: this.state.product_weight,
            product_quantity: this.state.product_quantity,
            product_category: this.state.product_category,
            product_condition: this.state.product_condition,
            product_status : 'Pending List'
        }
        this.postData(data);
    }
    stepTwo(e) {
        e.preventDefault();
        const data = {
            product_images: this.state.product_images,
            product_description: this.state.product_description,
            product_location: this.state.product_location,
            product_status : 'Pending List',
        }
        this.postData(data)
    }
    onSubmit(e) {
        e.preventDefault();
        const data = {
            product_reserve: this.state.product_reserve,
            product_selling_price: this.state.product_selling_price,
            product_listed_price: this.state.product_listed_price,
            product_status : 'Item Available'
        };
        this.postData(data);
    }
    postData(data) {
        return new Promise((resolve, reject) => {
            axios.post('http://localhost:3000/product/create', data)
                .then(res => {
                    console.log('Uploading success!!', res);
                    resolve(res);
                })
                .catch((error) => {
                    console.log('ERROR!!!', error.response);
                    reject(error);
                });
        });
    }
    // MULTI FORMS
    showTab(n) {
        let currentTab = n;
        console.log('INDEX NUMBER ??',currentTab);

        // This function will display the specified tab of the form...
        let tabElements = this.state.getAllFormElements;
        let lastIndex = tabElements.length;

        // Validate data-index
        if(currentTab > lastIndex) {
            currentTab = lastIndex
        }
        if(currentTab < 0) {
            currentTab = 0;
        }
        // Display current tab and hidden the other tabs.
       tabElements.forEach((cur, i)=> {
            if(currentTab === i) {
                console.log('node list obejct',typeof(cur))
                cur.style.display = 'block';
            }
            else {
                cur.style.display = 'none';
            }
        });
        this.setState({currentTab: currentTab});
    }


    // MULTI FORMS ENDS

    render() {
        // let currentTab = this.state.currentTab;
        // this.showTab(currentTab);
        //APP PROCESS FOR MULTI FORMS
        const nextStep = (e) => {
            e.preventDefault();
            let currentTab = this.state.currentTab + 1;
            this.showTab(currentTab);
        };
        //ENDS
        return (
            <div style={{marginTop: 10}}>
                <h3>Add New Product</h3>
                <div className="tab">
                    <form onSubmit={this.stepOne} encType="multipart/form-data">
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
                        <div className="form-group">
                            <input type="submit" onClick={nextStep} value="Save & Next step" className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
                {/*STEP ONE ENDS*/}

                {/*STEP TWO*/}
                <div className="tab">
                    <form onSubmit={this.stepTwo} encType="multipart/form-data">
                        {/*<div className="form-group">
                        <input type="file" name="productImages" onChange={this.onChangeProductImages} multiple/>
                    </div>*/}
                        {/*DESCRIPTION*/}
                        <div className="form-group">
                            <label>Description: </label>
                            <input type="text"
                                   className="form-control"
                                   name="product_description"
                                   value={this.state.product_description}
                                   onChange={this.handleInputChange}
                            />
                        </div>

                        {/*LOCATION*/}
                        <div className="form-group">
                            <label>Location: </label>
                            <input type="text"
                                   className="form-control"
                                   name="product_location"
                                   value={this.state.product_location}
                                   onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input type="submit" onClick={nextStep} value="Save & Next step" className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
                {/*STEP TWO ENDS*/}

                <div className="tab">
                    {/*Listed Price, Selling Price, and Reserve*/}
                    <form onSubmit={this.onSubmit} encType="multipart/form-data">
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
                        {/*SUBMIT*/}
                        <div className="form-group">
                            <input type="submit" value="Register Product" className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
                {/*STEP THREE ENDS*/}
            </div>
        )
    }
}