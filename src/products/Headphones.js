import Header from '../Header';
import './Phones.css';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import Products from '../pages/Products'
import Cart from '../pages/Cart'

function Headphones() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        db.collection('headphones').onSnapshot(snapshot => {
            setProducts(snapshot.docs.map(doc => doc.data()))
        })
    }, [])
    
    return(
        <div className="App">
            <Header/>
            <div className="phone_box">
                {
                    products.map(product => (
                        <Products name={product.name} price={product.price} img={product.img} descr={product.descr}/>
                    ))
                }
            </div>
        </div>
    )
}

export default Headphones;
