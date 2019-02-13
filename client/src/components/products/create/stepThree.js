import axios from "axios";

export default class Create extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div style={{marginTop: 10}}>
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