import React from 'react';
import Posts from '../Shared/Posts/Posts';
import UploadOption from './UploadOption';

const Home = () => {
    return (
        <div className='max-w[1240px] mx-auto'>
            <UploadOption></UploadOption>
            {/* <Posts></Posts> */}
        </div>
    );
};

export default Home;