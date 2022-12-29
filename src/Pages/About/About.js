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
                <div className='md:w-1/2 p-7 border rounded'>
                    {/* The button to open modal */}
                    <div className='flex justify-end'>
                        <label htmlFor="my-modal-3" className="btn">Edit</label>
                    </div>
                    {/* Put this part before </body> tag */}
                    <input type="checkbox" id="my-modal-3" className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box relative">
                            <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                            <h3 className="text-lg font-bold">Congratulations random Internet user!</h3>
                            <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
                        </div>
                    </div>

                    <div className='pb-48 pt-24'>
                        <div className='text-center'>

                            <div>
                                {
                                    about.map((aboute, ids) => <div
                                        key={ids}
                                    >
                                        <h2 className='text-2xl'><span className='font-semibold'>Name:</span> {aboute.name}</h2>
                                        <h2 className='pt-5'><span className='font-semibold'>Email: </span>{aboute.email}</h2>
                                        <h2 className='py-2'><span className='font-semibold'>University: </span> {aboute.university}</h2>
                                        <h2><span className='font-semibold'>District: </span> {aboute.district}</h2>
                                        <h2 className='py-2'><span className='font-semibold'>Upojela:  </span>{aboute.upojela}</h2>
                                        <h2><span className='font-semibold'>Village: </span> {aboute.village}</h2>
                                    </div>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;