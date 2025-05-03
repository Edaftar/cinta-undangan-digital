
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Calendar,
  Users,
  Heart,
  Music,
  Loader2,
} from "lucide-react";

interface StatsData {
  userCount: number;
  invitationCount: number;
  templateUsage: { name: string; count: number }[];
  recentInvitations: any[];
  musicCount: number;
}

const COLORS = ["#FF6B6B", "#4ECDC4", "#FFD166", "#6A0572", "#AB83A1", "#15616D"];

export default function DashboardStats() {
  const [data, setData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      // Fetch user count
      const { count: userCount, error: userError } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

      if (userError) throw userError;

      // Fetch invitation count
      const { count: invitationCount, error: invitationError } = await supabase
        .from("invitations")
        .select("*", { count: "exact", head: true });

      if (invitationError) throw invitationError;

      // Fetch template usage stats
      const { data: templateData, error: templateError } = await supabase
        .from("invitations")
        .select("template_id");

      if (templateError) throw templateError;

      // Count templates by id
      const templateCounts: Record<string, number> = {};
      templateData.forEach(item => {
        templateCounts[item.template_id] = (templateCounts[item.template_id] || 0) + 1;
      });

      // Transform to format needed for chart
      const templateUsage = Object.entries(templateCounts).map(([id, count]) => ({
        name: `Template ${id}`,
        count
      }));

      // Fetch recent invitations
      const { data: recentData, error: recentError } = await supabase
        .from("invitations")
        .select("id, title, slug, created_at, user_id")
        .order("created_at", { ascending: false })
        .limit(5);

      if (recentError) throw recentError;

      // Fetch music count
      const { count: musicCount, error: musicError } = await supabase
        .from("music_options")
        .select("*", { count: "exact", head: true });

      if (musicError) throw musicError;

      setData({
        userCount: userCount || 0,
        invitationCount: invitationCount || 0,
        templateUsage,
        recentInvitations: recentData || [],
        musicCount: musicCount || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      setError("Gagal memuat data statistik");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-4 w-3/4 mt-4" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Pengguna"
          value={data?.userCount || 0}
          description="Jumlah pengguna terdaftar"
          icon={<Users className="h-5 w-5 text-blue-600" />}
        />
        <StatCard
          title="Undangan Aktif"
          value={data?.invitationCount || 0}
          description="Jumlah undangan yang dibuat"
          icon={<Heart className="h-5 w-5 text-rose-500" />}
        />
        <StatCard
          title="Pilihan Musik"
          value={data?.musicCount || 0}
          description="Jumlah musik yang tersedia"
          icon={<Music className="h-5 w-5 text-violet-500" />}
        />
        <StatCard
          title="Acara Minggu Ini"
          value="0"
          description="Jadwal acara dalam 7 hari"
          icon={<Calendar className="h-5 w-5 text-emerald-500" />}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Template Usage Bar Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Penggunaan Template</CardTitle>
            <CardDescription>
              Jumlah undangan yang menggunakan tiap template
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data?.templateUsage || []}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 50,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end" 
                    tick={{ fontSize: 12 }}
                    height={70}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Template Distribution Pie Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Distribusi Template</CardTitle>
            <CardDescription>
              Persentase penggunaan template
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data?.templateUsage || []}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {data?.templateUsage.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value} undangan`, name]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ title, value, description, icon }: { 
  title: string; 
  value: string | number; 
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}
