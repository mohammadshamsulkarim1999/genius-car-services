import React from 'react';
import google from '../../../Emages/socialLogo/google.png'
import facebook from '../../../Emages/socialLogo/facebook.png'
import github from '../../../Emages/socialLogo/github.png'
import { useSignInWithFacebook, useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../../firebasee.init';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';

const SocialLogin = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const [signInWithGithub, user1, loading1, error1] = useSignInWithGithub(auth);
    const [signInWithFacebook, user2, loading2, error2] = useSignInWithFacebook(auth);
    const navigate = useNavigate();
    let errorElement;

    if (loading || loading1 || loading2) {
        return <Loading></Loading>
    }

    if (error || error1 || error2) {
        errorElement = <p className='text-danger'>Error : {error?.message} {error1?.message} {error2?.message}</p>
    }

    if (user || user1 || user2) {
        navigate('/home')
    }



    return (
        <div>
            <div className='d-flex align-items-center '>
                <div style={{ height: '1px' }} className='bg-primary w-50'></div>
                <p className='mb-1 mx-3'>Or</p>
                <div style={{ height: '1px' }} className='bg-primary w-50'></div>
            </div>
            {errorElement}
            <div>
                <button
                    onClick={() => signInWithGoogle()}
                    className='btn btn-primary w-50 d-block mx-auto mb-2'>
                    <img className='mb-1' src={google} alt="" />
                    <span className='px-2 text-white'>Google Sign In</span>
                </button>
                <button
                    onClick={() => signInWithFacebook()}
                    className='btn btn-primary w-50 d-block mx-auto mb-2'>
                    <img className='mb-1' src={facebook} alt="" />
                    <span className='px-2 text-white'>Facebook Sign In</span>
                </button>
                <button
                    onClick={() => signInWithGithub()}
                    className='btn btn-primary w-50 d-block mx-auto'>
                    <img className='mb-1' src={github} alt="" />
                    <span className='px-2 text-white'>Github Sign In</span>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;