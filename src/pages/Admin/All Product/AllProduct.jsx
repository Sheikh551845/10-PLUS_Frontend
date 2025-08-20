import React, { useState } from 'react';
import AdminT_shirt from '../Product_view/T-shirt/AdminT-shirt';
import AdminPolo from '../Product_view/Polo/AdminPolo';
import AdminPanjabi from '../Product_view/Panjabi/AdminPanjabi';
import AdminTrouser from '../Product_view/Trouser/AdminTrouser';
import AdminShirt from '../Product_view/shirt/AdminShirt';

const AllProduct = () => {
  const [activeTab, setActiveTab] = useState('T-shirt');

  const tabs = [
    { label: 'T-shirt', component: <AdminT_shirt /> },
    { label: 'Polo', component: <AdminPolo /> },
    { label: 'Panjabi', component: <AdminPanjabi /> },
    { label: 'Trouser', component: <AdminTrouser /> },
    { label: 'Shirt', component: <AdminShirt /> },
  ];

  return (
    <div className="w-full">
      
      {/* Tab Menu */}
      <div className="flex overflow-x-auto md:overflow-x-visible md:space-x-3  border-b border-gray-300">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`text-xs md:text-sm whitespace-nowrap px-2 py-1 md:px-4 md:py-2 rounded-t-lg font-semibold transition-colors duration-200
              ${activeTab === tab.label
                ? ' bg-[rgba(185,28,28,0.7)] text-white border-1'
                : 'bg-white text-[rgba(185,28,28,0.7)] hover:bg-gray-300 border-1'
              }`}
            onClick={() => setActiveTab(tab.label)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="w-full bg-white rounded-lg shadow-md p-1 md:p-2 min-h-[92vh]">
        {tabs.map(
          (tab) => activeTab === tab.label && (
            <div
              key={tab.label}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 w-full"
            >
              {tab.component}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AllProduct;
