import './Home.css'
import Header from '../Header'
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import Products from './Products'

function Home() {
    const [laptopsData, setLaptopsData] = useState([])
    const [phonesData, setPhonesData] = useState([])
    const [watchesData, setWatchesData] = useState([])
    const [headphonesData, setHeadphonesData] = useState([])
    useEffect(() => {
        db.collection('phones').onSnapshot(snapshot => {
            setPhonesData(snapshot.docs.map(doc => doc.data()))
        })
    }, [])
    useEffect(() => {
        db.collection('laptops').onSnapshot(snapshot => {
            setLaptopsData(snapshot.docs.map(doc => doc.data()))
        })
    }, [])
    useEffect(() => {
        db.collection('watches').onSnapshot(snapshot => {
            setWatchesData(snapshot.docs.map(doc => doc.data()))
        })
    }, [])
    useEffect(() => {
        db.collection('headphones').onSnapshot(snapshot => {
            setHeadphonesData(snapshot.docs.map(doc => doc.data()))
        })
    }, [])
    

    const allProducts = [...laptopsData, ...phonesData, ...watchesData, ...headphonesData];
    const randomProducts = (products, count) => {
        const newArray = products.sort(() => 0.5 - Math.random())
        return newArray.slice(0, count);
    }

    const HomeProducts = randomProducts(allProducts, 16)

    return(
        <div className="App">
            <Header/>
                <h1 className='for_you'>For you</h1>
                <div className="home_boxes">
                    {HomeProducts.map(product => (
                        <Products   
                            name={product.name}
                            price={product.price}
                            img={product.img}
                            descr={product.descr}
                        />
                    ))}
                </div>
        </div>
    )
}

export default Home;