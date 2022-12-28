import React from 'react';
import { FaUser } from 'react-icons/fa';


const Post = ({ post }) => {
    const { _id, userPost, userName, userImage, userEmail, postImage, } = post
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
                            <p className='pt-3'>{userPost.slice(0, 250)} ...</p>
                        </div>
                        <img className='rounded' src={postImage} alt={userName} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;