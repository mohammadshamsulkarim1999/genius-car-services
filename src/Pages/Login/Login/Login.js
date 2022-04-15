import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebasee.init';
import Loading from '../../Shared/Loading/Loading';
import SocialLogin from '../SocialLogin/SocialLogin';
import './Login.css'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const [sendPasswordResetEmail, sending,] = useSendPasswordResetEmail(auth);

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const location = useLocation();

    let from = location.state?.from?.pathname || "/";
    let errorElement;


    if (error) {
        errorElement = <p className='text-danger'>Error : {error?.message} </p>
    }

    const emailRef = useRef('')
    const passwordRef = useRef('')
    const navigate = useNavigate()

    if (user) {
        navigate(from, { replace: true });

    }

    if (loading || sending) {
        return <Loading></Loading>
    }

    const handleSubmit = event => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        signInWithEmailAndPassword(email, password)
    }

    const navigateRegister = (event) => {
        navigate('/register')
    }

    const resetPassword = async () => {
        const email = emailRef.current.value;
        if (email) {
            await sendPasswordResetEmail(email);
            toast('Sent email');
        }
        else{
            toast('Please enter your email address')
        }

    }

    return (
        <div className='container w-50'>
            <h1 className='text-primary text-center'>Login..</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">

                    <Form.Control ref={emailRef} type="email" placeholder="Enter email" required />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">

                    <Form.Control ref={passwordRef} type="password" placeholder="Password" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary w-50 mx-auto d-block my-3" type="submit">
                    Login
                </Button>
            </Form>
            {errorElement}
            <p>New to Genius Car? <span className='text-primary pe-auto' onClick={navigateRegister}>Please Register to get service</span></p>
            <p>Forget Password? <span className='text-primary pe-auto' onClick={resetPassword}>Reset Password</span></p>
            <SocialLogin></SocialLogin>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Login;