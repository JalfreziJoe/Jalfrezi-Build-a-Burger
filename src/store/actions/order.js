import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth='+token, orderData) // the .json is just for firebase DB only
            .then(response =>  {
                console.log( response.data );
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
                //this.setState({loading:false, moveToOrder:false})
                //this.props.history.replace('/');
            })
            .catch(error => {
                //this.setState({updatingDb:false})
                dispatch(purchaseBurgerFail(error) );
            });
    }
}

export const purchaseOrderInit = () => {
    console.log('[order action] purchaseOrderInit');
    return {
        type: actionTypes.PUSCHASE_INIT
    };
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};

export const fetchOrders = (token,userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = '?auth='+token + '&orderBy="userId"&equalTo="'+userId+'"';
        axios.get('orders.json'+queryParams)
            .then(response => {
                console.log(response.data);
                const orders = [];
                for(let order in response.data) {
                    orders.push({
                        ...response.data[order],
                        id: order
                    });
                }
                dispatch(fetchOrdersSuccess(orders))
                
            })
            .catch(error => {
                dispatch(fetchOrdersFailed(error));
            });
    }
}