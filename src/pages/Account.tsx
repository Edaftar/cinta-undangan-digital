
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, User, Save, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";

type Profile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  avatar_url: string | null;
};

const Account = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate("/auth/login");
      return;
    }

    async function getProfile() {
      try {
        setLoading(true);
        
        // First, check if profiles table exists and if not, create a default profile
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          if (error.code === "PGRST116") {
            // Create a profile for this user since it doesn't exist
            await supabase.from("profiles").insert({
              id: user.id,
              first_name: user.user_metadata?.first_name || null,
              last_name: user.user_metadata?.last_name || null,
              email: user.email,
            });
            
            // Fetch the newly created profile
            const { data: newProfile } = await supabase
              .from("profiles")
              .select("*")
              .eq("id", user.id)
              .single();
              
            if (newProfile) {
              setFirstName(newProfile.first_name);
              setLastName(newProfile.last_name);
              setEmail(newProfile.email);
              setPhone(newProfile.phone);
              setAvatarUrl(newProfile.avatar_url);
            }
          } else {
            throw error;
          }
        } else if (profile) {
          setFirstName(profile.first_name);
          setLastName(profile.last_name);
          setEmail(profile.email);
          setPhone(profile.phone);
          setAvatarUrl(profile.avatar_url);
        }
      } catch (error: any) {
        console.error("Error fetching user profile:", error.message);
        toast.error("Gagal memuat profil");
      } finally {
        setLoading(false);
      }
    }

    getProfile();
  }, [user, navigate]);

  async function updateProfile() {
    if (!user) return;

    try {
      setUpdating(true);

      // Update the profile
      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: firstName,
          last_name: lastName,
          phone: phone,
        })
        .eq("id", user.id);

      if (error) throw error;

      toast.success("Profil berhasil diperbarui");
    } catch (error: any) {
      console.error("Error updating profile:", error.message);
      toast.error("Gagal memperbarui profil");
    } finally {
      setUpdating(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-wedding-ivory">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-wedding-rosegold" />
          <span className="ml-2 text-gray-600">Memuat data...</span>
        </div>
        <Footer />
      </div>
    );
  }

  const fullName = [firstName, lastName].filter(Boolean).join(' ');

  return (
    <div className="min-h-screen flex flex-col bg-wedding-ivory">
      <Navbar />
      <main className="flex-grow py-12 px-4">
        <motion.div 
          className="max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-center mb-8 font-playfair">Akun Saya</h1>
          
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24">
                  {avatarUrl ? (
                    <AvatarImage src={avatarUrl} alt={fullName || "Profile"} />
                  ) : (
                    <AvatarFallback className="text-3xl bg-wedding-sage text-white">
                      <User />
                    </AvatarFallback>
                  )}
                </Avatar>
              </div>
              <CardTitle>{fullName || "Pengguna"}</CardTitle>
              <CardDescription>{email}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Nama Depan
                </Label>
                <Input
                  id="firstName"
                  value={firstName || ""}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="border-wedding-champagne focus-visible:ring-wedding-rosegold"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName" className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Nama Belakang
                </Label>
                <Input
                  id="lastName"
                  value={lastName || ""}
                  onChange={(e) => setLastName(e.target.value)}
                  className="border-wedding-champagne focus-visible:ring-wedding-rosegold"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Label>
                <Input
                  id="email"
                  value={email || ""}
                  readOnly
                  disabled
                  className="bg-gray-50 border-wedding-champagne"
                />
                <p className="text-xs text-gray-500">Email tidak dapat diubah</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  Nomor Telepon
                </Label>
                <Input
                  id="phone"
                  value={phone || ""}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0812xxxxx"
                  className="border-wedding-champagne focus-visible:ring-wedding-rosegold"
                />
              </div>
              
              <Button 
                onClick={updateProfile}
                disabled={updating}
                className="w-full bg-wedding-rosegold hover:bg-wedding-deep-rosegold text-white"
              >
                {updating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Memperbarui...</span>
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    <span>Simpan Perubahan</span>
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Account;
