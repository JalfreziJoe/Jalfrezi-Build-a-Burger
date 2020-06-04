import React, { Component } from "react";
import {connect} from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';
import Spinner from '../../components/ui/Spinner/Spinner';


class Orders extends Component {
    

    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render() {
        let fetchingOrders = <Spinner />;
        if (!this.props.loading)
            fetchingOrders = (
                this.props.orders.map((order)=> (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={+order.price.toFixed(2)}
                    />
                ))
            );
        return  (
            <div>
                {fetchingOrders}
            </div>
        );
    }

}

const mapState = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.idToken,
        userId: state.auth.userId
    }
}

const mapDispatch = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    };
};

export default connect(mapState, mapDispatch)(withErrorHandler(Orders, axios));