import React, { Component } from "react";
import classes from './ContactData.module.css';
import Button from '../../../components/ui/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/ui/Spinner/Spinner';
import Input from '../../../components/ui/Input/Input';

class ContactData extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }
    
    state = {
        orderForm:{
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Full name'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Email'
                },
                value: ''
            },
            line1:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Address 1'
                },
                value: ''
            },
            line2:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Address 2'
                },
                value: ''
            },
            town:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Full name'
                },
                value: ''
            },
            postcode:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Postcode'
                },
                value: ''
            },
            delivery: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'ASAP', displayValue:'As soon as possible'},
                        {value: '1Hour', displayValue:'In 1 hour'}
                    ]
                },
                value: ''
            }            
        },
        updatingDb: false
    }

    orderHandler = (event) =>{
        event.preventDefault();
        this.setState({updatingDb:true});
        //console.log('purchase continue');
        const thisOrder = {
            ingredients: this.props.ingredients,
            price: this.props.price, // not a setup on a production app. Price should be totalled on the backend
            customer: {
                name: 'Mr Hot Spicy',
                address: {
                    address1:'20 Test Street',
                    address2:'Test Village',
                    town: 'Testy Test',
                    county: 'Sussex',
                    postcode: 'TE1 2ST'
                },
                    email: 'test@test.com'
                },
                delivery: 'asap'

            }
        
        axios.post('/orders.json', thisOrder) // the .json is just for firebase DB only
            .then(response =>  {
                //this.setState({loading:false, moveToOrder:false})
                this.props.history.replace('/');
            })
            .catch(error => {
                this.setState({updatingDb:false})
            });

    }

    render() {
        let form = (<Spinner />);
        const formElementsArray = [];
        for (let ele in this.state.orderForm) {
            formElementsArray.push({
                id:ele,
                config: this.state.orderForm[ele]
            });
        }
        if (!this.state.updatingDb) {
            form = (
                <form>
                    {formElementsArray.map(formEle => (
                        <Input key={formEle.id}
                            elementType={formEle.config.elementType}
                            elementConfig={formEle.config.elementConfig}
                            value={formEle.config.value} />
                    ))}
                    <Button btnType="Success" clicked={this.orderHandler}>Continue</Button>
                </form>
            );
        }
        return(
            <div className={classes.ContactData}>
                <h4>Please enter your details</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;