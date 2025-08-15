import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Trouser = () => {
        const data=useLoaderData()
    console.log(data)
    return (
        <div>
            This is trouser Page 
        </div>
    );
};

export default Trouser;