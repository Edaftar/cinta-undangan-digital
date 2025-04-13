
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, Download, CheckCircle, XCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';

interface Guest {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  attendance_status: 'attending' | 'not_attending' | 'pending';
  number_of_guests: number;
  message: string | null;
  created_at: string;
}

interface GuestListProps {
  invitationId: string;
  invitationTitle: string;
}

const GuestList = ({ invitationId, invitationTitle }: GuestListProps) => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    attending: 0,
    notAttending: 0,
    pending: 0,
    totalGuests: 0,
  });
  const { user } = useAuth();

  useEffect(() => {
    const fetchGuests = async () => {
      if (!invitationId) return;

      try {
        const { data, error } = await supabase
          .from('guests')
          .select('*')
          .eq('invitation_id', invitationId)
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data) {
          setGuests(data as Guest[]);
          
          // Calculate stats
          const attending = data.filter(g => g.attendance_status === 'attending');
          const notAttending = data.filter(g => g.attendance_status === 'not_attending');
          const pending = data.filter(g => g.attendance_status === 'pending');
          const totalGuests = attending.reduce((sum, guest) => sum + (guest.number_of_guests || 1), 0);
          
          setStats({
            total: data.length,
            attending: attending.length,
            notAttending: notAttending.length,
            pending: pending.length,
            totalGuests,
          });
        }
      } catch (error) {
        console.error('Error fetching guests:', error);
        toast.error('Gagal memuat daftar tamu');
      } finally {
        setLoading(false);
      }
    };

    fetchGuests();
  }, [invitationId]);

  const exportToCSV = () => {
    if (guests.length === 0) return;

    // Create CSV content
    const headers = ['Nama', 'Email', 'Telepon', 'Status Kehadiran', 'Jumlah Tamu', 'Pesan', 'Tanggal'];
    const rows = guests.map(guest => [
      guest.name,
      guest.email || '',
      guest.phone || '',
      guest.attendance_status === 'attending' ? 'Hadir' : 
        (guest.attendance_status === 'not_attending' ? 'Tidak Hadir' : 'Belum Konfirmasi'),
      guest.number_of_guests || 1,
      guest.message || '',
      new Date(guest.created_at).toLocaleDateString('id-ID')
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => 
        row.map(cell => 
          `"${String(cell).replace(/"/g, '""')}"`
        ).join(',')
      )
    ].join('\n');

    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `tamu-${invitationTitle.replace(/\s+/g, '-')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'attending':
        return <Badge className="bg-green-500">Hadir</Badge>;
      case 'not_attending':
        return <Badge variant="destructive">Tidak Hadir</Badge>;
      default:
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Belum Konfirmasi</Badge>;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Daftar Tamu</CardTitle>
          <CardDescription>Memuat data tamu...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-6">
          <Loader2 className="h-8 w-8 animate-spin text-wedding-rosegold" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Daftar Tamu</CardTitle>
          <CardDescription>
            Menampilkan {guests.length} konfirmasi kehadiran
          </CardDescription>
        </div>
        <Button 
          onClick={exportToCSV}
          disabled={guests.length === 0}
          variant="outline"
          className="border-wedding-rosegold text-wedding-rosegold hover:bg-wedding-light-blush"
        >
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
            <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <div className="text-sm text-green-600 font-medium">Hadir</div>
              <div className="text-2xl font-bold">{stats.attending} <span className="text-sm font-normal">({stats.totalGuests} tamu)</span></div>
            </div>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
            <XCircle className="h-8 w-8 text-red-500 mr-3" />
            <div>
              <div className="text-sm text-red-600 font-medium">Tidak Hadir</div>
              <div className="text-2xl font-bold">{stats.notAttending}</div>
            </div>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center">
            <Clock className="h-8 w-8 text-amber-500 mr-3" />
            <div>
              <div className="text-sm text-amber-600 font-medium">Belum Konfirmasi</div>
              <div className="text-2xl font-bold">{stats.pending}</div>
            </div>
          </div>
        </div>
        
        {guests.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Belum ada konfirmasi kehadiran dari tamu
          </div>
        ) : (
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Jumlah</TableHead>
                  <TableHead>Kontak</TableHead>
                  <TableHead>Pesan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {guests.map((guest) => (
                  <TableRow key={guest.id}>
                    <TableCell className="font-medium">{guest.name}</TableCell>
                    <TableCell>{getStatusBadge(guest.attendance_status)}</TableCell>
                    <TableCell>{guest.number_of_guests || 1}</TableCell>
                    <TableCell>
                      {guest.email && <div className="text-xs">{guest.email}</div>}
                      {guest.phone && <div className="text-xs">{guest.phone}</div>}
                      {!guest.email && !guest.phone && <span className="text-gray-400 text-xs">-</span>}
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <div className="text-sm truncate">
                        {guest.message || <span className="text-gray-400">-</span>}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GuestList;
