import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  Users,
  CreditCard,
  Mail,
  Check,
  X,
  Edit,
  Trash2,
  Eye,
  Loader2,
  MusicIcon,
  LineChart,
  Settings,
  ImageIcon
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import MusicManager from "@/components/admin/MusicManager";
import ImageManager from "@/components/admin/ImageManager";

interface User {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  created_at: string;
}

interface Profile {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  created_at: string;
}

interface Subscription {
  id: string;
  user_id: string;
  plan_id: string;
  status: string;
  current_period_start: string;
  current_period_end: string;
  created_at: string;
  user_email?: string;
  user_name?: string;
}

interface Invitation {
  id: string;
  title: string;
  template_id: string;
  bride_name: string;
  groom_name: string;
  created_at: string;
  active: boolean;
  user_id: string;
  user_email?: string;
  slug?: string;
}

const AdminPanel = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);
  
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  const [selectedInvitation, setSelectedInvitation] = useState<Invitation | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [dashboard, setDashboard] = useState({
    totalUsers: 0,
    totalInvitations: 0,
    activeInvitations: 0
  });
  
  // Check if user is admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        setAdminLoading(false);
        return;
      }

      try {
        // Check if user has admin role
        const { data, error } = await supabase
          .from("roles")
          .select("*")
          .eq("user_id", user.id)
          .eq("role", "admin")
          .single();

        setIsAdmin(!!data);
      } catch (error: any) {
        console.error("Error checking admin status:", error.message);
        toast.error("Failed to verify admin privileges");
      } finally {
        setAdminLoading(false);
      }
    };

    checkAdminStatus();
  }, [user]);

  // Apply smooth scrolling to the whole page
  useEffect(() => {
    // Add smooth scrolling to html element
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      // Reset scroll behavior when component unmounts
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  // Fetch data for admin dashboard
  useEffect(() => {
    const fetchAdminData = async () => {
      if (!isAdmin) return;
      
      setLoadingData(true);
      try {
        // Fetch users/profiles
        const { data: profilesData, error: profilesError } = await supabase
          .from("profiles")
          .select("*")
          .order("created_at", { ascending: false });
        
        if (profilesError) throw profilesError;
        setProfiles(profilesData || []);
        
        // Update dashboard stats
        setDashboard(prev => ({
          ...prev,
          totalUsers: profilesData?.length || 0
        }));

        // Fetch subscriptions with user info
        const { data: subsData, error: subsError } = await supabase
          .from("subscriptions")
          .select("*")
          .order("created_at", { ascending: false });
        
        if (subsError) throw subsError;
        
        // Add user info to subscriptions
        const enhancedSubs = await Promise.all((subsData || []).map(async (sub) => {
          const { data: userData } = await supabase
            .from("profiles")
            .select("email, first_name, last_name")
            .eq("id", sub.user_id)
            .single();
          
          return {
            ...sub,
            user_email: userData?.email || "Unknown",
            user_name: userData?.first_name && userData?.last_name 
              ? `${userData.first_name} ${userData.last_name}`
              : "Unknown User"
          };
        }));
        
        setSubscriptions(enhancedSubs);

        // Fetch invitations with user info
        const { data: invitationsData, error: invitationsError } = await supabase
          .from("invitations")
          .select("*")
          .order("created_at", { ascending: false });
        
        if (invitationsError) throw invitationsError;
        
        // Add user info to invitations
        const enhancedInvitations = await Promise.all((invitationsData || []).map(async (invitation) => {
          const { data: userData } = await supabase
            .from("profiles")
            .select("email")
            .eq("id", invitation.user_id)
            .single();
          
          return {
            ...invitation,
            user_email: userData?.email || "Unknown"
          };
        }));
        
        setInvitations(enhancedInvitations);
        
        // Update dashboard stats
        setDashboard(prev => ({
          ...prev,
          totalInvitations: enhancedInvitations.length || 0,
          activeInvitations: enhancedInvitations.filter(inv => inv.active).length || 0
        }));
      } catch (error: any) {
        console.error("Error fetching admin data:", error.message);
        toast.error("Failed to load admin data");
      } finally {
        setLoadingData(false);
      }
    };

    fetchAdminData();
  }, [isAdmin]);

  const toggleInvitationStatus = async (invitation: Invitation) => {
    try {
      const { error } = await supabase
        .from("invitations")
        .update({ active: !invitation.active })
        .eq("id", invitation.id);
      
      if (error) throw error;
      
      // Update local state
      setInvitations(invitations.map(inv => 
        inv.id === invitation.id ? { ...inv, active: !inv.active } : inv
      ));
      
      // Update dashboard stats
      setDashboard(prev => ({
        ...prev,
        activeInvitations: invitation.active 
          ? prev.activeInvitations - 1 
          : prev.activeInvitations + 1
      }));
      
      toast.success(`Invitation ${invitation.active ? "disabled" : "activated"} successfully`);
    } catch (error: any) {
      console.error("Error updating invitation status:", error.message);
      toast.error("Failed to update invitation status");
    }
  };

  const viewInvitationDetails = (invitation: Invitation) => {
    setSelectedInvitation(invitation);
    setViewDialogOpen(true);
  };

  if (isLoading || adminLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-wedding-ivory">
        <Loader2 className="h-12 w-12 animate-spin text-wedding-rosegold" />
        <p className="mt-4 text-gray-600">Loading admin panel...</p>
      </div>
    );
  }

  if (!user) {
    navigate("/auth/login");
    return null;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col bg-wedding-ivory">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center p-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-4 text-gray-800"
          >
            Access Denied
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-gray-600 mb-6 text-center"
          >
            You don't have permission to access the admin panel.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Button asChild>
              <a href="/" className="bg-wedding-rosegold hover:bg-wedding-deep-rosegold text-white">
                <ChevronLeft size={16} className="mr-1" />
                Back to Home
              </a>
            </Button>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-wedding-ivory">
      <Navbar />
      <main className="flex-grow py-8">
        <motion.div 
          className="container mx-auto px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
              <p className="text-gray-600">Manage your wedding platform from here</p>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setSheetOpen(true)}
                className="border-wedding-sage text-wedding-sage hover:bg-wedding-sage/10"
              >
                <Settings size={16} className="mr-1" />
                Settings
              </Button>
              
              <Button
                variant="outline"
                className="border-wedding-rosegold text-wedding-rosegold hover:bg-wedding-light-blush"
                asChild
              >
                <a href="/">
                  <ChevronLeft size={16} className="mr-1" />
                  Back to Home
                </a>
              </Button>
            </div>
          </div>

          {/* Dashboard Stats */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-blue-600 font-medium">Total Users</p>
                  <h3 className="text-2xl font-bold mt-1">{dashboard.totalUsers}</h3>
                </div>
                <div className="bg-blue-100 p-2 rounded-full">
                  <Users className="text-blue-500" size={20} />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-green-600 font-medium">Active Invitations</p>
                  <h3 className="text-2xl font-bold mt-1">{dashboard.activeInvitations}</h3>
                </div>
                <div className="bg-green-100 p-2 rounded-full">
                  <Mail className="text-green-500" size={20} />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-purple-600 font-medium">Total Invitations</p>
                  <h3 className="text-2xl font-bold mt-1">{dashboard.totalInvitations}</h3>
                </div>
                <div className="bg-purple-100 p-2 rounded-full">
                  <LineChart className="text-purple-500" size={20} />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Tabs defaultValue="invitations" className="space-y-6">
              <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-5 h-auto">
                <TabsTrigger value="invitations" className="px-4 py-2">
                  <Mail size={16} className="mr-2" /> Invitations
                </TabsTrigger>
                <TabsTrigger value="users" className="px-4 py-2">
                  <Users size={16} className="mr-2" /> Users
                </TabsTrigger>
                <TabsTrigger value="subscriptions" className="px-4 py-2">
                  <CreditCard size={16} className="mr-2" /> Subscriptions
                </TabsTrigger>
                <TabsTrigger value="music" className="px-4 py-2">
                  <MusicIcon size={16} className="mr-2" /> Music
                </TabsTrigger>
                <TabsTrigger value="images" className="px-4 py-2">
                  <ImageIcon size={16} className="mr-2" /> Images
                </TabsTrigger>
              </TabsList>

              {/* Invitations Tab */}
              <TabsContent value="invitations" className="space-y-4">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Manage Invitations</h2>
                  {
                  loadingData ? (
                    <div className="flex justify-center p-8">
                      <Loader2 className="h-8 w-8 animate-spin text-wedding-rosegold" />
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Couple</TableHead>
                            <TableHead>Template</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {invitations.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                                No invitations found
                              </TableCell>
                            </TableRow>
                          ) : (
                            invitations.map((invitation) => (
                              <TableRow key={invitation.id}>
                                <TableCell>{invitation.title}</TableCell>
                                <TableCell>{`${invitation.bride_name} & ${invitation.groom_name}`}</TableCell>
                                <TableCell>{invitation.template_id}</TableCell>
                                <TableCell>
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    invitation.active
                                      ? 'bg-green-100 text-green-800'
                                      : 'bg-red-100 text-red-800'
                                  }`}>
                                    {invitation.active ? 'Active' : 'Inactive'}
                                  </span>
                                </TableCell>
                                <TableCell>{invitation.user_email}</TableCell>
                                <TableCell>
                                  {new Date(invitation.created_at).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="text-right space-x-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-gray-500 hover:text-gray-700"
                                    onClick={() => viewInvitationDetails(invitation)}
                                  >
                                    <Eye size={16} />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className={invitation.active ? "text-red-500 hover:text-red-700" : "text-green-500 hover:text-green-700"}
                                    onClick={() => toggleInvitationStatus(invitation)}
                                  >
                                    {invitation.active ? <X size={16} /> : <Check size={16} />}
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  )
                }
                </div>
              </TabsContent>

              {/* Users Tab */}
              <TabsContent value="users" className="space-y-4">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
                  {
                  loadingData ? (
                    <div className="flex justify-center p-8">
                      <Loader2 className="h-8 w-8 animate-spin text-wedding-rosegold" />
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Joined</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {profiles.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                                No users found
                              </TableCell>
                            </TableRow>
                          ) : (
                            profiles.map((profile) => (
                              <TableRow key={profile.id}>
                                <TableCell>
                                  {profile.first_name && profile.last_name
                                    ? `${profile.first_name} ${profile.last_name}`
                                    : "N/A"}
                                </TableCell>
                                <TableCell>{profile.email || "N/A"}</TableCell>
                                <TableCell>
                                  {new Date(profile.created_at).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-gray-500 hover:text-gray-700"
                                    onClick={() => toast.info("User details functionality coming soon")}
                                  >
                                    <Eye size={16} />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  )
                }
                </div>
              </TabsContent>

              {/* Subscriptions Tab */}
              <TabsContent value="subscriptions" className="space-y-4">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Monitor Subscriptions</h2>
                  {
                  loadingData ? (
                    <div className="flex justify-center p-8">
                      <Loader2 className="h-8 w-8 animate-spin text-wedding-rosegold" />
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Plan</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>End Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {subscriptions.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                                No subscriptions found
                              </TableCell>
                            </TableRow>
                          ) : (
                            subscriptions.map((subscription) => (
                              <TableRow key={subscription.id}>
                                <TableCell>{subscription.user_name || "Unknown"}</TableCell>
                                <TableCell>{subscription.user_email || "Unknown"}</TableCell>
                                <TableCell>
                                  <span className="capitalize">{subscription.plan_id}</span>
                                </TableCell>
                                <TableCell>
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    subscription.status === 'active'
                                      ? 'bg-green-100 text-green-800'
                                      : subscription.status === 'trial'
                                      ? 'bg-blue-100 text-blue-800'
                                      : 'bg-red-100 text-red-800'
                                  }`}>
                                    {subscription.status}
                                  </span>
                                </TableCell>
                                <TableCell>
                                  {new Date(subscription.current_period_end).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-gray-500 hover:text-gray-700"
                                    onClick={() => toast.info("Subscription management coming soon")}
                                  >
                                    <Eye size={16} />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  )
                }
                </div>
              </TabsContent>

              {/* Music Tab */}
              <TabsContent value="music" className="space-y-4">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <MusicManager />
                </div>
              </TabsContent>
              
              {/* Images Tab */}
              <TabsContent value="images" className="space-y-4">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <ImageManager />
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </main>
      <Footer />

      {/* View Invitation Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Invitation Details</DialogTitle>
            <DialogDescription>
              View detailed information about this invitation.
            </DialogDescription>
          </DialogHeader>

          {selectedInvitation && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-700">Title</h3>
                  <p>{selectedInvitation.title}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Status</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    selectedInvitation.active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {selectedInvitation.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Couple</h3>
                  <p>{`${selectedInvitation.bride_name} & ${selectedInvitation.groom_name}`}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Template</h3>
                  <p>{selectedInvitation.template_id}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">User</h3>
                  <p>{selectedInvitation.user_email}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Created</h3>
                  <p>{new Date(selectedInvitation.created_at).toLocaleString()}</p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <Button
                  variant="outline"
                  className="mr-2"
                  onClick={() => setViewDialogOpen(false)}
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    // If slug exists, use it; otherwise use id
                    const path = selectedInvitation.slug 
                      ? `/invitation/${selectedInvitation.slug}`
                      : `/invitation/${selectedInvitation.id}`;
                    window.open(path, '_blank');
                  }}
                  className="bg-wedding-rosegold hover:bg-wedding-deep-rosegold text-white"
                >
                  View Invitation
                </Button>
                <Button
                  variant={selectedInvitation.active ? "destructive" : "default"}
                  className={`ml-2 ${selectedInvitation.active ? "" : "bg-green-600 hover:bg-green-700"}`}
                  onClick={() => {
                    toggleInvitationStatus(selectedInvitation);
                    setViewDialogOpen(false);
                  }}
                >
                  {selectedInvitation.active ? "Deactivate" : "Activate"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Settings Sidebar */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        
        <SheetContent className="w-full sm:max-w-md bg-wedding-ivory">
          <SheetHeader className="pb-4">
            <SheetTitle>Admin Settings</SheetTitle>
            <SheetDescription>
              Configure your admin panel and system settings.
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-6">
            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <h3 className="font-medium text-lg mb-3">System Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-gray-600">Version</span>
                  <span className="font-medium">1.0.0</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-gray-600">Database Status</span>
                  <span className="text-green-600 font-medium">Connected</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-gray-600">Storage</span>
                  <span className="font-medium">Supabase</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Update</span>
                  <span className="font-medium">{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <h3 className="font-medium text-lg mb-3">Currently Logged In As</h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-wedding-rosegold rounded-full flex items-center justify-center text-white font-medium">
                  A
                </div>
                <div>
                  <p className="font-medium">Admin</p>
                  <p className="text-xs text-gray-500">admin@admin.com</p>
                </div>
              </div>
            </div>
            
            <div className="pt-4 flex justify-end">
              <SheetClose asChild>
                <Button>Close Settings</Button>
              </SheetClose>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminPanel;
