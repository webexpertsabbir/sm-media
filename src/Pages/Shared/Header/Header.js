import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';
import { FaUser } from 'react-icons/fa';

const Header = () => {

    const { user, logOut } = useContext(AuthContext);
    // console.log(user)

    const handelLogOut = () => {
        logOut()
            .then(() => { })
            .catch(err => console.log(err))
    }


    const menuItem = <React.Fragment>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/media">Media</Link></li>
        <li><Link to="/about">About</Link></li>
        {
            user?.uid ?
                <>
                    <li><button onClick={handelLogOut}>Log Out</button></li>
                </>
                :
                <li><Link to="/signup" >Sign Up</Link></li>
        }

    </React.Fragment>




    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItem}
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl">SM MEDIA</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {menuItem}
                </ul>
            </div>
            <div className="navbar-end">
                <div className='flex justify-start items-center'>

                    {
                        user?.uid ?
                            <>
                                {
                                    user?.photoURL ?
                                        <>
                                            <div className="avatar online">
                                                <div className="w-8 rounded-full">
                                                    <img src={user.photoURL} alt={user.displayName} />
                                                </div>
                                            </div>
                                        </>
                                        :
                                        <div className="avatar online">
                                            <div className="w-8">
                                                <FaUser></FaUser>
                                            </div>
                                        </div>

                                }
                            </>
                            :
                            <FaUser></FaUser>
                    }


                    <a className="text-xl font-semibold ml-3">{user?.displayName} </a>

                </div>
            </div>
        </div>
    );
};

export default Header;