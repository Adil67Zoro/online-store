import React, { useState, useEffect } from 'react';
import { UseStateValue } from './pages/CartState';
import { auth, db } from './firebase';
import './Header.css'
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 240,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '16px',
    boxShadow: 24, 
    p: 4,
};


function Header() {
    const [user, setUser] = useState(null)
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [openLogIn, setOpenLogIn] = useState(false);
    const [openRegister, setOpenRegister] = useState(false)
    const [loginError, setLoginError] = useState(false);
    const [registerError, setRegisterError] = useState(false)
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    const closeLogIn = () => setOpenLogIn(false)
    const closeRegister = () => setOpenRegister(false)
    const [openCatalog, setOpenCatalog] = useState(false);
    const closeCatalog = () => setOpenCatalog(false);

    const goto_phones = () => navigate('/phones')
    const goto_laptops = () => navigate('/laptops')
    const goto_watches = () => navigate('/watches')
    const goto_headphones = () => navigate('/headphones')

    const [{ cart }] = UseStateValue();
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(authUser => {
          if (authUser) {
            console.log(authUser);
            setUser(authUser);
          } else {
            setUser(null)
          }
        }) 
    
        return () => {
          unsubscribe();
        }
    }, [user]);


    const navigate = useNavigate();
    const goto_home = () => {
        navigate('/')
    }
    const goto_profile = () => {
        navigate('/profile');
    }
    
    const goto_settings = () => {
        navigate('/settings')
    }

    const goto_cart = () => {
        navigate('/cart')
    }
    const register = (event) => {
        event.preventDefault();
        auth
          .createUserWithEmailAndPassword(email, password)
          .then((authUser) => {
            const uid = authUser.user.uid;
            authUser.user.updateProfile({
                displayFirstName: firstName,
                displayLastName: lastName,
                displayEmail: email,
            })
            db.collection("users").doc(`${firstName}${lastName}`).set({
                key: uid,
                firstName: firstName, 
                lastName: lastName,
                email: email,
                password: password
            })
          })
          .catch(() => {
            setOpenRegister(true)
            setRegisterError(true)
            });
        setOpenRegister(false)
    };
    
    const logIn = (event) => {
        event.preventDefault();

        auth
          .signInWithEmailAndPassword(email, password)
          .catch(() => {
            setOpenLogIn(true);
            setLoginError(true);
          })
        setOpenLogIn(false)
    }
    return (
        <div className="App">
            <div className="header"> 
                <button className="sipnav" onClick={goto_home}>
                    <img src="logo.jpg" className='logo'/>
                </button>

                <button className='cart' onClick={goto_cart}> 
                    <img src="/cart.png" alt="" className="icon__cart" /> 
                    <div className='product_count'><b>{cart.length}</b></div>
                </button>

                {user ? (
                    <button className='account'> 
                        <img src="/account.png" alt="" className="icon__account" onClick={goto_profile}/> 
                        <div className="dropdown_menu">
                            <div className="options" onClick={() => auth.signOut()}>Log out</div>
                        </div>
                    </button>
                    ): (
                        <button className='login' onClick={() => setOpenLogIn(true)}>Log in</button>
                )}
                
                <div className='left'>
                    <button className='button_heading' onClick={goto_home}>
                        Home</button>
                    <button className="button_heading" onClick={() => setOpenCatalog(true)}>
                        Catalog
                    </button>
                    <button className='button_heading'>
                        Contacts
                    </button>
                </div>
                
                <Modal open={openLogIn} onClose={closeLogIn}>
                    <Box sx={style}>
                        <form className='box_login'>
                            <input className='input_form' placeholder="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <input className='input_form' placeholder="Password" type={showPassword ? 'text' : 'password'} value={password}
                                onChange={(e) => setPassword(e.target.value)}/>
                            <button className='show' onClick={handleShowPassword}>
                                <b>{showPassword ? 'Hide' : 'Show'}</b>
                            </button>
                            <div className="login_error" style={{ display: loginError ? 'block' : 'none' }}>Incorred email or password. Try again</div>
                            <button className='login_modal' type="submit" onClick={logIn}>Log In</button>
                            <div style={{ fontSize: '18px' }}><b>Don't have an account?</b></div>
                            <button className='registerhere_modal' onClick={() => {
                                setOpenLogIn(false)
                                setOpenRegister(true)}}>Register
                            </button>
                        </form>
                    </Box>
                </Modal>

                <Modal open={openRegister} onClose={closeRegister}>
                    <Box sx={style}>
                    <form className='box_register'>
                        <input className='input_form' placeholder="First Name" type="text" value={firstName} 
                            onChange={(e) => setFirstName(e.target.value)}/>
                        <input className='input_form' placeholder="Last Name" type="text" value={lastName} 
                            onChange={(e) => setLastName(e.target.value)}/>
                        <input className='input_form' placeholder="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <input className='input_form' placeholder="Password" type={showPassword ? 'text' : 'password'} value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                        <button className='show' onClick={handleShowPassword}>
                            <b>{showPassword ? 'Hide' : 'Show'}</b>
                        </button>
                        <div className="register_error" style={{ display: registerError ? 'block' : 'none' }}>This email is already registered.</div>
                        <button className='registerhere_modal' type='submit' onClick={register}>Register</button>
                    </form>
                    </Box>
                </Modal>
            </div>

                
            <Modal open={openCatalog} onClose={closeCatalog}>
                <Box sx={style}>
                    <div className="catalog_products">
                        <button className="products" onClick={goto_phones}>Phones</button>
                        <button className="products" onClick={goto_laptops}>Laptops</button>
                        <button className="products" onClick={goto_watches}>Watches</button>
                        <button className="products" onClick={goto_headphones}>Headphones</button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default Header;