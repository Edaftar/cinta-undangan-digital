
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, Send, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface RSVPProps {
  invitationId: string;
  invitationTitle?: string;
}

const RSVP = ({ invitationId, invitationTitle }: RSVPProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [attendance, setAttendance] = useState('attending');
  const [guestCount, setGuestCount] = useState('1');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error('Mohon masukkan nama Anda');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('guests')
        .insert({
          invitation_id: invitationId,
          name,
          email: email || null,
          phone: phone || null,
          attendance_status: attendance,
          number_of_guests: parseInt(guestCount),
          message: message || null
        });
      
      if (error) throw error;
      
      setIsSubmitted(true);
      toast.success('Terima kasih atas konfirmasi kehadiran Anda');
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      toast.error('Gagal mengirim konfirmasi. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <CheckCircle className="mx-auto text-green-500 h-16 w-16 mb-4" />
        <h3 className="text-2xl font-semibold mb-2">Terima Kasih!</h3>
        <p className="text-gray-600 mb-4">
          Konfirmasi kehadiran Anda telah kami terima.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-playfair font-semibold text-center mb-6">
        Konfirmasi Kehadiran
      </h2>
      
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
          <Input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="081234567890"
          />
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
        )}
        
        <div>
          <Label htmlFor="message">Ucapan & Doa (opsional)</Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tulis ucapan dan doa untuk mempelai"
            rows={4}
          />
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
    </div>
  );
};

export default RSVP;
