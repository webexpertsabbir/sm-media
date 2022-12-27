import About from "../Pages/About/About";
import Media from "../Pages/Media/Media";

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
            }
        ]
    }
])

export default router;