import React, {useContext, useState} from 'react'
import {GlobalState} from '../../GlobalState'
import Cart from './icon/dog.png'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { Divider, Row, Col } from 'antd';

//Header Page
function Header() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [cart] = state.userAPI.cart
    const [menu, setMenu] = useState(false)

    //Handle logout
    const logoutUser = async () =>{
        await axios.get('/user/logout')
        localStorage.removeItem('firstLogin')        
        window.location.href = "/";
    }

    //Admin button for staff use
    const adminRouter = () =>{
        return(
            <>
            <Col span={4} style={{textAlign:'center'}}>      
                <Link to="/create_dog"><h5>Create Record</h5></Link>
            </Col>
            <Col span={4} style={{textAlign:'center'}}>
                <Link to="/category"><h5>Breed List</h5></Link>
            </Col>
            <Col span={4} style={{textAlign:'center'}}>
                <Link to="/classify"><h5>Classify Dog</h5></Link>
            </Col>
            </>
        )
    }

    //Logout button for user/admin
    const loggedRouter = () =>{
        return(
            <>
            <Col flex={2} style={{textAlign:'center'}}>
                <Link to="/" onClick={logoutUser}><h5>Logout</h5></Link>
            </Col>
            </>
        )
    }

    return (
            <Row align="bottom" style={{ fontSize: '20px', fontColor: '#073B4C',padding:'30px'}}>
                <Col flex={4} style={{textAlign:'center'}}>               
                    <Link to="/"><h1>{isAdmin ? '  ***Admin Page***' : '  The Hong Kong Canine Shelter'}</h1></Link>
                </Col>
                <Col flex={5} style={{textAlign:'center'}}>
                    <Link to="/"><h5>{isAdmin ? 'Manage Record' : 'Dog List'}</h5></Link>
                </Col>            
                {isAdmin && adminRouter()}
                {isLogged ? loggedRouter() : <Col flex={2}><Link to="/login" style={{textAlign:'center'}}><h5>Sign In / Registration</h5></Link></Col>}
                {isAdmin ? '':
                <Col span={1} onClick={() => setMenu(!menu)}>
                    <div className="cart-icon">
                        <span>{cart.length}</span>
                        <Link to="/cart">
                            <img src={Cart} alt="" width="30" />
                        </Link>
                    </div>
                </Col>}
                <Divider/>
            </Row>            
    )
}

export default Header
