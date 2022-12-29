import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import Loading from '../../Hooks/Loading';

const Login = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const { login, providerLogin, loading } = useContext(AuthContext);

    const [loginError, setLoginError] = useState('');

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    const handelLogin = data => {
        console.log(data)
        setLoginError('');
        login(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                if (loading) {
                    <Loading></Loading>
                }
                navigate(from, { replace: true })
            })
            .catch(error => {
                console.log(error.message)
                setLoginError(error.message)
            })

    }

    const googleProvider = new GoogleAuthProvider()

    const handelGoogleSignIn = () => {
        providerLogin(googleProvider)
            .then(result => {
                const user = result.user;
                console.log(user);
                if (loading) {
                    <Loading></Loading>
                }
                navigate(from, { replace: true })

            })
            .catch(error => console.log(error))
    }

    return (
        <div className='flex justify-center items-center'>
            <div className='w-[500px] p-8 border rounded-lg'>
                <h2 className='text-4xl text-center py-5'>Login</h2>
                <form onSubmit={handleSubmit(handelLogin)}>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email"
                            {...register("email", { required: "Email Address is required" })}
                            placeholder="Email"
                            className="input input-bordered w-full"
                        />
                        {errors.email && <p className='text-red-500' role="alert">{errors.email?.message}</p>}

                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password"
                            {...register("password",
                                {
                                    required: "Password is required",
                                    minLength: { value: 6, message: 'Password must be 6 carecter or longer' }
                                }
                            )}
                            placeholder="password"
                            className="input input-bordered w-full"
                        />
                        {errors.password && <p className='text-red-500' role="alert">{errors.password?.message}</p>}
                        <label className="label">
                            <span className="label-text-alt">Forget Password</span>
                        </label>
                    </div>
                    <input type="submit" value='Login' className='btn btn-primary w-full' />
                    <div>
                        {loginError && <p>{loginError}</p>}
                    </div>
                </form>
                <p className='py-5'>SM MEDIA <Link to='/signup' className='underline text-secondary'>Create a new account</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline btn-primary w-full' onClick={handelGoogleSignIn}>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Login;