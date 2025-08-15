import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Combo = () => {
        const data=useLoaderData()
    console.log(data)
    return (
        <div>
            This is Combo Page
        </div>
    );
};

export default Combo;