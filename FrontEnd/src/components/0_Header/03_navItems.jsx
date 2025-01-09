import React, { useEffect, useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { useMobile } from '../../context/MobileContext';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

const menuItems = [
  { id: 1, name: 'Home', url: '', category: ['one', 'two', 'three'] },
  { id: 2, name: 'Movies', url: '', category: ['one', 'two', 'three'] },
  { id: 3, name: 'TV Shows', url: '', category: ['one', 'two', 'three'] },
  { id: 4, name: 'Videos', url: '', category: ['one', 'two', 'three'] },
];

function Sidebar({ onClose }) {
  const [expandedItem, setExpandedItem] = useState(null);

  const toggleCategory = (itemId) => {
    if (expandedItem === itemId) {
      setExpandedItem(null);
    } else {
      setExpandedItem(itemId);
    }
  };

  return (
    <div className="fixed top-0 left-0 h-full w-[300px] bg-white shadow-lg z-[60]">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold">Menu</h2>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <IoMdClose className="text-2xl" />
        </button>
      </div>
      <div className="p-4">
        {menuItems.map((item) => (
          <div key={item.id}>
            <div 
              className="py-3 px-2 hover:bg-gray-100 rounded-md cursor-pointer flex justify-between items-center"
              onClick={() => toggleCategory(item.id)}
            >
              <a href={item.url} className="text-gray-700 text-lg">
                {item.name}
              </a>
              {item.category && item.category.length > 0 && (
                expandedItem === item.id ? 
                  <AiOutlineMinus className="text-gray-600" /> : 
                  <AiOutlinePlus className="text-gray-600" />
              )}
            </div>
            {expandedItem === item.id && (
              <div className="ml-4">
                {item.category.map((cat, index) => (
                  <div
                    key={index}
                    className="py-2 px-2 hover:bg-gray-100 cursor-pointer text-gray-600"
                  >
                    {cat}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function MenuBar() {
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <div className='flex gap-6'>
      {menuItems.map((item) => (
        <div 
          className='relative flex items-center gap-1'
          key={item.id}
        >
          <a href={item.url}>{item.name}</a>
          <IoIosArrowDown 
            className='mt-1 text-sm'
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          />
          
          {hoveredItem === item.id && (
            <div className='absolute top-full left-0 bg-white shadow-md rounded-md p-2 z-50'>
              {item.category.map((cat, index) => (
                <div
                  key={index}
                  className='py-1 px-2 hover:bg-gray-100'
                >
                  {cat}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function NavItems({ isOpen, onClose }) {
  const { isMobile } = useMobile();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-[55]"
            onClick={onClose}
          />
          <Sidebar onClose={onClose} />
        </>
      )}
      {!isMobile && <MenuBar />}
    </>
  );
}

export default NavItems;
