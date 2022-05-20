import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {GlobalState} from '../../../../GlobalState'

function BtnRender({dog, deleteDog}) {
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin
    const addCart = state.userAPI.addCart
    
    return (
        <div className="row_btn">
            {
                isAdmin ? 
                <>
                    <Link id="btn_view" to={`/edit_dog/${dog._id}`}>
                        Edit
                    </Link> 
                    <Link id="btn_add" to="#!" 
                    onClick={() =>deleteDog(dog._id, dog.images.public_id)}>
                        Delete
                    </Link>
                </>
                : <>                    
					<Link id="btn_view" to={`/detail/${dog._id}`}>
                        Details
                    </Link>
                    <Link id="btn_add" to="#!" onClick={() => addCart(dog)}>
                        Favour
                    </Link>
                </>
            }                
        </div>
    )
}

export default BtnRender
