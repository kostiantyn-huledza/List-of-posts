import About from "../pages/About";
import Posts from "../pages/Posts";
import PostsIdPage from "../pages/PostsIdPage";
import Login from "../pages/Login";

export const privatesRoutes = [
    {path: '/about', element: <About/>},
    {path: '/posts', element: <Posts/>},
    {path: '/posts/:id', element: <PostsIdPage/>}
]

export const publicRoutes = [
    {path: '/login', element: <Login/>},
]