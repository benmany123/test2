import React, {useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { Button, Col, Input, Row} from "antd";
import { EditOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

function Login() {
    const [user, setUser] = useState({email:'', password: ''})
    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }
    const loginSubmit = async e =>{
        e.preventDefault()
        try {
            await axios.post('/user/login', {...user})
            localStorage.setItem('firstLogin', true)
            window.location.href = "/";
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    return (
        <div className="loginDog">
            <form onSubmit={loginSubmit}>
                <Row><h1>Please sign in</h1></Row>
                <Row><h2>Email:</h2></Row>
                <Row><Input type="email" name="email" required placeholder="Pleaase input email" allowClear
                style={{borderColor:"#FFD166", borderWidth:"3px"}} value={user.email} onChange={onChangeInput}/></Row>
                <br></br>
                <Row><h2>Password:</h2></Row>
                <Row><Input.Password type="password" name="password" required autoComplete="on" style={{borderColor:"#FFD166", borderWidth:"3px"}}
                value={user.password} onChange={onChangeInput} placeholder="Pleaase input password" allowClear
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>   </Row>
                <br></br>
                <Row>
                    <Col><Button type="primary" shape="round" style={{ background: "#FFD166",borderColor: "#FFD166" } } size="large" icon={<EditOutlined />} htmlType="submit">
                    Sign in</Button></Col>
                    <Col><Link to="/register"> &nbsp;&nbsp;Sign up</Link></Col>
                </Row>
                <br/><br/><br/>
            </form>
        </div>
    )
}

export default Login
