import About from "../Pages/About/About";
import Login from "../Pages/Login/Login";
import Media from "../Pages/Media/Media";
import SignUp from "../Pages/SignUp/SignUp";
import SingelPost from "../Pages/SinglePost/SingelPost";
import PrivetRoute from "./PrivetRoutes";

const { createBrowserRouter } = require("react-router-dom");
const { default: Main } = require("../layout/Main");
const { default: Home } = require("../Pages/Home/Home");

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children:[
            {
                path: '/',
                element: <PrivetRoute><Home></Home></PrivetRoute>
            },
            {
                path: 'About',
                element: <PrivetRoute><About></About></PrivetRoute>
            },
            {
                path: 'media',
                element: <PrivetRoute><Media></Media></PrivetRoute>
            },
            {
                path: 'signup',
                element: <SignUp></SignUp>
            }, 
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: '/posts/:id',
                loader: ({params})=> fetch(`https://sm-media-server.vercel.app/posts/${params.id}`),
                element: <SingelPost></SingelPost>
            },
        ]
    }
])

export default router;