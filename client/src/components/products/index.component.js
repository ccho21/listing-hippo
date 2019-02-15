// index.component.js

import React, {Component} from 'react';
import axios from 'axios';
import Products from './Products';

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            filterProducts: [],
            orderBy: 'product_listed_price',
            order: false,
            searchBy: '',
        };
        this.orderByNumber = this.orderByNumber.bind(this);
        this.orderByString = this.orderByString.bind(this);
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

    orderByNumber(e) {
        e.preventDefault();
        // Get data, keyword, field to filter
        let filterProducts = this.state.filterProducts;
        console.log('filtered', filterProducts);
        let order = this.state.order;
        let orderBy = e.target.closest('.btn').dataset.value;

        console.log('order', order);
        console.log('orderBy', orderBy);

        // Sort data based on Field
        if (order) {
            filterProducts = filterProducts.sort((cur, next) =>
                parseFloat(cur[orderBy]) - parseFloat(next[orderBy])
            );
        } else {
            filterProducts = filterProducts.sort((a, b) => parseFloat(b[orderBy]) - parseFloat(a[orderBy]));
        }
        // Store filtered data, order, keyword to State.
        this.setState({products: filterProducts, order: !order, orderBy: orderBy});
    }

    orderByString(e) {
        e.preventDefault();
        // Get data, keyword, field to filter
        let filterProducts = this.state.filterProducts;
        let order = this.state.order;
        let orderBy = e.target.closest('.btn').dataset.value;

        console.log('order', order);
        console.log('orderBy', orderBy);

        // Sort data based on Field
        if (order) {
            filterProducts = filterProducts.sort((a, b) => b[orderBy].toLowerCase().localeCompare(a[orderBy].toLowerCase()));
        } else {
            filterProducts = filterProducts.sort((a, b) => a[orderBy].toLowerCase().localeCompare(b[orderBy].toLowerCase()));
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

        // Filter selected field by the keyword
        let filteredProducts = this.state.products;
        filteredProducts = filteredProducts.filter((cur) => cur[search].includes(searchBy));

        // Store filtered data in state object.
        this.setState({filterProducts: filteredProducts, searchBy: searchBy});
    }

    // tabRow() {
    //     return this.state.filterProducts.map((item, i) => <Products item={item} key={i}/>);
    // }

    render() {
        const filterProducts = this.state.filterProducts;
        const tabRow = (filterProducts) => {
            return filterProducts.map((item, i) => <Products item={item} key={i}/>);
        };
        return (
            <div>
                <table className="table table-striped" style={{marginTop: 20}}>
                    <thead>
                    <tr>
                        <th>Status
                            <button className="btn btn-sm btn-info" onClick={this.orderByString} data-value="product_status">
                                <span>sort</span>
                            </button></th>
                        <th>Title
                            <button className="btn btn-sm btn-info" onClick={this.orderByString}
                                    data-value="product_title"><span>sort</span></button>
                            <div className="input-group input-group-sm mb-3">
                                <input className="form-control mr-sm-2"
                                       name="product_title"
                                       type="search"
                                       placeholder="Search"
                                       onChange={this.filterData}
                                       aria-label="Search"/>
                            </div>
                        </th>
                        <th>Price <button className="btn btn-sm btn-info" onClick={this.orderByNumber}
                                          data-value="product_listed_price"><span>sort</span></button></th>
                        <th>Category
                            <button className="btn btn-sm btn-info" onClick={this.orderByString}
                                    data-value="product_category"><span>sort</span></button>
                            <input className="form-control mr-sm-2"
                                   name="product_category"
                                   type="search"
                                   placeholder="Search"
                                   onChange={this.filterData}
                                   aria-label="Search"/>

                        </th>
                        <th colSpan="2">SKU
                            <button className="btn btn-sm btn-info" onClick={this.orderByNumber}
                                    data-value="product_SKU"><span>sort</span></button>
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