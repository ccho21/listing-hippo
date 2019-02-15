// Products.js

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Products extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.delete = this.delete.bind(this);
        this.show = this.show.bind(this);
    }

    delete() {
        //console.log(this.props.item._id);
        axios.get('http://localhost:3000/product/delete/' + this.props.item._id)
            .then((res) => {
                console.log('Deleted', res);
            })
            .catch(err => console.log(err))
    }
    show(e) {
        e.preventDefault();
        console.log(this.props.item._id);
        console.log('show should be working');
        console.log('show mounted??');
        axios.get('http://localhost:3000/product/show/' + this.props.item._id)
            .then(response => {
                console.log(response.data);
                this.setState(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    linkPage() {
        const status = this.props.item.product_status;
        let link = status === 'Item Available' ? 'show' : 'edit';
        return <Link to={`/${link}/` + this.props.item._id} item={this.props.item} className="nav-link">{this.props.item.product_status}</Link>;
    }


    render() {
        return (
            <tr>
                <td>
                    {/*<Link to={'/show/' + this.props.item._id} item={this.props.item} className="nav-link">{this.props.item.product_status}</Link>*/}
                    {this.linkPage()}
                </td>
                <td>
                    <Link to={'/show/' + this.props.item._id} className="nav-link">{this.props.item.product_title}</Link>
                </td>
                <td>
                    {this.props.item.product_listed_price}
                </td>
                <td>
                    {this.props.item.product_category}
                </td>
                <td>
                    {this.props.item.product_SKU}
                </td>
             {/*   <td>
                    <Link to={"/edit/" + this.props.item._id} className="btn btn-primary">Edit</Link>
                </td>*/}
                <td>
                    <button onClick={this.delete} className="btn btn-danger">Delete</button>
                </td>
            </tr>
        );
    }
}

export default Products;