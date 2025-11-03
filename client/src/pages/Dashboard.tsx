import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  ArrowRight,
  DollarSign,
  Activity,
  Bell,
  Zap
} from "lucide-react";
import { Link } from "wouter";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function Dashboard() {
  const { user: currentUser } = useCurrentUser();

  const sections = [
    {
      title: "غرفة الدردشة",
      titleEn: "Chat Room",
      description: "تواصل مع الآخرين في غرف الدردشة",
      icon: MessageSquare,
      url: "/chat",
      gradient: "from-blue-500 to-cyan-500",
      badge: "جديد"
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
      gradient: "from-orange-500 to-red-500",
      badge: "شائع"
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
      description: "تسوق واشتري بعملة ATHR",
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
    <div className="space-y-8 pb-8" data-testid="dashboard-container">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="h-20 w-20 rounded-3xl gradient-primary flex items-center justify-center shadow-2xl animate-pulse">
            <Sparkles className="h-10 w-10 text-white" />
          </div>
        </div>
        <h1 className="text-5xl font-bold gradient-text">
          مرحباً بك {currentUser?.username && `، ${currentUser.username}`}
        </h1>
        <p className="text-muted-foreground text-lg">استكشف منصة أثر واستمتع بالميزات المتنوعة</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card border-white/20 dark:border-white/10 hover:scale-105 transition-transform" data-testid="stat-notifications">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">الإشعارات</p>
                <p className="text-3xl font-bold">3</p>
                <p className="text-xs text-green-500 mt-1 flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  جديد
                </p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
                <Bell className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/20 dark:border-white/10 hover:scale-105 transition-transform" data-testid="stat-friends">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">الأصدقاء</p>
                <p className="text-3xl font-bold">24</p>
                <p className="text-xs text-blue-500 mt-1">+3 هذا الأسبوع</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/20 dark:border-white/10 hover:scale-105 transition-transform" data-testid="stat-activity">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">النشاط</p>
                <p className="text-3xl font-bold">+12%</p>
                <p className="text-xs text-green-500 mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  متزايد
                </p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <Activity className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/20 dark:border-white/10 hover:scale-105 transition-transform" data-testid="stat-earnings">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">الأرباح</p>
                <p className="text-3xl font-bold">850</p>
                <p className="text-xs text-yellow-500 mt-1">ATHR هذا الشهر</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Sections and Tips Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Sections Grid */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-purple-500" />
              الأقسام الرئيسية
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sections.map((section) => (
                <Link key={section.url} href={section.url}>
                  <Card 
                    className="glass-card border-white/20 dark:border-white/10 hover:scale-105 transition-all duration-300 cursor-pointer group h-full"
                    data-testid={`section-${section.titleEn.toLowerCase().replace(' ', '-')}`}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${section.gradient} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                          <section.icon className="h-7 w-7 text-white" />
                        </div>
                        {section.badge && (
                          <Badge variant="secondary" className="text-xs">
                            {section.badge}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="flex items-center justify-between">
                        <span>{section.titleEn}</span>
                        <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
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
          </div>

          {/* Quick Actions */}
          <Card className="glass-card border-white/20 dark:border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                إجراءات سريعة
              </CardTitle>
              <CardDescription>الإجراءات الأكثر استخداماً</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Link href="/wallet">
                  <Button className="gradient-primary" data-testid="button-send-athr">
                    <Wallet className="h-4 w-4 mr-2" />
                    إرسال ATHR
                  </Button>
                </Link>
                <Link href="/match">
                  <Button variant="outline" className="border-white/20" data-testid="button-find-friend">
                    <Shuffle className="h-4 w-4 mr-2" />
                    ابحث عن صديق
                  </Button>
                </Link>
                <Link href="/store">
                  <Button variant="outline" className="border-white/20" data-testid="button-browse-store">
                    <Store className="h-4 w-4 mr-2" />
                    تصفح المتجر
                  </Button>
                </Link>
                <Link href="/chat">
                  <Button variant="outline" className="border-white/20" data-testid="button-start-chat">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    ابدأ محادثة
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tips Card */}
        <div className="space-y-6">
          <Card className="glass-card border-white/20 dark:border-white/10 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                <Sparkles className="h-5 w-5" />
                نصيحة اليوم
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground" dir="rtl">
                استخدم ميزة المطابقة للعثور على أصدقاء جدد يشاركونك نفس الاهتمامات! كل صداقة جديدة تمنحك مكافآت ATHR.
              </p>
              <Link href="/match">
                <Button className="w-full mt-4 gradient-primary" data-testid="button-try-now">
                  جربها الآن
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
