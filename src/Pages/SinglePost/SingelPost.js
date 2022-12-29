import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Hooks/Loading';
import Comment from './Comment';
import { AuthContext } from '../../Context/AuthProvider';

const SingelPost = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { _id, userPost, userName, userImage, userEmail, postImage, loveReact } = useLoaderData();

    const { user } = useContext(AuthContext);


    const { data: userComments, isLoading, refetch } = useQuery({
        queryKey: ['userComments'],
        queryFn: async () => {
            const res = await fetch(`https://sm-media-server.vercel.app/post/comment/${_id}`);
            const data = await res.json();
            console.log(data);
            return data;
        }
    })

    const handleAddPost = data => {

        // console.log(data)
        const commenColection = {
            comment: data.comment,
            commentId: _id,
            userName: user.displayName,
            userEmail: user.email,
            userImage: user.photoURL
        }

        fetch('https://sm-media-server.vercel.app/post/comment', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(commenColection)
        })
            .then(res => res.json())
            .then(result => {
                // console.log(result);
                reset();
                toast.success(`Your Comment added successfully`);
                refetch();
                // navigate('/dashboard/managedoctors')
            })
    }

    const loveReactNew = parseInt(loveReact.loveReactSum)
    // console.log(parseFloat(loveReact))

    const loveReactSum = 1 + loveReactNew;
    console.log(loveReactSum)

    const handleLoveReact = () => {

        const loveReactColection = {
            loveReactSum
        }
        // const loveReactSum = 1 + loveReact;

        fetch(`https://sm-media-server.vercel.app/post/love/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(loveReactColection)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                toast.success(`Love React successfully`);
                refetch()
            })
    }


    if (isLoading) {
        return <Loading></Loading>
    }


    return (
        <div className='max-w[1240px] mx-auto'>
            <div>
                <div className='flex justify-center py-2'>
                    <div className='md:w-1/2 p-7 border rounded'>
                        <div className="card bg-base-100">
                            <div className="card-body">
                                <div className='flex justify-start items-center'>
                                    <div className="avatar">
                                        {
                                            userImage ?
                                                <>
                                                    <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                                        <img src={userImage} alt={userName} />
                                                    </div>
                                                </>
                                                :
                                                <>
                                                    <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                                        <FaUser className='w-7 mt-2'></FaUser>
                                                    </div>
                                                </>

                                        }
                                    </div>
                                    <h2 className="card-title ml-5">{userName}</h2>
                                </div>
                                <p className='pt-3'>{userPost}</p>
                            </div>
                            <img className='rounded' src={postImage} alt={userName} />


                            <div className='grid grid-cols-2 pt-2'>
                                <button onClick={handleLoveReact} className="btn btn-secondary btn-sm gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                    Love
                                </button>
                                <p className='text-center pt-2 font-semibold'>{loveReact.loveReactSum} Love react</p>
                            </div>


                            <div className='p-7 mt-5 border rounded'>
                                <h2 className="text-2xl font-semibold uppercase">Write Your Comment</h2>
                                <form onSubmit={handleSubmit(handleAddPost)}>
                                    <div className="form-control w-full my-5">
                                        <textarea
                                            {...register("comment", {
                                                required: "Please Wirte You Comment !!!"
                                            })} className="textarea w-full" placeholder='Write something about you...'></textarea>
                                        {errors.comment && <p className='text-red-500' role="alert">{errors.comment?.message}</p>}

                                    </div>
                                    <input className='btn w-full mt-4' value="Comment" type="submit" />
                                </form>
                            </div>

                            <div>
                                <h1 className='text-lg py-5 font-semibold'>User Comment</h1>
                                {
                                    userComments.map((userComment, ids) => <Comment
                                        key={ids}
                                        userComment={userComment}
                                    ></Comment>)
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingelPost;