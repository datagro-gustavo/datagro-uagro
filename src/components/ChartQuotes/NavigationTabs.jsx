'use client'

import React from 'react';

const mainTabs = ['General', 'Chart', 'News & Analysis', 'Technical', 'Forum'];
const subTabs = ['Overview', 'Components', 'Historical Data', 'Related Instruments'];

export const NavigationTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="border-b border-gray-200 bg-white">
      {/* MAIN TABS */}
      <div className="flex items-center gap-0 px-4">
        {mainTabs.map((tab) => {
          const isActive = activeTab === tab;

          return (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`
                py-3 px-4 rounded-none text-sm font-medium transition-colors border-b-2
                ${
                  isActive
                    ? 'text-black border-blue-600 bg-white'
                    : 'text-gray-600 border-transparent hover:text-black hover:bg-gray-100'
                }
              `}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* SUB TABS */}
      <div className="flex items-center gap-4 px-4 py-2 bg-gray-50">
        {subTabs.map((tab, index) => (
          <a
            key={tab}
            href="#"
            className={`
              text-sm transition-colors
              ${
                index === 0
                  ? 'text-black font-medium'
                  : 'text-gray-500 hover:text-black'
              }
            `}
          >
            {tab}
          </a>
        ))}
      </div>
    </div>
  );
};
