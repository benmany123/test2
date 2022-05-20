import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import { Image, Row} from "antd"

function DogDetail() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [dogs] = state.dogsAPI.dogs
    const addCart = state.userAPI.addCart
    const [detailDog, setDetailDog] = useState([])

    useEffect(() =>{
        if(params.id){

            dogs.forEach(dog => {
                if(dog._id === params.id) setDetailDog(dog)
            })
        }
    },[params.id, dogs])

    if(detailDog.length === 0) return null;

    return (
        <>
            <div className="detail">
                <Image src={detailDog.images.url} alt="" />
                <div className="box-detail">
                    <Row>                     
                        <span htmlFor="content"><h2>
                            Name: {detailDog.title}</h2>
                        </span>
                    </Row>
                    <Row><h2>Gender: {detailDog.content}</h2></Row>                  
                    <Row><h2>Age: {detailDog.age}</h2></Row>
                    <Row><h2>Centre: {detailDog.description}</h2></Row>                   
                    <Link to="/cart" className="cart"
                    onClick={() => addCart(detailDog)}>
                        Add to favourite
                    </Link>
                </div>
            </div>
        </>
    )
}

export default DogDetail
