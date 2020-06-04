import React, { Component } from 'react';
import Aux from '../Auxillery/Auxillery';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import { connect } from 'react-redux';

class Layout extends Component {
    state = {
        showSideDrawer : false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer:false});
    }
     
    sideDrawerOpenHandler = () => {
        this.setState({showSideDrawer:true});
    }

    render () {
        console.log('[layout] isAuth', this.props.isAuthenticated)
        return (
        <Aux>
            <Toolbar
                menuClick={this.sideDrawerOpenHandler}
                isAuth={this.props.isAuthenticated} />
            <SideDrawer
                closed={this.sideDrawerClosedHandler}
                open={this.state.showSideDrawer}
                isAuth={this.props.isAuthenticated} />
            <main className={classes.content}>
                {this.props.children}
            </main>
        </Aux>
        );
    }
}

const mapState = state => {
    return {
        isAuthenticated: state.auth.idToken !== null
    };
}

export default connect(mapState)(Layout);