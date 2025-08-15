import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Toaster } from 'react-hot-toast';
import AuthProvider from '../AuthPorvider';

const Main = () => {
    return (
        <AuthProvider>

            <div className='h-[64px]'>
                <Navbar ></Navbar>
            </div>

            <div className='min-h-[80vh] mb-10'>
                <Outlet ></Outlet>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
            </div>
            
            <div>
                <Footer></Footer>
            </div>

        </AuthProvider>
        
    );
};

export default Main;