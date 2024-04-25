import './Cart.css'
import Header from '../Header'
import { UseStateValue } from './CartState';
import CartProducts from './CartProducts';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useRef, useState } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    height: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24, 
    p: 4,
};

function Cart() {
    const numbersFormat = useRef(null);
    const dateFormat = useRef(null);
    const cvcFormat = useRef(null);
    const handleNumbers = () => {
        const input = numbersFormat.current;
        if (input) {
            const value = input.value.replace(/\s/g, '');
            const formattedValue = value
                .replace(/(\d{4})/g, '$1 ')
                .trim()
                .substr(0, 19);
            input.value = formattedValue;
        }
    };

    const handleDate = () => {
        const input = dateFormat.current;
        if (input) {
            const value = input.value.replace(/\D/g, '');
            const formattedValue = value
                .replace(/(\d{2})(\d{2})/, '$1 / $2')
                .substr(0, 7);
            input.value = formattedValue;
        }
    };

    const handleCVC = () => {
        const input = cvcFormat.current;
        if (input) {
            const value = input.value.replace(/\D/g, '');
            input.value = value.substr(0, 3);
        }
    };


    const [{ cart, totalPrice }, dispatch] = UseStateValue();
    const [open_checkout, setOpen_checkout] = useState(false)
    const close_checkout = () => {
        setShowError(false)
        setOpen_checkout(false)
    }
    const [showError, setShowError] = useState(false)
    return(
        <div className="App">
            <Header/>
            <h2 className='title_cart'>Your shopping cart</h2>
            <div className="phone_container">   
                <div className="left_box">
                    <div>
                    {cart.map(item => (
                        <CartProducts name={item.name} img={item.img} price={item.price}/>
                    ))}
                </div>
                </div>
                <div className="right_box">
                    <div className="cart_total">
                        <h1>Total: ${totalPrice}</h1>
                        <button className="checkout" onClick={() => setOpen_checkout(true)}>Proceed to Checkout</button>
                    </div>
                </div>
            </div>
            <Modal open={open_checkout} onClose={close_checkout}>
                <Box sx={style}>
                    <h1>Total: ${totalPrice}</h1>
                    <div className='checkout_box'>
                        <div className="pay_with_card"><b>Pay with card</b></div>
                        <input type="text" className="email" placeholder='Email'/>
                        <div className="card_info"><b>Card information</b></div>
                        
                        <div className="checkout_input_area">
                            <input type="text" className="checkout_input" placeholder='1234 1234 1234 1234' ref={numbersFormat} onChange={handleNumbers}/>
                            <input type="text" className="checkout_input" placeholder='MM / YY'ref={dateFormat} onChange={handleDate}/>
                            <input type="text" className="checkout_input" placeholder='CVC'ref={cvcFormat} onChange={handleCVC}/>
                            <input type="text" className="checkout_input" placeholder='Name on card'/>
                        </div>
                        <div className="error" style={{ display: showError ? 'block' : 'none' }}>
                            The card information is wrong. Try again
                        </div>
                        <button className="continue" onClick={() => setShowError(true)}>Continue</button>   
                    </div> 
                </Box>
            </Modal> 
        </div>
    )
}

export default Cart;