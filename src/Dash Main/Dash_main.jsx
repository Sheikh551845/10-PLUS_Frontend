import React from 'react';
import Dash_nav from '../Components/Dash Componets/Dash_nav';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AuthProvider from '../AuthPorvider';

const Dash_main = () => {
    return (
        <AuthProvider>
            <div className="flex w-full ">
                <div className="w-[16vw] md:w-[11vw]">
                    <Dash_nav />
                </div>
                <div className=" w-[84vw] md:w-[89vw] ">
                    <Outlet className="w-full"></Outlet>
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