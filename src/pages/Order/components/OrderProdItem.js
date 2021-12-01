import React from "react";
import { Link } from "react-router-dom";

import Avatar from "../../../components/Avatar/Avatar";

import "./OrderProdItem.scss";

function OrderProdItem({ image, title, price, quantity, prodId }) {
  return (
    <div className="OrderProdItem">
      <div className="OrderProdItem-img">
        <Avatar size="large" src={`/${image}`} />
      </div>
      <div className="OrderProdItem-title">
        <Link to={`/products/${prodId}`}>{title}</Link>
      </div>
      <div className="OrderProdItem-price text-center">
        <div className="OrderProdItem-col-title">Price</div>
        <div>{`$${price.toFixed(2)}`}</div>
      </div>
      <div className="OrderProdItem-quantity text-center">
        <div className="OrderProdItem-col-title">Quantity</div>
        <div>{quantity}</div>
      </div>
      <div className="OrderProdItem-sum text-center">
        <div className="OrderProdItem-col-title">Sum</div>
        <div>{`$${(quantity * price).toFixed(2)}`}</div>
      </div>
    </div>
  );
}

export default OrderProdItem;
