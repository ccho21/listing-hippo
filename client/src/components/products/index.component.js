// index.component.js

import React, {Component} from 'react';
import axios from 'axios';
import TableRow from './TableRow';

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            filterProducts: [],
            orderBy: 'product_listed_price',
            order: 'false',
            searchBy: '',
        };
        this.orderBy = this.orderBy.bind(this);
        this.filterData = this.filterData.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:3000/product')
            .then(response => {
                this.setState({products: response.data, filterProducts: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    orderBy(e) {
        // Get data, keyword, field to filter
        let filterProducts = this.state.filterProducts;
        console.log('filtered', filterProducts);
        let order = this.state.order;
        let orderBy = e.target.closest('.btn').dataset.value;

        console.log('order', order);
        console.log('orderBy', orderBy);

        // Sort data based on Field
        if (order) {
            filterProducts = filterProducts.sort((a, b) => parseFloat(a[orderBy]) - parseFloat(b[orderBy]));
        } else {
            filterProducts = filterProducts.sort((a, b) => parseFloat(b[orderBy]) - parseFloat(a[orderBy]));
        }

        // Store filtered data, order, keyword to State.
        this.setState({products: filterProducts, order: !order, orderBy: orderBy});
    }

    filterData(e) {
        e.preventDefault();
        // Get search key words and search field
        const target = event.target;
        const searchBy = target.value;
        const search = target.name;

        console.log('target ', target);
        console.log('search, ', search);
        console.log('searchBy', searchBy);

        // Filter selected field by the keyword
        let filteredProducts = this.state.searchBy ? this.state.filterProducts : this.state.products;
        console.log('THIS IS SEARCHBY STATE BEFORE STORING', this.state.searchBy);
        console.log('Original before filtering', filteredProducts);

        filteredProducts = filteredProducts.filter((cur) => cur[search].includes(searchBy));
        console.log('outcome ', filteredProducts);

        // Store outcome in state.
        this.setState({filterProducts: filteredProducts, searchBy: searchBy});
    }

    // tabRow() {
    //     return this.state.filterProducts.map((item, i) => <TableRow item={item} key={i}/>);
    // }

    render() {
        const filterProducts = this.state.products;
        const tabRow = (filterProducts) => {
            return filterProducts.map((item, i) => <TableRow item={item} key={i}/>);
        };
        return (
            <div>
                <table className="table table-striped" style={{marginTop: 20}}>
                    <thead>
                    <tr>
                        <th>Status
                            <button className="btn btn-sm" onClick={this.orderBy} data-value="product_status">
                                <span>sort</span>
                            </button></th>
                        <th>Title
                            <div className="input-group input-group-sm mb-3">
                                <input className="form-control mr-sm-2"
                                       name="product_title"
                                       type="search"
                                       placeholder="Search"
                                       onChange={this.filterData}
                                       aria-label="Search"/>
                            </div>
                        </th>
                        <th>Price <button className="btn btn-sm" onClick={this.orderBy}
                                          data-value="product_listed_price"><span>sort</span></button></th>
                        <th>Category
                            <input className="form-control mr-sm-2"
                                   name="product_category"
                                   type="search"
                                   placeholder="Search"
                                   onChange={this.filterData}
                                   aria-label="Search"/>

                        </th>
                        <th colSpan="2">SKU
                            <input className="form-control mr-sm-2"
                                   name="product_SKU"
                                   type="search"
                                   placeholder="Search"
                                   onChange={this.filterData}
                                   aria-label="Search"/>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {tabRow(filterProducts)}
                    </tbody>
                </table>
            </div>
        );
    }
}