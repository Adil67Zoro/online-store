import './Products.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { UseStateValue } from './CartState';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24, 
    p: 4,
};

function Products({ name, img, price, descr }) {
    const [open_product, setOpen_product] = useState(false);
    const close_product = () => setOpen_product(false)
    const [{ cart }, dispatch] = UseStateValue();
    const add_to_cart = (event) => {
        event.stopPropagation();
        dispatch({
            type: 'ADD_TO_CART',
            item: {
                name: name,
                img: img, 
                price: price,
            }
        });
    }
    return(
        <div className="App">
            <button onClick={() => setOpen_product(true)} className="product" >
                <img src={img} alt="" className="image" />
                <div className="name">{name}</div>
                <div className="price"><b>${price}</b></div>
                <button className="purchase" onClick={(event) => add_to_cart(event)}>Add to the cart</button>
            </button>
            <Modal open={open_product} onClose={close_product}>
                <Box sx={style}> 
                    <img src={img} alt="" className='img_modal'/>
                    <h2 className='descr'>{descr}</h2>
                    <div className='name_modal'>{name}</div>
                    <div className='price_modal'><b>{price} $</b></div>
                </Box>
            </Modal>
        </div>
    )
}

export default Products;