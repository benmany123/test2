import React, {useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { Button,Input,Row} from "antd";
import { EditOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';


function Register() {
    const [user, setUser] = useState({name:'', email:'', password: ''})

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }
    const registerSubmit = async e =>{
        e.preventDefault()
        try {
            await axios.post('/user/register', {...user})
            localStorage.setItem('firstLogin', true)            
            window.location.href = "/";
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    return (
        <div className="loginDog">
            <form onSubmit={registerSubmit}>
                <Row><h1>Register</h1></Row>
                <Row><h2>Name:</h2></Row>
                <Row><Input type="text" name="name" required allowClear placeholder="Pleaase input your name"
                value={user.name} onChange={onChangeInput}
                style={{borderColor:"#FFD166", borderWidth:"4px"}}/></Row>
                <br></br><br></br>
                <Row><h2>Email:</h2></Row>
                <Row><Input type="email" name="email" required allowClear placeholder="Pleaase input email"
                value={user.email} onChange={onChangeInput} style={{borderColor:"#FFD166", borderWidth:"4px"}}/></Row>
                <br></br><br></br>
                <Row><h2>Password:</h2></Row>
                <Row><Input.Password type="password" name="password" required autoComplete="on" allowClear placeholder="Pleaase input password"
                value={user.password} onChange={onChangeInput} style={{borderColor:"#FFD166", borderWidth:"4px"}}
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/> </Row>    
                <br></br><br></br>
                <Row>
                    <Button type="primary"  shape="round" style={{ background: "#FFD166",borderColor: "#FFD166" } } size="large" icon={<EditOutlined />} htmlType="submit">
                        Register
                    </Button>
                    <Link to="/login">&nbsp;&nbsp; Login</Link>
                </Row>    
            </form>
        </div>
    )
}

export default Register