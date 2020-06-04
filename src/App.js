import React from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/logout/Logout';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions';


function App(props) {
  console.log('[app] props', props);
  props.onAutoLogin();
  let routes =(
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );
  
  if (props.isAuth) {
    routes = (
    <Switch>
      <Route path="/checkout" component={Checkout} />
      <Route path="/orders" component={Orders} />
      <Route path="/logout" component={Logout} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
    );
  }
  return (
    <div>
      <Layout>
        {routes}
      </Layout>
    </div>
  );
}

const mapState = state => {
  return {
    isAuth: state.auth.idToken !== null
  }
}

const mapDispatch = dispatch => {
  return {
    onAutoLogin : () => dispatch(actions.authCheckState())
  }
}
export default connect(mapState, mapDispatch)(withRouter(App));