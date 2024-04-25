import React from 'react'
import './Phones.css'
import Header from '../Header'
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import Products from '../pages/Products'

function Laptops() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        db.collection('laptops').onSnapshot(snapshot => {
            setProducts(snapshot.docs.map(doc => doc.data()))
        })
    }, [])

    return (
    <div className='App'>
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

export default Laptops