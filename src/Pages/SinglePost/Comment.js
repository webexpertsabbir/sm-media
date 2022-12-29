import React from 'react';
import { FaUser } from 'react-icons/fa';


const Comment = ({ userComment }) => {
    const { comment, ucommentId, userName, userImage, userEmail, } = userComment;

    return (
        <div className='py-5'>
            <div className='flex justify-start items-center'>
                <div className="avatar">
                    {
                        userImage ?
                            <>
                                <div className="w-8 rounded-full">
                                    <img src={userImage} alt={userName} />
                                </div>
                            </>
                            :
                            <>
                                <div className="w-8 rounded-full">
                                    <FaUser className='w-7 mt-2'></FaUser>
                                </div>
                            </>
                    }
                </div>
                <h2 className="card-title ml-2">{userName}</h2>
            </div>
            <p className='pt-2'>{comment}</p>
        </div>
    );
};

export default Comment;