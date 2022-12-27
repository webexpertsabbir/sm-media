import About from "../Pages/About/About";
import Login from "../Pages/Login/Login";
import Media from "../Pages/Media/Media";
import SignUp from "../Pages/SignUp/SignUp";

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
                element: <Home></Home>
            },
            {
                path: 'About',
                element: <About></About>
            },
            {
                path: 'media',
                element: <Media></Media>
            },
            {
                path: 'signup',
                element: <SignUp></SignUp>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
        ]
    }
])

export default router;