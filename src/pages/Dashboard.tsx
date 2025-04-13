import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Plus, Copy, Loader2, Pencil } from 'lucide-react';
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

const Dashboard = () => {
  const { user } = useAuth();
  const [invitations, setInvitations] = useState([]);
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

      const { data, error } = await supabase
        .from('invitations')
        .insert([
          { 
            user_id: user.id, 
            title, 
            slug: finalSlug,
            template_id: templateId,
            active: true, // Set active to true by default
          }
        ]);

      if (error) throw error;

      // Optimistically update the invitations list
      setInvitations(prevInvitations => [
        ...prevInvitations,
        { 
          id: data ? data[0].id : generateRandomString(10), // Use a temporary ID if data is not available
          user_id: user.id, 
          title, 
          slug: finalSlug,
          template_id: templateId,
          active: true,
          created_at: new Date().toISOString(), // Use current time
        }
      ]);

      toast.success("Invitation created successfully!");
      setOpen(false); // Close the dialog
      setTitle(''); // Reset the title
      setSlug(''); // Reset the slug
    } catch (error) {
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
    } catch (error) {
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
          <CardTitle className="text-2xl font-bold">Dashboard</CardTitle>
          <CardDescription>Manage your wedding invitations</CardDescription>
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
                    <>
                      <TableRow key={invitation.id}>
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
                    </>
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

export default Dashboard;
