import React, {useContext} from 'react'
import Cart from './cart/Cart'
import Categories from './categories/Categories'
import ClassifyDog from './DogClassifier/DogClassifier'
import CreateDog from './createDog/CreateDog'
import Dogs from './dogs/Dogs'
import DogDetail from './detailDog/DetailDog'
import Login from './auth/Login'
import NotFound from './utils/not_found/NotFound'
import Register from './auth/Register'
import {Switch, Route} from 'react-router-dom'
import {GlobalState} from '../../GlobalState'

function Pages() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin


    return (
        <Switch>
            <Route path="/" exact component={Dogs} />
            <Route path="/detail/:id" exact component={DogDetail} />
            <Route path="/login" exact component={isLogged ? NotFound : Login} />
            <Route path="/register" exact component={isLogged ? NotFound : Register} />
            <Route path="/category" exact component={isAdmin ? Categories : NotFound} />
            <Route path="/category" exact component={isAdmin ? Categories : NotFound} />
            <Route path="/create_dog" exact component={isAdmin ? CreateDog : NotFound} />
            <Route path="/edit_dog/:id" exact component={isAdmin ? CreateDog : NotFound} />
            <Route path="/classify" exact component={isAdmin ? ClassifyDog : NotFound} />
            <Route path="/cart" exact component={Cart} />
            <Route path="*" exact component={NotFound} />
        </Switch>
    )
}

export default Pages
