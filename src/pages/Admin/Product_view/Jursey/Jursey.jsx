import React from 'react';
import Admin_Basic_Jursey from './Basic Jursey/Basic_Jursey';
import Admin_Club_Jursey from './Club Jursey/Club_Jursey';

const Jursey = () => {
    return (
        <div className="tabs tabs-box">
            <input type="radio" name="my_tabs_6" className="tab" aria-label="Club Jursey" />
            <div className="tab-content bg-base-100 border-base-300 p-6 w-full min-h-screen"><Admin_Club_Jursey></Admin_Club_Jursey></div>

            <input type="radio" name="my_tabs_6" className="tab" aria-label="Basic Jursey" defaultChecked />
            <div className="tab-content bg-base-100 border-base-300 p-6  w-full min-h-screen"><Admin_Basic_Jursey></Admin_Basic_Jursey></div>

        </div>
    );
};

export default Jursey;