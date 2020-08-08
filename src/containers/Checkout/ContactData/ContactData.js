import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button'

import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        addres: {
            street: '',
            zipcode: '',
            country: '' 
        }
    }
    
    render(){
        return (
            <div className={ classes.ContactData } >
                <h4>Enter your Contact Data</h4>
                <form>
                    <input type="text" name="name"   id="name" placeholder="Your name" />
                    <input type="email" name="email"  id="email" placeholder="Your e-mail" />
                    <input type="text" name="street" id="street" placeholder="street" />
                    <input type="text" name="postal" id="postal" placeholder="Postal Code" />
                    <Button btnType="Success" >Order</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;