import React, { useEffect, useState } from 'react';

const menuItems = [
  { id: 1, name: 'Home', url: '' },
  { id: 2, name: 'Movies', url: '' },
  { id: 3, name: 'TV Shows', url: '' },
  { id: 4, name: 'Videos', url: '' },
];

function Sidebar() {
  return (
    <div>
      {menuItems.map((item) => (
        <div key={item.id}>
          <a href={item.url}>{item.name}</a>
        </div>
      ))}
    </div>
  );
}

function MenuBar() {
  return (
    <div>
     {menuItems.map((item) => (
        <div key={item.id}>
          <a href={item.url}>{item.name}</a>
        </div>
      ))}
    </div>
  );
}

function NavItems({isOpen}) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      {isOpen && <Sidebar />}
      {!isMobile && <MenuBar />}
    </div>
  );
}

export default NavItems;
