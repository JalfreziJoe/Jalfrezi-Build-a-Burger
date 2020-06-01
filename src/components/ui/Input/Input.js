import React from 'react';
import classes from './Input.module.css';

const input =(props) => {
    let inputElement = null;
    const cssClasses = [classes.Input];
    if (props.inValid && props.shouldValidate && props.touched) {
        cssClasses.push(classes.InValid);
    }

    const stringClasses = cssClasses.join(' ');
    switch(props.elementType) {
        case 'input':
            inputElement = <input onChange={props.changed} className={stringClasses} {...props.elementConfig} value={props.value} />
            break;
        case 'select':
            inputElement = (<select onChange={props.changed} className={stringClasses} value={props.value} >
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>);
            break;
        case 'textarea':
            inputElement = <textarea onChange={props.changed} className={stringClasses} {...props.elementConfig} value={props.value} />
            break;
        default:
            inputElement = <input onChange={props.changed} className={stringClasses} {...props.elementConfig} value={props.value} />
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