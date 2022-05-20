import React, {useState, useContext} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import { Button, Input, Row} from "antd"
import { EditOutlined} from '@ant-design/icons';

function Categories() {
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories
    const [category, setCategory] = useState('')
    const [token] = state.token
    const [callback, setCallback] = state.categoriesAPI.callback
    const [onEdit, setOnEdit] = useState(false)
    const [id, setID] = useState('')

    const createCategory = async e =>{
        e.preventDefault()
        try {
            if(onEdit){
                const res = await axios.put(`/api/category/${id}`, {name: category}, {
                    headers: {Authorization: token}
                })
                alert(res.data.msg)
            }else{
                const res = await axios.post('/api/category', {name: category}, {
                    headers: {Authorization: token}
                })
                alert(res.data.msg)
            }
            setOnEdit(false)
            setCategory('')
            setCallback(!callback)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    const editCategory = async (id, name) =>{
        setID(id)
        setCategory(name)
        setOnEdit(true)
    }
    const deleteCategory = async id =>{
        try {
            const res = await axios.delete(`/api/category/${id}`, {headers: {Authorization: token}})
            alert(res.data.msg)            
            setCallback(!callback)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    return (
        <div className="categories">
            <form onSubmit={createCategory}>
                <Row><h2><label htmlFor="category">Input new breed:</label></h2></Row>
                <Row><Input type="text" name="category" value={category} required allowClear placeholder="Pleaase input Dog Breed"
                style={{ borderColor:"#FFD166", borderWidth:"5px"}} onChange={e => setCategory(e.target.value)} /></Row>
                <br></br>
                <Button type="primary" block shape="round" size="large" style={{ background: "#FFD166",borderColor: "#FFD166", color:'#073B4C', fontWeight:'bold' } } icon={<EditOutlined />} htmlType="submit">{onEdit? "Update" : "Create"}</Button>
            </form>
            <div className="col">
                {
                    categories.map(category => (
                        <div className="row" key={category._id}>
                            <p>{category.name}</p>
                            <div>
                                <Button style={{ background: "#FFD166",borderColor: "#FFD166", color:'#073B4C', fontWeight:'bold' } } onClick={() => editCategory(category._id, category.name)}>Edit</Button>
                                <Button style={{ background: "#EF476F",borderColor: "#EF476F", color:'#073B4C', fontWeight:'bold' } } onClick={() => deleteCategory(category._id)} class="del">Delete</Button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Categories
