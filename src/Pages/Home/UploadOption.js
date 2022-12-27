import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Hooks/Loading';

const UploadOption = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const imageHostKey = process.env.REACT_APP_imgbb_key;

    // const navigate = useNavigate();

    // const { data: specialties, isLoading } = useQuery({
    //     queryKey: ['specialty'],
    //     queryFn: async () => {
    //         const res = await fetch('https://doctors-portal-server-rust.vercel.app/appointmentSpecialty');
    //         const data = await res.json();
    //         return data;
    //     }
    // })


    const handleAddPost = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    console.log(imgData.data.url);
                    const doctor = {
                        post: data.post,
                        image: imgData.data.url
                    }
                    console.log(doctor)

                    // // save doctor information to the database
                    // fetch('https://doctors-portal-server-rust.vercel.app/doctors', {
                    //     method: 'POST',
                    //     headers: {
                    //         'content-type': 'application/json',
                    //         authorization: `bearer ${localStorage.getItem('accessToken')}`
                    //     },
                    //     body: JSON.stringify(doctor)
                    // })
                    //     .then(res => res.json())
                    //     .then(result => {
                    //         console.log(result);
                    //         toast.success(`${data.name} is added successfully`);
                    //         // navigate('/dashboard/managedoctors')
                    //     })
                }
            })
    }

    // if(isLoading){
    //     return <Loading></Loading>
    // }

    return (
        <div className='flex justify-center'>
            <div className='md:w-1/2 p-7'>
                <h2 className="text-3xl text-center font-semibold uppercase">Create Your Post</h2>
                <form onSubmit={handleSubmit(handleAddPost)}>
                    <div className="form-control w-full my-5">
                        <textarea
                            {...register("post", {
                                required: "Name is Required"
                            })} className="textarea w-full" placeholder='Write something about you...'></textarea>
                    </div>
                    <div className="form-control w-full">
                        <input type="file" {...register("image", {
                        })} className="file-input file-input-bordered w-full" />
        
                    </div>
                    <input className='btn btn-accent w-full mt-4' value="Publish" type="submit" />
                </form>
            </div>
        </div>
    );
};

export default UploadOption;