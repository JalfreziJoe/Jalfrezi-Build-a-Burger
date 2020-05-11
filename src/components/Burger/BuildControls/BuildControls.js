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
        {controls.map( control =>(
            <BuildControl 
                key={control.type} 
                label={control.label} 
                add={() => props.addIngredient(control.type) }
                remove={() => props.removeIngredient(control.type)} 
                disable={props.disabledInfo[control.type]}/>
        ))}
    </div>
);

export default buildControls;