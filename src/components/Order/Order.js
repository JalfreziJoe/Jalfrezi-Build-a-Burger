import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
    const ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        )
    }
    const output = ingredients.map((ig) => {
       return <li
                style={{
                    textTransform:'capitalize'
                }}
                key={ig.name}>{ig.name}: {ig.amount}</li>;
    });

    return(
    <div className={classes.Order}>
        <p>Ingredients:</p>
        <ul>
            {output}
        </ul>
        <p>Price: £{props.price}</p>
    </div>
    );
};

export default order;