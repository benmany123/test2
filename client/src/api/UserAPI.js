import {useState, useEffect} from 'react'
import axios from 'axios'

function UserAPI(token) {
    const [cart, setCart] = useState([])
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() =>{
        if(token){
            const getUser = async () =>{
                try {
                    const res = await axios.get('/user/infor', {headers: {Authorization: token}})
                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
                    setCart(res.data.cart)
                } catch (err) {alert(err.response.data.msg)}
            }
            getUser()            
        }
    },[token])   

    const addCart = async (dog) => {
        if(!isLogged) return alert("Please login for adding dog to favourite")
        const check = cart.every(item =>{return item._id !== dog._id})

        if(check){
            setCart([...cart, {...dog, quantity: 1}])
            await axios.patch('/user/addcart', {cart: [...cart, {...dog, quantity: 1}]}, {
                headers: {Authorization: token}
            })
        }else{alert("This dog has been added to favourite.")}
    }
    return {
        isLogged: [isLogged, setIsLogged],  isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart], addCart: addCart
    }
}

export default UserAPI
 