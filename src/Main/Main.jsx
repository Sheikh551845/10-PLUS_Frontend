import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const Main = () => {
    return (
        <div className='' >
            <div className='h-[64px]'>
             <Navbar ></Navbar>
            </div>
            
            <div className='min-h-[80vh]'>
                    <Outlet ></Outlet>
            </div>
            <div>
              <Footer></Footer>
            </div>
            
            
        </div>
    );
};

export default Main;