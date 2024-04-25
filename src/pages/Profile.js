import React, { useState, useEffect } from 'react';
import './Cart.css';
import './Profile.css';
import Header from '../Header';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';

function Profile() {
  const [users, setUsers] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  let email, uid;

  if (user !== null) {
    email = user.email;
    uid = user.uid;
  }

  useEffect(() => {
    const unsubscribe = db.collection('users').onSnapshot(snapshot => {
      setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="profile_container">
        {users
          .filter(userData => userData.key === uid)
          .map(user => (
            <div className="account_box">
              <img className="account_profile" src="account.png" />
              <h2>{user.firstName} {user.lastName}</h2>
              <h2>{user.email}</h2>
            </div>
          ))}
          
        <div className="my_orders">
          <h2>My orders</h2>
        </div>
      </div>
    </div>
  );
}

export default Profile;
