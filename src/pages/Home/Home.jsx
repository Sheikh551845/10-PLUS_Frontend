import React, { useState } from 'react';
import Banner from './Banner';
import New_arrival from './New_arrival';
import demonData from '../../assets/json/demon.json';
import { Helmet } from 'react-helmet-async';
import Populer from './Populer';
import Offers from './Offers';
import Combo from './Combo';
import Why from './Why';
import StoreSection from './StoreSection';


const Home = () => {
    const [data, setData] = useState(demonData);
    let Banner_data = [];

    const New_arrival1 = data.filter(product => product.New_arrival === true).slice(0, 6);

    if (New_arrival1.length >= 4) {
        Banner_data = New_arrival1;
    } else {
        Banner_data = data.slice(0, 6);
    }

    return (
        <div className=''>
            <Helmet>
                <title>10 PLUS|Home</title>
            </Helmet>
            <div>
                <Banner product={Banner_data}></Banner>
            </div>
            <Populer></Populer>
            <New_arrival></New_arrival>
            <Offers></Offers>
            <Combo></Combo>
            <Why></Why>
            <StoreSection></StoreSection>
        </div>
    );
};

export default Home;

