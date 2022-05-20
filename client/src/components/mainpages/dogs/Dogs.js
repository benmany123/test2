import React, {useContext, useState} from 'react'
import axios from 'axios'
import DogItem from '../utils/dogItem/DogItem'
import Filters from './Filters'
import Loading from '../utils/loading/Loading'
import LoadMore from './LoadMore'
import {GlobalState} from '../../../GlobalState'

function Dogs() {
    const state = useContext(GlobalState)
    const [dogs, setDogs] = state.dogsAPI.dogs
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [callback, setCallback] = state.dogsAPI.callback
    
    const [loading, setLoading] = useState(false)
    const handleCheck = (id) =>{
        dogs.forEach(dog => {
            if(dog._id === id) dog.checked = !dog.checked
        })
        setDogs([...dogs])
    }

    const deleteDog = async(id, public_id) => {
        try {
            setLoading(true)
            const destroyImg = axios.post('/api/destroy', {public_id},{
                headers: {Authorization: token}
            })
            const deleteDog = axios.delete(`/api/dogs/${id}`, {
                headers: {Authorization: token}
            })
            await destroyImg
            await deleteDog
            setCallback(!callback)
            setLoading(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    if(loading) return <div><Loading /></div>
    return (
        <>
            <Filters />
            <div className="dogs">
                {dogs.map(dog => {
                        return <DogItem key={dog._id} dog={dog}
                        isAdmin={isAdmin} deleteDog={deleteDog} handleCheck={handleCheck} />
                    })
                } 
            </div>
            <LoadMore />
            {dogs.length === 0 && <LoadMore />}
        </>
    )
}

export default Dogs
