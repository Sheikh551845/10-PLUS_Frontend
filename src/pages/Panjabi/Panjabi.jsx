import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Panjabi = () => {
        const data=useLoaderData()
    console.log(data)
    return (
        <div>
            This is Panjabi
        </div>
    );
};

export default Panjabi;