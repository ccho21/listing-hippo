import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

export default class Create extends Component {
    constructor(props) {
        super(props);
        console.log('step TWO:props ', props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.saveAndSubmit = this.saveAndSubmit.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.state = {
            product_images: '',
            product_description: '',
            product_location: '',
            product_status: 'Pending List',
            product_steps_completed: 2,

            linkActive: false
        };

        // this.onChangeProductImages = this.onChangeProductImages.bind(this);
    }

    /* onChangeProductImages(e) {
         const file = e.target.files[0];
         this.setState({
             product_images: file
         });
     }*/
    saveAndSubmit(e) {
        e.preventDefault();
        const data = this.state;
        console.log('setData ', data);
        this.props.saveAndSubmit(data)
            .then((res) => {
                console.log('step two save and submit success', res);
                this.setState({
                    linkActive: true
                })
            }).catch((error) => {
            console.log('step two save and submit', error);
            this.setState({
                linkActive: false
            });
        });
    }

    nextStep(e) {
        e.preventDefault();
        const data = this.state;
        console.log('step two nextstep ', data);

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
        let linkActive = this.state.linkActive;
        const redirectTo = () => {
            return linkActive ? <Redirect to="/index"/> : false;
        };

        return (
            <div style={{marginTop: 10}}>
                <h2> STEP TWO {this.state.linkActive? 'yoyoyo true' : 'hohoho false'}</h2>
                <div className="tab">
                    <div className="form-group">
                        <input type="file" name="productImages" onChange={this.onChangeProductImages} multiple/>
                    </div>
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
                        <button className="btn btn-primary"
                                onClick={this.saveAndSubmit}>Exit & Save data
                        </button>
                        <button className="btn btn-success mx-3" onClick={this.nextStep}>Next step</button>
                        {redirectTo()}
                    </div>
                </div>
            </div>
        )
    }
}