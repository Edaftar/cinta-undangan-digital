
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { templates } from '@/data/templates';
import { formatDistance } from 'date-fns';
import { Loader2, PlusCircle, Copy, BarChart2, Edit, EyeIcon, Share2, Toggle, User } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import GuestList from '@/components/GuestList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Helper function to generate a random string for slug
const generateRandomString = (length: number): string => {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

interface Invitation {
  id: string;
  title: string;
  slug: string;
  template_id: string;
  active: boolean;
  user_id: string;
  created_at: string;
  bride_name: string;
  groom_name: string;
  location: string;
  main_date: string;
}

const Dashboard = () => {
  const { user, isAdmin } = useAuth();
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [templateId, setTemplateId] = useState('elegant-1');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentInvitation, setCurrentInvitation] = useState<Invitation | null>(null);
  const [activeTab, setActiveTab] = useState('invitations');

  useEffect(() => {
    if (user) {
      fetchInvitations();
    }
  }, [user]);

  const fetchInvitations = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('invitations')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setInvitations(data || []);
    } catch (error: any) {
      console.error('Error fetching invitations:', error);
      toast.error('Failed to load invitations');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateInvitation = async () => {
    if (!user) return;

    setIsSubmitting(true);
    try {
      // Generate a random slug if it's empty
      const finalSlug = slug || generateRandomString(8);

      // Include all required fields based on the Supabase schema
      const { data, error } = await supabase
        .from('invitations')
        .insert({
          user_id: user.id, 
          title, 
          slug: finalSlug,
          template_id: templateId,
          active: true,
          bride_name: "Bride Name", // Default value for required field
          groom_name: "Groom Name", // Default value for required field
          location: "Wedding Location", // Default value for required field
          main_date: new Date().toISOString(), // Default value for required field
        });

      if (error) throw error;

      // Optimistically update the invitations list
      const newInvitation: Invitation = {
        id: generateRandomString(10), // Use a temporary ID since data might be null
        user_id: user.id, 
        title, 
        slug: finalSlug,
        template_id: templateId,
        active: true,
        bride_name: "Bride Name",
        groom_name: "Groom Name",
        location: "Wedding Location",
        main_date: new Date().toISOString(),
        created_at: new Date().toISOString(),
      };
      
      setInvitations(prevInvitations => [newInvitation, ...prevInvitations]);

      toast.success("Invitation created successfully!");
      setOpen(false); // Close the dialog
      setTitle(''); // Reset the title
      setSlug(''); // Reset the slug
    } catch (error: any) {
      console.error("Error creating invitation:", error);
      toast.error("Failed to create invitation.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyToClipboard = (slug: string) => {
    const invitationLink = `${window.location.origin}/invitation/${slug}`;
    navigator.clipboard.writeText(invitationLink)
      .then(() => {
        toast.success("Link copied to clipboard!");
      })
      .catch(err => {
        console.error("Could not copy text: ", err);
        toast.error("Failed to copy link to clipboard.");
      });
  };

  const toggleInvitationStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('invitations')
        .update({ active: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      // Optimistically update the invitations list
      setInvitations(prevInvitations =>
        prevInvitations.map(invitation =>
          invitation.id === id ? { ...invitation, active: !currentStatus } : invitation
        )
      );

      toast.success(`Invitation ${!currentStatus ? 'activated' : 'deactivated'}!`);
    } catch (error: any) {
      console.error("Error updating invitation status:", error);
      toast.error("Failed to update invitation status.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-wedding-ivory">
        <Loader2 className="h-12 w-12 animate-spin text-wedding-rosegold" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-wedding-ivory">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-gray-600">Manage your wedding invitations and guests</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex gap-2">
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-wedding-rosegold hover:bg-wedding-deep-rosegold text-white">
                    <PlusCircle className="h-4 w-4 mr-2" /> 
                    Create Invitation
                  </Button>
                </DialogTrigger>
                
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Create New Invitation</DialogTitle>
                    <DialogDescription>
                      Create a new digital wedding invitation. You can customize all details later.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <label htmlFor="title">Invitation Title</label>
                      <Input 
                        id="title"
                        placeholder="Our Wedding"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <label htmlFor="slug">Custom URL (optional)</label>
                      <div className="flex gap-2 items-center">
                        <span className="text-sm text-gray-500">{window.location.origin}/invitation/</span>
                        <Input 
                          id="slug"
                          placeholder="our-wedding"
                          value={slug}
                          onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                          className="flex-1"
                        />
                      </div>
                      <p className="text-xs text-gray-500">Leave empty to generate a random URL</p>
                    </div>
                    
                    <div className="grid gap-2">
                      <label htmlFor="template">Template</label>
                      <Select value={templateId} onValueChange={setTemplateId}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select template" />
                        </SelectTrigger>
                        <SelectContent>
                          {templates.map((template) => (
                            <SelectItem key={template.id} value={template.id}>
                              {template.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button 
                      variant="outline"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      className="bg-wedding-rosegold hover:bg-wedding-deep-rosegold"
                      onClick={handleCreateInvitation}
                      disabled={isSubmitting || !title.trim()}
                    >
                      {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                      Create Invitation
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Button asChild variant="outline" className="border-wedding-sage text-wedding-sage">
                <Link to="/profile">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Link>
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="invitations" value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList>
              <TabsTrigger value="invitations">My Invitations</TabsTrigger>
              {currentInvitation && (
                <TabsTrigger value="guests">Guest List</TabsTrigger>
              )}
            </TabsList>
            <TabsContent value="invitations">
              {loading ? (
                <div className="flex justify-center p-12">
                  <Loader2 className="h-8 w-8 animate-spin text-wedding-rosegold" />
                </div>
              ) : invitations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {invitations.map((invitation) => {
                    const template = templates.find(t => t.id === invitation.template_id) || templates[0];
                    return (
                      <Card key={invitation.id} className="overflow-hidden">
                        <div className="aspect-[16/9] bg-gray-100 overflow-hidden">
                          <img 
                            src={template.image} 
                            alt={template.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-xl">{invitation.title}</CardTitle>
                              <CardDescription>{template.name}</CardDescription>
                            </div>
                            <Badge 
                              variant={invitation.active ? "default" : "outline"}
                              className={invitation.active ? "bg-green-500" : ""}
                            >
                              {invitation.active ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="pb-4">
                          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                            <p>Created: {format(new Date(invitation.created_at), 'MMM d, yyyy')}</p>
                          </div>
                          
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <p>URL: {window.location.origin}/invitation/{invitation.slug}</p>
                            <button 
                              onClick={() => handleCopyToClipboard(invitation.slug)}
                              className="text-wedding-rosegold hover:text-wedding-deep-rosegold"
                            >
                              <Copy size={14} />
                            </button>
                          </div>
                        </CardContent>
                        
                        <CardFooter className="border-t pt-4 flex flex-wrap gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            asChild
                          >
                            <Link to={`/invitation/${invitation.slug}`} target="_blank">
                              <EyeIcon className="h-4 w-4 mr-1" />
                              Preview
                            </Link>
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            asChild
                          >
                            <Link to={`/create/${invitation.template_id}`} state={{ invitationId: invitation.id }}>
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Link>
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => {
                              setCurrentInvitation(invitation);
                              setActiveTab("guests");
                            }}
                          >
                            <User className="h-4 w-4 mr-1" />
                            Guests
                          </Button>
                          
                          <Button
                            variant={invitation.active ? "destructive" : "default"}
                            size="sm"
                            className={!invitation.active ? "bg-green-500 hover:bg-green-600 flex-1" : "flex-1"}
                            onClick={() => toggleInvitationStatus(invitation.id, invitation.active)}
                          >
                            <Toggle className="h-4 w-4 mr-1" />
                            {invitation.active ? "Deactivate" : "Activate"}
                          </Button>
                        </CardFooter>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <h3 className="text-xl font-semibold mb-2">No Invitations Yet</h3>
                    <p className="text-gray-500 text-center mb-6">
                      Create your first digital wedding invitation to get started
                    </p>
                    <Button 
                      className="bg-wedding-rosegold hover:bg-wedding-deep-rosegold"
                      onClick={() => setOpen(true)}
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Create Invitation
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="guests">
              {currentInvitation && (
                <>
                  <Alert className="mb-6">
                    <AlertTitle className="text-lg">Guest Management for "{currentInvitation.title}"</AlertTitle>
                    <AlertDescription>
                      Add and manage guests for your invitation. Guests can RSVP directly through your invitation page.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="mb-4">
                    <Button 
                      variant="outline"
                      onClick={() => setActiveTab("invitations")}
                    >
                      Back to Invitations
                    </Button>
                  </div>
                  
                  <GuestList invitationId={currentInvitation.id} />
                </>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
