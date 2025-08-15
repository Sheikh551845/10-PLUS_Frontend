import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Cuban_shirt = () => {
        const data=useLoaderData()
    console.log(data)
    return (
        <div>
            This is Cuban shirt
        </div>
    );
};

export default Cuban_shirt;