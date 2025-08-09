import React from 'react';
import Admin_Drop_shoulder from './Drop Shoulder/Drop_shoulder';
import Admin_V_neck from './V Neck/V_neck';
import Admin_Turtle_neck from './Turtle Neck/Turtle_neck';
import Admin_Polo from './Polo/Polo';
import Admin_Pocket from './Pocket/Pocket';

const T_shirt = () => {
    return (

        <div className="tabs tabs-box">
            <input type="radio" name="my_tabs_6" className="tab" aria-label="Drop Shoulder" />
            <div className="tab-content bg-base-100 border-base-300 p-6 w-full min-h-screen"><Admin_Drop_shoulder></Admin_Drop_shoulder></div>

            <input type="radio" name="my_tabs_6" className="tab" aria-label="V Neck" defaultChecked />
            <div className="tab-content bg-base-100 border-base-300 p-6  w-full min-h-screen"><Admin_V_neck></Admin_V_neck></div>

            <input type="radio" name="my_tabs_6" className="tab" aria-label="Turtle Neck" />
            <div className="tab-content bg-base-100 border-base-300 p-6  w-full min-h-screen"><Admin_Turtle_neck></Admin_Turtle_neck> </div>

            <input type="radio" name="my_tabs_6" className="tab" aria-label="Polo" />
            <div className="tab-content bg-base-100 border-base-300 p-6  w-full min-h-screen"><Admin_Polo></Admin_Polo> </div>

            <input type="radio" name="my_tabs_6" className="tab" aria-label="Pocket" />
            <div className="tab-content bg-base-100 border-base-300 p-6  w-full min-h-screen"><Admin_Pocket></Admin_Pocket></div>
        </div>
    );
};

export default T_shirt;