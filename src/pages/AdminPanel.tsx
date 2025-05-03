import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import MusicManager from "@/components/admin/MusicManager";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import {
  Users,
  FileText,
  Image,
  Music,
  BarChart2,
  Settings
} from "lucide-react";
import ImageManager from "@/components/admin/ImageManager";
import DashboardStats from "@/components/admin/DashboardStats";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <Card className="p-1">
            <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 w-full">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <BarChart2 className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Users</span>
              </TabsTrigger>
              <TabsTrigger value="templates" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Templates</span>
              </TabsTrigger>
              <TabsTrigger value="images" className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                <span className="hidden sm:inline">Images</span>
              </TabsTrigger>
              <TabsTrigger value="music" className="flex items-center gap-2">
                <Music className="h-4 w-4" />
                <span className="hidden sm:inline">Music</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Settings</span>
              </TabsTrigger>
            </TabsList>
          </Card>
          
          <TabsContent value="dashboard" className="space-y-6">
            <DashboardStats />
          </TabsContent>
          
          <TabsContent value="users">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Manajemen Pengguna</h2>
              <p className="text-gray-500">Fitur manajemen pengguna akan segera hadir.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="templates">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Manajemen Template</h2>
              <p className="text-gray-500">Fitur manajemen template akan segera hadir.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="images">
            <div className="bg-white p-6 rounded-lg shadow">
              <ImageManager />
            </div>
          </TabsContent>
          
          <TabsContent value="music">
            <div className="bg-white p-6 rounded-lg shadow">
              <MusicManager />
            </div>
          </TabsContent>
          
          <TabsContent value="settings">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Pengaturan Sistem</h2>
              <p className="text-gray-500">Pengaturan sistem akan segera hadir.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPanel;
