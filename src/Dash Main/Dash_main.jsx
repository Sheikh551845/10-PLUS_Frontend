import React from 'react';
import Dash_nav from '../Components/Dash Componets/Dash_nav';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AuthProvider from '../AuthPorvider';

const Dash_main = () => {
    return (
        <AuthProvider>
            <div className="flex">
                <div className="w-[20vw]">
                    <Dash_nav />
                </div>
                <div className="w-[80vw]">
                    <Outlet></Outlet>
                    <Toaster
                        position="top-center"
                        reverseOrder={false}
                    />
                </div>
            </div>
        </AuthProvider>

    );
};

export default Dash_main;