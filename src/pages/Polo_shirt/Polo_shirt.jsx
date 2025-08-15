import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Polo_shirt = () => {
        const data=useLoaderData()
    console.log(data)
    return (
        <div>
            This is Polo shirt
        </div>
    );
};

export default Polo_shirt;