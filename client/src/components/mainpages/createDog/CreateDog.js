import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import Loading from '../utils/loading/Loading'
import {GlobalState} from '../../../GlobalState'
import {useHistory, useParams} from 'react-router-dom'
import {Button, Input, Row, Space} from "antd";
import {EditOutlined,BarcodeOutlined,CommentOutlined,GithubOutlined,EnvironmentOutlined, BarsOutlined, DashboardOutlined } from '@ant-design/icons';

const initialState = {
    dog_id: '0001',
    title: '',
    age: 0,
    description: '',
    content: '',
    category: '',
    _id: ''
}

function CreateDog() {
    const state = useContext(GlobalState)
    const [dog, setDog] = useState(initialState)
    const [categories] = state.categoriesAPI.categories
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const history = useHistory()
    const param = useParams()
    const [dogs] = state.dogsAPI.dogs
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.dogsAPI.callback

    useEffect(() => {
        if(param.id){
            setOnEdit(true)
            dogs.forEach(dog => {
                if(dog._id === param.id) {
                    setDog(dog)
                    setImages(dog.images)
                }
            })
        }else{
            setOnEdit(false)
            setDog(initialState)
            setImages(false)
        }
    }, [param.id, dogs])

    const handleUpload = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You're not an admin")
            const file = e.target.files[0]
            if(!file) return alert("File not exist.")
            if(file.type !== 'image/jpeg' && file.type !== 'image/png')
                return alert("Please upload jpeg or png")
            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload', formData, {headers: {'content-type': 'multipart/form-data', Authorization: token}})
            setLoading(false)
            setImages(res.data)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleChangeInput = e =>{
        const {name, value} = e.target
        setDog({...dog, [name]:value})
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            if(!images) return alert("Plese upload an image")
            if(onEdit){
                await axios.put(`/api/dogs/${dog._id}`, {...dog, images}, {
                    headers: {Authorization: token}
                })
            }else{
                await axios.post('/api/dogs', {...dog, images}, {
                    headers: {Authorization: token}
                })
            }
            setCallback(!callback)
            history.push("/")
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const styleUpload = {display: images ? "block" : "none"}
    return (
        <div className="create_dog">
            <div className="upload">
                <input type="file" name="file" id="file_up" onChange={handleUpload}/>
                {
                    loading ? <div id="file_img"><Loading /></div>
                    :<div id="file_img" style={styleUpload}>
                        <img src={images ? images.url : ''} alt=""/>
                    </div>
                }
            </div>

            <form onSubmit={handleSubmit}>
                <Row>
                    <Space>
                        <BarcodeOutlined style={{fontSize:"20px"}}/>
                        <h2>Dog ID:</h2>
                    </Space>
                    <Input type="text" name="dog_id" id="dog_id" required allowClear placeholder="Pleaase input Dog ID:"
                    value={dog.dog_id} onChange={handleChangeInput} disabled={onEdit} style={{ borderColor:"#073B4C", borderWidth:"2px"}}/>
                </Row>
                <Row>
                    <Space>    
                        <GithubOutlined style={{fontSize:"20px"}}/>                 
                        <h2>Dog Name:</h2>
                    </Space>  
                    <Input type="text" name="title" id="title" required allowClear placeholder="Pleaase input Dog Name"
                    value={dog.title} onChange={handleChangeInput} rows={2} style={{ borderColor:"#073B4C", borderWidth:"2px"}}/>
                </Row>                            
                <Row>
                    <Space> 
                        <CommentOutlined style={{fontSize:"20px"}}/>
                        <h2>Gender:</h2>
                    </Space> 
                    <Input type="text" name="content" id="content" required allowClear placeholder="Pleaase input Dog Gender"
                    value={dog.content} onChange={handleChangeInput} style={{ borderColor:"#073B4C", borderWidth:"2px"}}/>
                </Row>
                <Row>
                    <Space> 
                        <DashboardOutlined style={{fontSize:"20px"}}/>
                        <h2>Age:</h2>
                    </Space> 
                    <Input type="number" name="age" id="age" required allowClear placeholder="Pleaase input Dog Age"
                    value={dog.age} onChange={handleChangeInput} rows={1} style={{ borderColor:"#073B4C", borderWidth:"2px"}}/>
                </Row>
                <Row>
                    <Space> 
                        <EnvironmentOutlined style={{fontSize:"20px"}}/>
                        <h2>Centre:</h2>
                    </Space> 
                    <Input type="text" name="description" id="description" required allowClear placeholder="Pleaase input Dog Centre"
                    value={dog.description} rows="3" onChange={handleChangeInput} style={{ borderColor:"#073B4C", borderWidth:"2px"}}/>
                </Row>    
                <Row>
                    <Space>
                        <BarsOutlined style={{fontSize:"20px"}}/>
                        <h2>Breeds:</h2>                              
                    </Space>
                        &nbsp;&nbsp;
                        <select name="category" value={dog.category} onChange={handleChangeInput} >
                            <option value="">Please select a breed</option>
                            {
                                categories.map(category => (
                                    <option value={category._id} key={category._id}>
                                        {category.name}
                                    </option>
                                ))
                            }
                        </select>
                </Row>
                <Button type="primary"  shape="round" style={{ background: "#EF476F",borderColor: "#EF476F" } } size="large" icon={<EditOutlined style={{fontSize:"20px"}}/>} htmlType="submit" block>
                    {onEdit? "Update" : "Add"}
                </Button>                
            </form>
        </div>
    )
}

export default CreateDog
