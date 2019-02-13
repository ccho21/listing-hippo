import axios from "axios";

export default class Create extends Component {
    constructor(props) {
        super(props);
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
    // MULTI FORMS ENDS

    render() {

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
            </div>
        )
    }
}