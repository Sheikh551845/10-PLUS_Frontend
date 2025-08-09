import React from 'react';
import { useParams } from 'react-router-dom';

const Product_details = () => {
    const id=useParams()

    return (
        <div>
            This is Product details for {`${id.id}`}
        </div>
    );
};

export default Product_details;