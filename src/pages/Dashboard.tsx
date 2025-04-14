import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Plus, Copy, Loader2, Pencil, Settings } from 'lucide-react';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { generateRandomString } from '@/lib/utils';
import GuestList from '@/components/GuestList';

interface Invitation {
  id: string;
  user_id: string;
  title: string;
  slug: string;
  template_id: string;
  active: boolean;
  bride_name: string;
  groom_name: string;
  location: string;
  main_date: string;
  bride_father?: string;
  bride_mother?: string;
  bride_photo?: string;
  groom_father?: string;
  groom_mother?: string;
  groom_photo?: string;
  akad_date?: string;
  reception_date?: string;
  location_address?: string;
  location_map_url?: string;
  love_story?: string;
  gallery?: string[];
  created_at: string;
  updated_at?: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [templateId, setTemplateId] = useState('elegant-1'); // Default template
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchInvitations = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('invitations')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data) {
          setInvitations(data);
        }
      } catch (error) {
        console.error("Error fetching invitations:", error);
        toast.error("Failed to load invitations.");
      } finally {
        setLoading(false);
      }
    };

    fetchInvitations();
  }, [user]);

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
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <div>
            <CardTitle className="text-2xl font-bold">Dashboard</CardTitle>
            <CardDescription>Manage your wedding invitations</CardDescription>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              className="border-wedding-sage text-wedding-sage hover:bg-wedding-light-sage"
              asChild
            >
              <Link to="/profile">
                <Settings className="mr-2 h-4 w-4" />
                Profile Settings
              </Link>
            </Button>
            
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Invitation
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create Invitation</DialogTitle>
                  <DialogDescription>
                    Create a new invitation to share with your loved ones.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title
                    </Label>
                    <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="slug" className="text-right">
                      Slug
                    </Label>
                    <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleCreateInvitation} disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        
        <CardContent>
          {invitations.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No invitations created yet.</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invitations.map((invitation) => (
                    <React.Fragment key={invitation.id}>
                      <TableRow>
                        <TableCell className="font-medium">{invitation.title}</TableCell>
                        <TableCell>{invitation.slug}</TableCell>
                        <TableCell className="text-right flex gap-2 justify-end">
                          <Button size="sm" variant="outline" onClick={() => handleCopyToClipboard(invitation.slug)}>
                            <Copy className="mr-2 h-4 w-4" />
                            Copy Link
                          </Button>
                          <Button size="sm" asChild>
                            <Link to={`/create/${invitation.template_id}`} state={{ weddingData: invitation }}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </Button>
                          <Button size="sm" asChild>
                            <Link to={`/preview/${invitation.template_id}`} state={{ weddingData: invitation }}>
                              Preview
                            </Link>
                          </Button>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button
                            size="sm"
                            variant={invitation.active ? "destructive" : "outline"}
                            onClick={() => toggleInvitationStatus(invitation.id, invitation.active)}
                          >
                            {invitation.active ? 'Deactivate' : 'Activate'}
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow key={`${invitation.id}-guestlist`}>
                        <TableCell colSpan={5}>
                          <GuestList invitationId={invitation.id} invitationTitle={invitation.title} />
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
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

export default Dashboard;
