// src/components/DashboardLayout.jsx
import React, { useState } from 'react';
import logo from '../img/TAB.gif';
import { 
  Home, Menu, Plane, Hotel, Car, CreditCard, Settings, 
  LogOut, Bell, Search, Calendar, MapPin, Users, 
  ChevronDown, LayoutDashboard, Bookmark 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import NavItem from './NavItem';

const DashboardLayout = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg ${isSidebarCollapsed ? 'w-20' : 'w-64'} transition-all duration-300`}>
        <div className="p-4 flex items-center justify-between border-b">
        <div className={`flex items-center ${isSidebarCollapsed ? 'hidden' : 'block'}`}>
            <img 
            src={logo} 
            alt="TAB"
            className="h-8 w-auto transition-transform duration-300 hover:scale-125"
            />
        </div>




          <button 
            onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu size={20} />
          </button>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            <NavItem icon={<LayoutDashboard size={20} />} text="Dashboard" active={true} collapsed={isSidebarCollapsed} />
            <NavItem icon={<Plane size={20} />} text="Flights" collapsed={isSidebarCollapsed} />
            <NavItem icon={<Hotel size={20} />} text="Hotels" collapsed={isSidebarCollapsed} />
            <NavItem icon={<Car size={20} />} text="Cars" collapsed={isSidebarCollapsed} />
            <NavItem icon={<Bookmark size={20} />} text="Saved" collapsed={isSidebarCollapsed} />
            <NavItem icon={<CreditCard size={20} />} text="Payments" collapsed={isSidebarCollapsed} />
            
            <div className="pt-4 mt-4 border-t">
              <NavItem icon={<Settings size={20} />} text="Settings" collapsed={isSidebarCollapsed} />
              <NavItem icon={<LogOut size={20} />} text="Logout" collapsed={isSidebarCollapsed} />
            </div>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2 w-96">
              <Search size={20} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search destinations, hotels, flights..."
                className="ml-2 bg-transparent border-none focus:outline-none w-full"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-2">
                <img
                  src="/api/placeholder/32/32"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-medium">Alex Morgan</span>
                <ChevronDown size={16} />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 overflow-auto h-[calc(100vh-73px)]">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-blue-500 text-white">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Book Flight</h3>
                  <p className="text-blue-100">Find best deals on flights</p>
                </div>
                <Plane className="w-8 h-8" />
              </CardContent>
            </Card>

            <Card className="bg-purple-500 text-white">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Book Hotel</h3>
                  <p className="text-purple-100">Find perfect accommodation</p>
                </div>
                <Hotel className="w-8 h-8" />
              </CardContent>
            </Card>

            <Card className="bg-green-500 text-white">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Rent Car</h3>
                  <p className="text-green-100">Best car rental deals</p>
                </div>
                <Car className="w-8 h-8" />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
