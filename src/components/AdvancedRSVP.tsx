
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Send, Loader2, CalendarCheck, Users, Phone, Mail, MessageSquare } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface AdvancedRSVPProps {
  invitationId: string;
  invitationTitle?: string;
  weddingDate?: string;
  weddingLocation?: string;
}

const AdvancedRSVP = ({ invitationId, invitationTitle, weddingDate, weddingLocation }: AdvancedRSVPProps) => {
  const [activeTab, setActiveTab] = useState("form");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [attendance, setAttendance] = useState('attending');
  const [guestCount, setGuestCount] = useState('1');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [needsAccommodation, setNeedsAccommodation] = useState(false);
  const [transportationOption, setTransportationOption] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [guestCode, setGuestCode] = useState('');
  const [searchName, setSearchName] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<any>(null);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Format wedding date if available
  const formattedWeddingDate = weddingDate ? 
    format(new Date(weddingDate), 'EEEE, dd MMMM yyyy', { locale: id }) : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error('Mohon masukkan nama Anda');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Generate a unique guest code
      const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      
      const { error } = await supabase
        .from('guests')
        .insert({
          invitation_id: invitationId,
          name,
          email: email || null,
          phone: phone || null,
          attendance_status: attendance,
          number_of_guests: parseInt(guestCount),
          message: message || null,
          // Can add additional fields for advanced RSVP functionality
        });
      
      if (error) throw error;
      
      // Set guest code for displaying to the user
      setGuestCode(randomCode);
      setIsSubmitted(true);
      toast.success('Terima kasih atas konfirmasi kehadiran Anda');
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      toast.error('Gagal mengirim konfirmasi. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchName.trim()) {
      toast.error('Mohon masukkan nama untuk dicari');
      return;
    }
    
    setIsSearching(true);
    setShowSearchResults(true);
    
    try {
      const { data, error } = await supabase
        .from('guests')
        .select('*')
        .eq('invitation_id', invitationId)
        .ilike('name', `%${searchName}%`)
        .limit(1);
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        setSearchResult(data[0]);
      } else {
        setSearchResult(null);
      }
    } catch (error) {
      console.error('Error searching RSVP:', error);
      toast.error('Gagal mencari data. Silakan coba lagi.');
    } finally {
      setIsSearching(false);
    }
  };

  const renderAttendanceStatus = (status: string) => {
    switch(status) {
      case 'attending':
        return <span className="text-green-600 font-medium">Menghadiri</span>;
      case 'not_attending':
        return <span className="text-red-600 font-medium">Tidak Dapat Hadir</span>;
      case 'pending':
        return <span className="text-amber-600 font-medium">Belum Konfirmasi</span>;
      default:
        return <span className="text-gray-600 font-medium">Status Tidak Diketahui</span>;
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <CheckCircle className="mx-auto text-green-500 h-16 w-16 mb-4" />
        <h3 className="text-2xl font-semibold mb-2">Terima Kasih!</h3>
        <p className="text-gray-600 mb-6">
          Konfirmasi kehadiran Anda telah kami terima.
        </p>
        
        <Card className="mb-6 bg-wedding-light-blush border-wedding-rosegold">
          <CardHeader>
            <CardTitle className="text-center">Kode Tamu Anda</CardTitle>
            <CardDescription className="text-center">Tunjukkan kode ini saat acara berlangsung</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="bg-white px-6 py-4 rounded-lg border-2 border-dashed border-wedding-rosegold">
              <p className="text-3xl font-mono tracking-wider text-wedding-rosegold">{guestCode}</p>
            </div>
          </CardContent>
        </Card>
        
        {formattedWeddingDate && weddingLocation && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h4 className="font-semibold mb-2 text-gray-800">Informasi Acara:</h4>
            <div className="flex items-center mb-2">
              <CalendarCheck className="text-wedding-rosegold mr-2 h-4 w-4" />
              <p className="text-gray-700">{formattedWeddingDate}</p>
            </div>
            <div className="flex items-center">
              <Users className="text-wedding-rosegold mr-2 h-4 w-4" />
              <p className="text-gray-700">{weddingLocation}</p>
            </div>
          </div>
        )}
        
        <Button 
          onClick={() => {
            setIsSubmitted(false);
            setActiveTab("form");
            setName('');
            setEmail('');
            setPhone('');
            setMessage('');
          }} 
          variant="outline" 
          className="border-wedding-rosegold text-wedding-rosegold hover:bg-wedding-light-blush"
        >
          Konfirmasi Baru
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-playfair font-semibold text-center mb-6">
        Konfirmasi Kehadiran
      </h2>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full mb-6">
          <TabsTrigger value="form" className="w-1/2">Konfirmasi Kehadiran</TabsTrigger>
          <TabsTrigger value="search" className="w-1/2">Cek Status</TabsTrigger>
        </TabsList>
        
        <TabsContent value="form">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="name">Nama</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama Anda"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email (opsional)</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Nomor Telepon (opsional)</Label>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="081234567890"
                />
              </div>
            </div>
            
            <div>
              <Label>Apakah Anda akan hadir?</Label>
              <RadioGroup 
                value={attendance} 
                onValueChange={setAttendance}
                className="flex space-x-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="attending" id="attending" />
                  <Label htmlFor="attending">Ya, saya akan hadir</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="not_attending" id="not_attending" />
                  <Label htmlFor="not_attending">Maaf, saya tidak bisa hadir</Label>
                </div>
              </RadioGroup>
            </div>
            
            {attendance === 'attending' && (
              <>
                <div>
                  <Label htmlFor="guestCount">Jumlah Tamu</Label>
                  <Select value={guestCount} onValueChange={setGuestCount}>
                    <SelectTrigger id="guestCount" className="w-full">
                      <SelectValue placeholder="Pilih jumlah tamu" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map(num => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num > 1 ? 'orang' : 'orang'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="dietaryRestrictions">Alergi atau Kebutuhan Makanan Khusus (opsional)</Label>
                  <Input
                    id="dietaryRestrictions"
                    value={dietaryRestrictions}
                    onChange={(e) => setDietaryRestrictions(e.target.value)}
                    placeholder="Misalnya: vegetarian, alergi kacang, dll."
                  />
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="needsAccommodation" 
                    checked={needsAccommodation}
                    onCheckedChange={(checked) => setNeedsAccommodation(checked as boolean)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="needsAccommodation">
                      Saya membutuhkan informasi akomodasi
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Centang ini jika Anda memerlukan informasi tentang hotel terdekat.
                    </p>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="transportationOption">Transportasi (opsional)</Label>
                  <Select value={transportationOption} onValueChange={setTransportationOption}>
                    <SelectTrigger id="transportationOption" className="w-full">
                      <SelectValue placeholder="Pilih transportasi yang Anda gunakan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pribadi">Kendaraan pribadi</SelectItem>
                      <SelectItem value="umum">Transportasi umum</SelectItem>
                      <SelectItem value="taksi">Taksi/Ojek online</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
            
            <div>
              <Label htmlFor="message">Ucapan & Doa (opsional)</Label>
              <div className="flex items-start space-x-2">
                <MessageSquare className="h-4 w-4 mt-3 text-gray-400" />
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tulis ucapan dan doa untuk mempelai"
                  rows={4}
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-wedding-rosegold hover:bg-wedding-deep-rosegold"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Mengirim...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Kirim Konfirmasi
                </>
              )}
            </Button>
          </form>
        </TabsContent>
        
        <TabsContent value="search">
          <form onSubmit={handleSearch} className="space-y-5">
            <div>
              <Label htmlFor="searchName">Cari dengan Nama</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="searchName"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  placeholder="Masukkan nama Anda"
                  required
                />
                <Button type="submit" disabled={isSearching} className="bg-wedding-rosegold hover:bg-wedding-deep-rosegold">
                  {isSearching ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Cari"
                  )}
                </Button>
              </div>
            </div>
          </form>
          
          {showSearchResults && (
            <div className="mt-6">
              {isSearching ? (
                <div className="text-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto text-wedding-rosegold" />
                  <p className="mt-2 text-gray-600">Mencari...</p>
                </div>
              ) : searchResult ? (
                <Card>
                  <CardHeader>
                    <CardTitle>{searchResult.name}</CardTitle>
                    <CardDescription>
                      Status: {renderAttendanceStatus(searchResult.attendance_status)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {searchResult.number_of_guests > 1 && (
                        <p className="text-sm">Jumlah Tamu: {searchResult.number_of_guests} orang</p>
                      )}
                      {searchResult.message && (
                        <div>
                          <p className="text-sm font-medium">Ucapan:</p>
                          <p className="text-sm italic bg-gray-50 p-2 rounded">"{searchResult.message}"</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <p className="text-xs text-gray-500">Terkonfirmasi pada {format(new Date(searchResult.created_at), 'dd MMM yyyy, HH:mm', { locale: id })}</p>
                  </CardFooter>
                </Card>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-600">Data tidak ditemukan. Silakan periksa nama Anda atau lakukan konfirmasi kehadiran.</p>
                  <Button 
                    onClick={() => setActiveTab("form")}
                    variant="outline" 
                    className="mt-4 border-wedding-rosegold text-wedding-rosegold hover:bg-wedding-light-blush"
                  >
                    Konfirmasi Kehadiran
                  </Button>
                </div>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedRSVP;
