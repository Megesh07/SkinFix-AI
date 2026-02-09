import React from 'react';
import { motion } from 'framer-motion';
import { User, Calendar, Clock, Settings, Activity, Bell } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { title: "Consultations", value: "12", icon: Calendar, color: "from-blue-500 to-teal-500" },
    { title: "Active Routines", value: "3", icon: Clock, color: "from-pink-500 to-rose-500" },
    { title: "Products Used", value: "8", icon: Activity, color: "from-purple-500 to-indigo-500" },
    { title: "Notifications", value: "5", icon: Bell, color: "from-amber-500 to-orange-500" }
  ];

  const recentActivities = [
    { title: "AI Consultation", time: "2 hours ago", type: "consultation" },
    { title: "Morning Routine Completed", time: "8 hours ago", type: "routine" },
    { title: "Purchased New Products", time: "1 day ago", type: "purchase" },
    { title: "Evening Routine Completed", time: "1 day ago", type: "routine" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, User!</h1>
            <p className="text-gray-600">Here's an overview of your skincare journey</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
              </div>
              <h3 className="text-gray-600">{stat.title}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-teal-500" />
                  <span className="font-medium">{activity.title}</span>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Skincare Progress</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Routine Consistency</span>
                <span className="font-medium">100%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full w-[85%] bg-gradient-to-r from-teal-500 to-blue-500 rounded-full" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Product Usage</span>
                <span className="font-medium">92%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full w-[92%] bg-gradient-to-r from-pink-500 to-rose-500 rounded-full" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}