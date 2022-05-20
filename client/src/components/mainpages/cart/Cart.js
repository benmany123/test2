import React, {useContext} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import { Col, Image} from 'antd';
import Dog_Family from '../../headers/icon/dog_family.png'

function Cart() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [token] = state.token
  
    const addToCart = async (cart) =>{
        await axios.patch('/user/addcart', {cart}, {
            headers: {Authorization: token}
        })
    }

    const removeDog = id =>{
        if(window.confirm("Do you want to delete this dog?")){
            cart.forEach((item, index) => {
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })

            setCart([...cart])
            addToCart(cart)
        }
    }


    if(cart.length === 0) 
        return(
            <Col style={{textAlign:'center'}}>
                <h1>Your favourite list is empty.</h1>
                <Image src={Dog_Family}></Image>
            </Col> 
        )

    return (
        <>{cart.map(dog => (
                    <div className="detail cart" key={dog._id}>
                        <img src={dog.images.url} alt="" />
                        <div className="box-detail">
                            <h2>{dog.title}</h2>
                            <h3>Gender: {dog.content}</h3>
                            <h3>Age: {dog.age}</h3>
                            <h3>Centre: {dog.description}</h3>
                            <div className="delete" 
                            onClick={() => removeDog(dog._id)}>
                                X
                            </div>
                        </  div>
                    </div>
                ))
            }
        </>
    )
}

export default Cart
