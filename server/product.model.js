const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
const alphaNumeric = (v) => {
    const alphaNum = /^[0-9a-zA-Z]+$/;
    return v.value.match(alphaNum) ? true : false;
};
*/

// Define collection and schema for product
let Product = new Schema({

    product_steps_completed : {
      type: Number,
      enum: [0, 1, 2]
    },
    product_status: {
        type: String,
        enum: ['Pending List', 'Item Available', 'Item Sold', 'Pending Payment', 'Seller Payout Completed'],
        default: 'Pending List'
    },
    product_condition: {
        type: String,
        enum: ['New', 'Used'],
    },
    // AUTO GENERATED
    // TODO: SKU needs to be updated
    product_SKU: {
        type: Number,
    },

   product_client_code: {
       type: String,
       validate: {
           validator: (v) => {
               return /^[0-9a-zA-Z]+$/.test(v);
           },
           message: props => `${props.value} should consist of numbers and letters!`
       },
   },
   product_brand: {
       type: String,
       validate: {
           validator: (v) => {
               return /^[0-9a-zA-Z]+$/.test(v);
           },
           message: props => `${props.value} should consist of numbers and letters!`
       },
   },
  product_model_number: {
      type: String,
      validate: {
          validator: (v) => {
              return /^[0-9a-zA-Z]+$/.test(v);
          },
          message: props => `${props.value} should consist of numbers and letters!`
      },
  },
  product_dimensions: {
      type: String,
      validate: {
          validator: (v) => {
              return /^[0-9a-zA-Z]+$/.test(v);
          },
          message: props => `${props.value} should consist of numbers and letters!`
      },
  },
  product_weight: {
      type: Number,
      min: [0, 'Weight should not be negative']
  },
  product_quantity: {
      type: Number,
      min: [0, 'Quantity should not be negative']
  },
  product_title: {
      type: String,
      maxlength: [64, 'title should not go ver 64 characters'],
      minlength: [10, 'title should be over 10 characters'],
  },
  product_category: {
      type: String,
      validate: {
          validator: (v) => {
              return /^[0-9a-zA-Z]+$/.test(v);
          },
          message: props => `${props.value} should consist of numbers and letters!`
      },

  },
  product_description: {
      type: String,
      validate: {
          validator: (v) => {
              return /^[0-9a-zA-Z]+$/.test(v);
          },
          message: props => `${props.value} should consist of numbers and letters!`
      },
      minlength: [10, 'description should be over 10 characters'],
  },
  product_images: {
      data: Buffer,
      contentType: String
  },
  product_listed_price: {
      type: Number,
      min: [0, 'Listed price should not be negative']
  },
  product_selling_price: {
      type: Number,
      min: [0, 'Selling price should not be negative']
  },
  product_reserve: {
      type: Number,
      min: [0, 'Reserve should not be negative']
  },
  product_location: {
      type: String,
      validate: {
          validator: (v) => {
              return /^[0-9a-zA-Z]+$/.test(v);
          },
          message: props => `${props.value} should consist of numbers and letters!`
      },
  },
  product_payment_method: {
      type: String,
      enum: ['Wire transfer', 'Cash', 'Paypal', 'Cheque', 'Credit Card'],
  },
  product_transaction_details: {
      type: String,
      validate: {
          validator: (v) => {
              return /^[0-9a-zA-Z]+$/.test(v);
          },
          message: props => `${props.value} should consist of numbers and letters!`
      },
  },
  product_amount_received: {
      type: String,
      validate: {
          validator: (v) => {
              return /^[0-9a-zA-Z]+$/.test(v);
          },
          message: props => `${props.value} should consist of numbers and letters!`
      },
  }
},{
    collection: 'product'
});

module.exports = mongoose.model('Product', Product);