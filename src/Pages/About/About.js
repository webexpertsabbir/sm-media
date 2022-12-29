import { useQuery } from '@tanstack/react-query';
import { data } from 'autoprefixer';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthProvider';
import Loading from '../../Hooks/Loading';

const About = () => {
    
    const { register, handleSubmit, reset, formState: { errors } } = useForm();


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

    const handleEditabout = data =>{
        
        const aboutCollaection = {
            name: data.name,
            email: data.email,
            university: data.university,
            upojela: data.upojela,
            village: data.village,
            district: data.district,
        }
        
        fetch(`https://sm-media-server.vercel.app/user/admin/about/${about[0]._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(aboutCollaection)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                toast.success(`Edit About Complate`);
                refetch();
            })
    }

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
                            <h2 className="text-2xl font-semibold uppercase">Edit Your about</h2>
                                <form onSubmit={handleSubmit(handleEditabout)}>
                                    <div className="form-control w-full my-5">
                                        <input
                                            {...register("name", {
                                                required: "Please Wirte Your Name !!!"
                                            })} className="input input-bordered w-full" placeholder='Name'/>
                                        {errors.name && <p className='text-red-500' role="alert">{errors.name?.message}</p>}
                                    </div>

                                    <div className="form-control w-full my-5">
                                        <input
                                            {...register("email", {
                                                required: "Please Wirte Your Name !!!"
                                            })} className="input input-bordered w-full" placeholder='Email'/>
                                        {errors.email && <p className='text-red-500' role="alert">{errors.email?.message}</p>}
                                    </div>

                                    <div className="form-control w-full my-5">
                                        <input
                                            {...register("university", {
                                                required: "Please Wirte Your University !!!"
                                            })} className="input input-bordered w-full" placeholder='University'/>
                                        {errors.university && <p className='text-red-500' role="alert">{errors.university?.message}</p>}
                                    </div>

                                    <div className="form-control w-full my-5">
                                        <input
                                            {...register("district", {
                                                required: "Please Wirte Your District !!!"
                                            })} className="input input-bordered w-full" placeholder='District'/>
                                        {errors.district && <p className='text-red-500' role="alert">{errors.district?.message}</p>}

                                    </div>

                                    <div className="form-control w-full my-5">
                                        <input
                                            {...register("upojela", {
                                                required: "Please Wirte Your Upojela !!!"
                                            })} className="input input-bordered w-full" placeholder='Upojela'/>
                                        {errors.upojela && <p className='text-red-500' role="alert">{errors.upojela?.message}</p>}
                                    </div>

                                    <div className="form-control w-full my-5">
                                        <input
                                            {...register("village", {
                                                required: "Please Wirte Your Village !!!"
                                            })} className="input input-bordered w-full" placeholder='Village'/>
                                        {errors.village && <p className='text-red-500' role="alert">{errors.village?.message}</p>}
                                    </div>
                                    <input className='btn w-full mt-4' value="Submit" type="submit" />
                                </form>
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