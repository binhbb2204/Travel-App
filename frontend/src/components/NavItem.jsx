// src/components/NavItem.jsx
import React from 'react';

const NavItem = ({ icon, text, active = false, collapsed = false }) => (
  <li>
    <a
      href="#"
      className={`flex items-center space-x-2 p-2 rounded-lg transition-all duration-200 cursor-pointer hover:bg-gray-100 ${
        active ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
      }`}
    >
      {icon}
      {!collapsed && <span className="transition-all duration-200 hover:font-semibold">{text}</span>}
    </a>
  </li>
);

export default NavItem;
