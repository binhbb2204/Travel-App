// page/admin/OverviewPanel.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Users, Map, CreditCard, Activity } from 'lucide-react';

const OverviewPanel = ({ stats, revenueData, recentBookings }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Users', value: stats.totalUsers, icon: Users, trend: 'up', percent: '8.2%' },
          { title: 'Active Bookings', value: stats.activeBookings, icon: Map, trend: 'up', percent: '12.5%' },
          { title: 'Total Revenue', value: `$${stats.totalRevenue}`, icon: CreditCard, trend: 'up', percent: '15.3%' },
          { title: 'Pending Bookings', value: stats.pendingBookings, icon: Activity, trend: 'down', percent: '4.1%' }
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-4 bg-gradient-to-r from-white to-gray-50">
              <div className="text-sm font-medium text-gray-600 flex justify-between items-center">
                {stat.title}
                <stat.icon className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="p-4">
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
              <div className="flex items-center mt-2 text-sm">
                {stat.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                )}
                <span className={stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                  {stat.percent}
                </span>
                <span className="text-gray-500 ml-1">vs last month</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm lg:col-span-2">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Revenue Overview</h2>
          </div>
          <div className="p-4 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={{ fill: '#2563eb' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {[
                { text: 'New booking: Paris Adventure', time: '2 minutes ago' },
                { text: 'Payment received: $2,300', time: '15 minutes ago' },
                { text: 'New user registration', time: '1 hour ago' },
                { text: 'Tour package updated', time: '2 hours ago' }
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{activity.text}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b bg-gradient-to-r from-white to-gray-50">
          <h2 className="text-lg font-semibold">Recent Bookings</h2>
        </div>
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 text-sm font-medium text-gray-600">ID</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600">User</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600">Tour</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600">Status</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600">Amount</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 text-sm text-gray-800">{booking.id}</td>
                    <td className="p-4 text-sm text-gray-800">{booking.user}</td>
                    <td className="p-4 text-sm text-gray-800">{booking.tour}</td>
                    <td
                      className={`p-4 text-sm ${
                        booking.status === 'Confirmed' ? 'text-green-500' : 'text-yellow-500'
                      }`}
                    >
                      {booking.status}
                    </td>
                    <td className="p-4 text-sm text-gray-800">${booking.amount}</td>
                    <td className="p-4 text-sm text-gray-800">{booking.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPanel;
