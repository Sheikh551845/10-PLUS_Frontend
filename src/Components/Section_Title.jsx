import React from 'react';

const Section_Title = (Title) => {
    return (
        <div className="my-3 max-w-fit mx-auto">


            <div>
                <div className="h-[2px]  mx-auto bg-gradient-to-r from-transparent via-[rgba(185,28,28,0.7)] to-transparent"></div>
                <p className="text-ld md:text-2xl font-bold text-[rgba(185,28,28,0.7)]">~~~{Title.Title}~~~</p>
                <div className="h-[2px]  mx-auto bg-gradient-to-r from-transparent via-[rgba(185,28,28,0.7)] to-transparent mb-10"></div>
            </div>

        </div>
    );
};

export default Section_Title
