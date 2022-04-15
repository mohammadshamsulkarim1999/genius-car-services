import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../../firebasee.init';
import './Register.css'
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import SocialLogin from '../SocialLogin/SocialLogin';
import { getMultiFactorResolver } from 'firebase/auth';
import { async } from '@firebase/util';

const Register = () => {
    const [agree, setAgree] = useState(false)
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);

    const navigate = useNavigate()
    const navigateLogin = () => {
        navigate('/login')
    }
    if (user) {
        console.log('user ', user)
    }
    const handleRegister = async event => {
        event.preventDefault()
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const agree = event.target.terms.checked;

        await createUserWithEmailAndPassword(email, password)
        await updateProfile({ displayName: name });
        alert('Updated profile')
        navigate('/home')

    }
    return (
        <div className='register-form'>
            <h1 className='text-center my-2 text-primary'>Register</h1>
            <form onSubmit={handleRegister}>
                <input type="text" name='name' placeholder='Your Name' />

                <input type="email" name="email" id="" placeholder='Your Email' required />

                <input type="password" name="password" id="" placeholder='Passwoord' required />

                <input onClick={() => setAgree(!agree)} type="checkbox" name="terms" id="terms" required />
                {/* <label className={agree? 'ps-2 text-primary': 'ps-2 text-danger'} htmlFor="terms">Accept terms and condition</label> */}
                <label className={`ps-2  ${agree ? '' : 'text-danger'}`} htmlFor="terms">Accept terms and condition</label>

                <input disabled={!agree} className='btn btn-primary text-white w-50 mx-auto mt-2' type="submit" value="Register" />
            </form>
            <p>Already Register? <Link to='/login' className='text-primary pe-auto text-decoration-none' onClick={navigateLogin} >Login here..</Link></p>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;