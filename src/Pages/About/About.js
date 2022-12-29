import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import Loading from '../../Hooks/Loading';

const About = () => {

    const { user } = useContext(AuthContext);
    const { data: about, isLoading, refetch } = useQuery({
        queryKey: ['about'],
        queryFn: async () => {
            const res = await fetch(' https://sm-media-server.vercel.app/user/admin/about');
            const data = await res.json();
            // console.log(data.);
            return data;
        }
    })

    // const {village, upojela, university, district} = about;
    // console.log(about[0])

    if (isLoading) {
        return <Loading></Loading>
    }


    return (
        <div className='max-w[1240px] mx-auto'>
            <div className='flex justify-center'>
                <div className='md:w-1/2 p-7 border rounded py-48'>
                    <div className='text-center'>
                        <h2 className='text-2xl'><span className='font-semibold'>Name:</span> {user?.displayName}</h2>
                        <h2 className='pt-5'>Email: {user?.email}</h2>
                        <div>
                            {
                                about.map((aboute, ids) => <div
                                    key={ids}
                                >
                                    <h2 className='py-2'>University: {aboute.university}</h2>
                                    <h2>District: {aboute.district}</h2>
                                    <h2 className='py-2'>Upojela: {aboute.upojela}</h2>
                                    <h2>Village: {aboute.village}</h2>
                                </div>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;