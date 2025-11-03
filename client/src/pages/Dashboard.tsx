
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  Mic, 
  Shuffle, 
  Wallet, 
  Store, 
  Users, 
  User,
  TrendingUp,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { Link } from "wouter";

export default function Dashboard() {
  const sections = [
    {
      title: "غرفة الدردشة",
      titleEn: "Chat Room",
      description: "تواصل مع الآخرين في غرف الدردشة",
      icon: MessageSquare,
      url: "/chat",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "غرفة الصوت",
      titleEn: "Voice Room",
      description: "انضم إلى المحادثات الصوتية",
      icon: Mic,
      url: "/voice",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "المطابقة",
      titleEn: "Match",
      description: "ابحث عن أصدقاء جدد",
      icon: Shuffle,
      url: "/match",
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: "المحفظة",
      titleEn: "Wallet",
      description: "إدارة عملاتك ومعاملاتك",
      icon: Wallet,
      url: "/wallet",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "المتجر",
      titleEn: "Store",
      description: "تسوق واشتري بعملة ATH",
      icon: Store,
      url: "/store",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      title: "الأصدقاء",
      titleEn: "Friends",
      description: "شاهد قائمة أصدقائك",
      icon: Users,
      url: "/friends",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      title: "حسابي",
      titleEn: "Account",
      description: "إدارة معلومات حسابك",
      icon: User,
      url: "/account",
      gradient: "from-pink-500 to-rose-500"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="h-16 w-16 rounded-2xl gradient-primary flex items-center justify-center shadow-lg">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold gradient-text">مرحباً بك في أثر</h1>
        <p className="text-muted-foreground text-lg">اختر القسم الذي تريد زيارته</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card border-white/20 dark:border-white/10">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">رصيد ATH</p>
                <p className="text-2xl font-bold gradient-text">15,250</p>
              </div>
              <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/20 dark:border-white/10">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">الأصدقاء</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/20 dark:border-white/10">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">النشاط اليوم</p>
                <p className="text-2xl font-bold">+12%</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <Link key={section.url} href={section.url}>
            <Card className="glass-card border-white/20 dark:border-white/10 hover:scale-105 transition-all duration-300 cursor-pointer group h-full">
              <CardHeader>
                <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${section.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <section.icon className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="flex items-center justify-between">
                  <span>{section.titleEn}</span>
                  <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </CardTitle>
                <CardDescription className="text-right" dir="rtl">
                  {section.title}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-right" dir="rtl">
                  {section.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="glass-card border-white/20 dark:border-white/10">
        <CardHeader>
          <CardTitle>إجراءات سريعة</CardTitle>
          <CardDescription>الإجراءات الأكثر استخداماً</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Link href="/wallet">
              <Button className="gradient-primary">
                <Wallet className="h-4 w-4 mr-2" />
                إرسال ATH
              </Button>
            </Link>
            <Link href="/match">
              <Button variant="outline" className="border-white/20">
                <Shuffle className="h-4 w-4 mr-2" />
                ابحث عن صديق
              </Button>
            </Link>
            <Link href="/store">
              <Button variant="outline" className="border-white/20">
                <Store className="h-4 w-4 mr-2" />
                تصفح المتجر
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
