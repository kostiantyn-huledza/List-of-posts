import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {privatesRoutes, publicRoutes} from "../routes/Routes";
import {AuthContext} from "../context/AuthContext";
import Loader from "./UI/Loader/Loader";

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext);

    if (isLoading) {
        return <Loader/>
    }

    return (
        <div>
            {isAuth
                ?
                <Routes>
                    {privatesRoutes.map(route =>
                        <Route
                            path={route.path}
                            element={route.element}
                            key={route.path}
                        />
                    )}
                    <Route path='/*' element={<Navigate to={'/posts'}/>}/>
                </Routes>
                :
                <Routes>
                    {publicRoutes.map(route =>
                        <Route
                            path={route.path}
                            element={route.element}
                            key={route.path}
                        />
                    )}
                    <Route path='/*' element={<Navigate to={'/login'}/>}/>
                </Routes>
            }
        </div>
    );
};

export default AppRouter;