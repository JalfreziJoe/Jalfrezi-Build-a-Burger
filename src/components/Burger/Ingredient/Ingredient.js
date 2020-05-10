import React, { Component } from 'react';
import classes from './Ingredient.module.css';

import PropTypes from 'prop-types';

class Ingredient extends Component {
    render() {

        let item = null;
        switch(this.props.type) {
            case ('base'):
                item = (
                    <div className={classes.BreadBottom}></div>
                );
                break;
            case ('top'):
                item = (
                    <div className={classes.BreadTop}>
                        <div className={classes.Seeds1}></div>
                        <div className={classes.Seeds2}></div>
                    </div>
                );
                break;
            case ('patty'):
                item =(
                    <div className={classes.Meat}></div>
                );
                break;
            case ('cheese'):
                item = (
                    <div className={classes.Cheese}></div>
                )
            break;
            case ('salad'):
                item = (
                    <div className={classes.Salad}></div>
                );
                break;
            case ('bacon'):
                item = (
                    <div className={classes.Bacon}></div>
                );
                break;
            default:
                item = null;
        }

        return item;
    }
}

Ingredient.propTypes = {
    type: PropTypes.string.isRequired
}

export default Ingredient;