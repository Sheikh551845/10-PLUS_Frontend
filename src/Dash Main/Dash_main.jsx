import React from 'react';
import Dash_nav from '../Components/Dash Componets/Dash_nav';
import { Outlet } from 'react-router-dom';

const Dash_main = () => {
    return (
        <div className="flex">
            <div className="w-[20vw]">
                <Dash_nav />
            </div>
            <div className="w-[80vw]">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dash_main;