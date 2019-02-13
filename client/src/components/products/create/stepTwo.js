import axios from "axios";

export default class Create extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
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
                            <input type="submit" onClick={nextStep} value="Save & Next step"
                                   className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
                {/*STEP TWO ENDS*/}
            </div>
        )
    }
}