import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';


const Post = ({ post }) => {
    const { _id, userPost, userName, userImage, userEmail, postImage, loveReact } = post;
    
    const {user} = useContext(AuthContext);

    const loveReactNew = parseInt(loveReact)
    console.log(parseFloat(loveReact))

    const loveReactSum = 1 + loveReactNew;
    console.log(loveReactSum)

    const handleLoveReact = () => {

        const loveReactColection = {
            loveReact: loveReactSum,
        }
        // const loveReactSum = 1 + loveReact;

        fetch(`http://localhost:5000/post/love/${_id}`, {
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
                // refetch();
                // navigate('/dashboard/managedoctors')
            })
    }


    return (
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
                            <p className='pt-3'>{userPost.slice(0, 250)} <Link to={`/posts/${_id}`}><span className='text-red-600 font-semibold'>Read More ...</span></Link></p>
                        </div>
                        <img className='rounded' src={postImage} alt={userName} />


                        <div className='grid grid-cols-2 pt-2'>
                            <button onClick={handleLoveReact} className="btn btn-secondary btn-sm gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                Love
                            </button>
                            <p className='text-center pt-2 font-semibold'>100 Love react</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;