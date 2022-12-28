import { useQuery } from '@tanstack/react-query';
import { data } from 'autoprefixer';
import React from 'react';
import Loading from '../../../Hooks/Loading';
import Post from './Post';

const Posts = () => {

    const { data: posts, isLoading } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/posts');
            const data = await res.json();
            console.log(data)
            return data;
        }
    })

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>

            {
                posts.map(post =><Post 
                key={post._id}
                post={post}
                ></Post>)
            }


        </div>
    );
};

export default Posts;