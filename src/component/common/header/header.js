import '../../../assets/scss/stylesClub.scss'

import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { LogOut, Menu } from 'react-feather'
import React, { useEffect, useState } from 'react';

import { DELETE_USER } from "../../../redux/actionType";
import {Link} from 'react-router-dom'
import ModalLoginHead from '../../componentProducts/ModalLoginHead';
import ModalRegistroHead from '../../componentProducts/ModalRegistroHead';
import { auth } from "../../../data/firebase/firebase";
import { signup } from "../../../redux/actions/login.actions";
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';

const Header = (props) => {
    const { evento } = useParams();
    const dispatch = useDispatch();
    const [navmenu,setNavmenu] = useState(false)
    const [modal, setModal] = useState(false);
    const [modalIn, setModalIn] = useState(false);
    const [user, setUser] = useState(null);
    
    useEffect(()=>{
        
      const checkFirebaseAuth = () => {
          const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
              setUser(user)
            }
          });
        
          return () => unsubscribe();
        };
        
        checkFirebaseAuth();
  },[auth])

    const toggle = () => setModal(!modal);
    const toggleIn = () => setModalIn(!modalIn);
    
    function handleSignIn() {
      const provider = new GoogleAuthProvider();
  
      signInWithPopup(auth, provider)
        .then((result) => {
          setUser(result.user);
  
          dispatch(signup(result.user.displayName, result.user.phoneNumber, result.user.email))
        })
        .catch((error) => {
          console.error(error);
        });
    }
    function handleSignOut() {
      signOut(auth)
        .then(() => {
          setUser(null);
          dispatch({type: DELETE_USER})
        })
        .catch((error) => {
          console.error(error);
        });
    }
      onAuthStateChanged(auth, (user) => {
        setUser(user);
      });

    const Navmenuhideandshow = () => {
      if(navmenu){
        setNavmenu(!navmenu)
        document.querySelector('.nav-menus').classList.add('open')
      }
      else{
        setNavmenu(!navmenu)
        document.querySelector('.nav-menus').classList.remove('open')
      }
    }

    return (
        <div className="page-main-header">
        <div className="main-header-right">
          <div className="main-header-left text-center">
            <div className="logo-wrapper">
              <Link to={`/bebidas/${evento}`}>
                <img 
                  src={require("../../../assets/images/logo/logo-sist-bebidas.png")} 
                  alt="Sistema de bebidas" 
                  width='50'
                  />
                </Link>
              </div>
          </div>
          <div className="nav-right col pull-right right-menu">
            <ul className="nav-menus">
              <li></li>
              <li style={{fontSize: '20px'}}>
                <Link to={`/bebidas/${evento}`} style={{color: 'white'}}>
                  <i className="fa fa-shopping-basket"></i> Tienda
                </Link>
              </li>
              <li style={{fontSize: '20px'}}>
                <Link to="/pedidos" style={{color: 'white'}}>
                  <i className="fa fa-file-text-o"></i> Pedidos
                </Link>
              </li>
              {/* <li style={{fontSize: '20px'}}>
                <Link to="/soporte" style={{color: 'white'}}>
                <i className="fa fa-envelope"></i> Soporte
                </Link>
              </li> */}
              
              {user ? (
                        user.displayName
                        ? <li> 
                            <span className="user-header">
                              <p style={{paddingTop: 15}}>{user.displayName}</p>
                              </span>
                          </li>
                        : 
                            <li> 
                            <span className="user-header">
                              <p style={{paddingTop: 15}}>{user.email}</p>
                              </span>
                            
                          </li>
                        ) : (
                          <div>
                            <li>
                              <button onClick={toggleIn} className="pull-left btn btn-primary">Iniciar sesión</button>
                            </li>
                            <li>
                              <button onClick={toggle} className="pull-left btn btn-primary">Registrarme</button> 
                            </li>
                          </div>
                          
                          
                        )}
              { user 
                ? <li onClick={handleSignOut}><LogOut/>Logout</li>
                : <li></li>
              }
            </ul>
            <div className="d-lg-none mobile-toggle pull-right" onClick={Navmenuhideandshow}><Menu/> MENU</div>
          </div>
          <script id="result-template" type="text/x-handlebars-template">
            <div className="ProfileCard u-cf">                        
            <div className="ProfileCard-avatar"><i className="pe-7s-home"></i></div>
            <div className="ProfileCard-details">
            <div className="ProfileCard-realName"></div>
            </div>
            </div>
          </script>
          <script id="empty-template" type="text/x-handlebars-template"><div className="EmptyMessage">Your search turned up 0 results. This most likely means the backend is down, yikes!</div></script>
        </div>
        <ModalLoginHead  modalIn={modalIn} toggleIn={toggleIn} header={'header'}/>
        <ModalRegistroHead  modal={modal} toggle={toggle} header={'header'}/>
      </div>
    );
}

export default Header;