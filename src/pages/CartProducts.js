import React from 'react'
import './CartProducts.css'
import { UseStateValue } from './CartState';

function CartProducts({ name, img, price }) {
    const [{ cart }, dispatch] = UseStateValue();
    const cartItem = cart.find(item => item.name === name)


    const remove_from_cart = () => {
        dispatch({
            type: 'REMOVE_FROM_CART',
            name: name,
        });
    }

    const ClickPlus = () => {
        dispatch({
            type: 'INCREASE_COUNTER',
            name: name,
        })
    };

    const ClickMinus = () => {
        dispatch({
            type: 'DECREASE_COUNTER',
            name: name
        })
    };

    const handleInputChange = (event) => {
        const newValue = parseInt(event.target.value);
        if (!isNaN(newValue)) {
            dispatch({
                type: 'SET_COUNTER',
                name: name,
                quantity: newValue,
            })
        }
    };
    return (
        <div className='App'>
            <div className="cart_products">
                <div className='cart_name'>{name}</div>
                <img src={img} alt="" className='cart_img'/>
                <div className='cart_price'><b>${price}<b/></b></div>
                <div className="counter">
                    <button className="plus" onClick={ClickPlus}>+</button>
                    <input className='counter_input' type="number" value={cartItem.quantity} onChange={handleInputChange}/>
                    <button className="minus" onClick={ClickMinus}>-</button>
                </div>
                <button className="remover" onClick={remove_from_cart}><img src="/x.png" alt="" className='img_remover'/></button>
            </div>
        </div>
  )
}

export default CartProducts