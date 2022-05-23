import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Container, Form, Col, Row, Button } from 'react-bootstrap'
import profile from '../../images/profile.png'
import './Register.css'
import { useNavigate } from 'react-router-dom'

const Register = () => {


    let navigate=useNavigate()
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [username, setUsername] = useState();
    const [userInput, setInput]= useState({
        username: "",
        first_name:"",
        last_name: "",
        email: ""
    })

    const usernameChangeHandler =(event)=>{
        setInput({
            ...userInput,
            username: event.target.value
        })
    }

    const emailChangeHandler =(event)=>{
        setInput({
            ...userInput,
            email: event.target.value
        })
    }

    const first_nameChangeHandler =(event)=>{
        setInput({
            ...userInput,
            first_name: event.target.value
        })
    }


    const last_nameChangeHandler =(event)=>{
        setInput({
            ...userInput,
            last_name: event.target.value
        })
    }



    const confirmChangeHandler = (event) => {
        setConfirmPassword(event.target.value)
    }
    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    }

    const Already=()=>{
        navigate(`/login`,{"id":1})
    }


    function Register() {
        console.log(userInput.username)
        console.log(password)
        console.log(userInput.email)
        console.log(userInput.first_name)
        console.log(userInput.last_name)
        var bodyFormData = new FormData();
        bodyFormData.append('username', userInput.username)
        bodyFormData.append('password', password)
        bodyFormData.append('email', userInput.email)
        bodyFormData.append('first_name', userInput.first_name)
        bodyFormData.append('last_name', userInput.last_name)
        console.log("Register")
        axios({
            method: "post",
            url: "http://54.91.139.171:8000/register",
            data: bodyFormData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(function (response) {
            console.log(response.data);
            navigate('/login1')
        })
            .catch(function (error) {
                console.log(error);
            });
    }



    return (
        <Col lg={4} md={6} sm={12} className="text-center p-3">
            <img className="icon-img" src={profile} alt="icon" />
            <Form>

                <Form.Group className="mb-3" controlId="formBasicUser" onChange={usernameChangeHandler}>
                    <Form.Control type="text" placeholder="Username" required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFirst_Name" onChange={first_nameChangeHandler}>
                    <Form.Control type="text" placeholder="First Name" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicLast_Name" onChange={last_nameChangeHandler}>
                    <Form.Control type="text" placeholder="Last Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail" onChange={emailChangeHandler}>
                    <Form.Control type="email" placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword" onChange={passwordChangeHandler}>
                    <Form.Control type="password" placeholder="Password" required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicConfirmPassword" onChange={confirmChangeHandler}>
                    <Form.Control type="password" placeholder="Confirm Password" required/>
                    { password!=confirmPassword ?
                    <div className='invalid-feedback d-block'>
                        Please Enter Same password
                    </div>: "" }
                </Form.Group>

                <Button variant="primary col-12" disabled={(password!=confirmPassword)} onClick={Register}>Register</Button>
            </Form>
            <br />
            <Button variant="primary col-12" onClick={Already}>Already Account Login</Button>
        </Col>
    )
}

export default Register




// <>
// <Container className="mt-5">
//     <Row>
//         <Col lg={4} md={6} sm={12} className="text-center mt-5 p-3">
//             <img className="icon-img" src={profile} alt="icon" />
//             <Form>

//                 <Form.Group className="mb-3" controlId="formBasicPassword">
//                     <Form.Control type="text" placeholder="First Name" />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="formBasicPassword">
//                     <Form.Control type="text" placeholder="Last Name" />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="formBasicEmail">
//                     <Form.Control type="email" placeholder="Enter email" />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="formBasicPassword">
//                     <Form.Control type="password" placeholder="Password" />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="formBasicPassword">
//                     <Form.Control type="password" placeholder="Confirm Password" />
//                 </Form.Group>

//                 <Button variant="primary col-12" type="submit">Register</Button>
//             </Form>
//         </Col>
//         <Col lg={8} md={6} sm={12}>
//             <img className='w-100' src={Login} alt="" />
//         </Col>
//     </Row>
// </Container>
// </>