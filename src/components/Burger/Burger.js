import React from 'react';
import classes from './Burger.module.css';
import Ingredient from './Ingredient/Ingredient';

const burger = (props) => {
    let ingredientsArr = Object.keys(props.ingredients).map(indKey => {
        return [...Array(props.ingredients[indKey])].map( (_, amount) => {
            //console.log('Ingredient: '+indKey+' amount: '+amount);
            return <Ingredient key={indKey+amount} type={indKey} />
        });
    }).reduce((arr, el) => {
        return arr.concat(el);
    }, []);
    if (ingredientsArr.length === 0) {
        ingredientsArr = <p>Please add some ingredients</p>;
    }
    //console.log(ingredientsArr);
    return(
        <div className={classes.Burger}>
            <Ingredient type="top" />
            {ingredientsArr}
            <Ingredient type="base" />
        </div>
    );
}

export default burger;