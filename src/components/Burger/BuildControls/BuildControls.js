import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label:'Patty', type:'patty'},
    {label:'Cheese', type:'cheese'},
    {label:'Bacon', type:'bacon'},
    {label:'Salad', type:'salad'}
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: £<strong>{props.price.toFixed(2)}</strong></p>
        {controls.map( control =>(
            <BuildControl 
                key={control.type} 
                label={control.label} 
                add={() => props.addIngredient(control.type) }
                remove={() => props.removeIngredient(control.type)} 
                disable={props.disabledInfo[control.type]}
             />
        ))}
        <button className={classes.OrderButton} onClick={props.onOrder} disabled={props.readyToOrder}>{props.isAuth? 'BUY NOW':'Sign up to order'}</button>
    </div>
);

export default buildControls;