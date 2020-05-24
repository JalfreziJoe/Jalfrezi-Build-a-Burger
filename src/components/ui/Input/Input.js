import React from 'react';
import classes from './Input.module.css';

const input =(props) => {
    let inputElement = null;

    switch(props.elementType) {
        case 'input':
            inputElement = <input className={classes.Input} {...props.elementConfig} value={props.value} />
            break;
        case 'select':
            inputElement = (<select className={classes.Input} value={props.value} >
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>);
            break;
        case 'textarea':
            inputElement = <textarea className={classes.Input} {...props.elementConfig} value={props.value} />
            break;
        default:
            inputElement = <input className={classes.Input} {...props.elementConfig} value={props.value} />
            break;
    }
    
    return(
        <div>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;