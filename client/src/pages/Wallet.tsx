
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Copy, QrCode, Download, Send, ArrowDownToLine, ArrowUpFromLine, Upload, TrendingUp, TrendingDown } from "lucide-react";
import QRCode from "react-qr-code";
import { useToast } from "@/hooks/use-toast";

export default function Wallet() {
  const userAddress = "11039PKSG281027GGA01BA071";
  const { toast } = useToast();
  
  // Dialog states
  const [showQRDialog, setShowQRDialog] = useState(false);
  const [showSendDialog, setShowSendDialog] = useState(false);
  const [showDepositDialog, setShowDepositDialog] = useState(false);
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false);
  const [showATHDialog, setShowATHDialog] = useState(false);
  const [athAction, setAthAction] = useState<"buy" | "sell">("buy");
  
  // Form states
  const [sendMethod, setSendMethod] = useState<"manual" | "scan" | "upload">("manual");
  const [sendAmount, setSendAmount] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [depositCurrency, setDepositCurrency] = useState("");
  const [withdrawCurrency, setWithdrawCurrency] = useState("");
  const [athAmount, setAthAmount] = useState("");
  const [athCurrency, setAthCurrency] = useState("USD");

  // Real balances - stored in state
  const [usdBalance, setUsdBalance] = useState(1000.00);
  const [sypBalance, setSypBalance] = useState(5500000);
  const [athrBalance, setAthrBalance] = useState(15250);

  // ATHR rates (configurable from admin panel)
  const athRates = {
    USD: 0.001,
    SYP: 11,
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(userAddress);
    toast({
      title: "تم النسخ!",
      description: "تم نسخ العنوان إلى الحافظة",
    });
  };

  const handleDownloadQR = () => {
    const svg = document.getElementById("wallet-qr-code");
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = "wallet-qr-code.png";
        downloadLink.href = pngFile;
        downloadLink.click();
      };
      img.src = "data:image/svg+xml;base64," + btoa(svgData);
    }
  };

  const handleSend = async () => {
    if (!sendAmount || !recipientAddress) {
      toast({
        title: "خطأ",
        description: "الرجاء ملء جميع الحقول",
        variant: "destructive",
      });
      return;
    }

    const amount = parseFloat(sendAmount);
    const fee = amount * 0.0005; // 0.05% fee
    const total = amount + fee;

    if (total > usdBalance) {
      toast({
        title: "خطأ",
        description: "الرصيد غير كافي",
        variant: "destructive",
      });
      return;
    }

    // Deduct from balance
    setUsdBalance(prev => prev - total);

    toast({
      title: "تم الإرسال بنجاح",
      description: `تم إرسال ${sendAmount} USD مع رسوم ${fee.toFixed(2)} USD (الإجمالي: ${total.toFixed(2)} USD)`,
    });
    
    setShowSendDialog(false);
    setSendAmount("");
    setRecipientAddress("");
  };

  const handleATHTrade = async () => {
    if (!athAmount) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال الكمية",
        variant: "destructive",
      });
      return;
    }

    const amount = parseFloat(athAmount);
    const rate = athRates[athCurrency as keyof typeof athRates];
    
    if (athAction === "buy") {
      const total = amount * rate;
      
      if (athCurrency === "USD" && total > usdBalance) {
        toast({
          title: "خطأ",
          description: "رصيد USD غير كافي",
          variant: "destructive",
        });
        return;
      }
      
      if (athCurrency === "SYP" && total > sypBalance) {
        toast({
          title: "خطأ",
          description: "رصيد SYP غير كافي",
          variant: "destructive",
        });
        return;
      }

      // Execute buy
      if (athCurrency === "USD") {
        setUsdBalance(prev => prev - total);
      } else {
        setSypBalance(prev => prev - total);
      }
      setAthrBalance(prev => prev + amount);

      toast({
        title: "تم الشراء بنجاح",
        description: `تم شراء ${amount.toFixed(2)} ATHR مقابل ${total.toFixed(2)} ${athCurrency}`,
      });
    } else {
      // Sell
      if (amount > athrBalance) {
        toast({
          title: "خطأ",
          description: "رصيد ATHR غير كافي",
          variant: "destructive",
        });
        return;
      }

      const totalBeforeFee = amount * rate;
      const fee = totalBeforeFee * 0.0005; // 0.05% fee
      const netAmount = totalBeforeFee - fee;

      // Execute sell
      setAthrBalance(prev => prev - amount);
      if (athCurrency === "USD") {
        setUsdBalance(prev => prev + netAmount);
      } else {
        setSypBalance(prev => prev + netAmount);
      }

      toast({
        title: "تم البيع بنجاح",
        description: `تم بيع ${amount.toFixed(2)} ATHR مقابل ${netAmount.toFixed(2)} ${athCurrency} (رسوم: ${fee.toFixed(2)} ${athCurrency})`,
      });
    }
    
    setShowATHDialog(false);
    setAthAmount("");
  };

  // Calculate preview for ATH trade
  const calculateATHPreview = () => {
    if (!athAmount) return null;
    
    const amount = parseFloat(athAmount);
    const rate = athRates[athCurrency as keyof typeof athRates];
    
    if (athAction === "buy") {
      const total = amount * rate;
      return {
        amount: amount.toFixed(2),
        currency: athCurrency,
        total: total.toFixed(2),
        fee: 0,
      };
    } else {
      const totalBeforeFee = amount * rate;
      const fee = totalBeforeFee * 0.0005;
      const netAmount = totalBeforeFee - fee;
      return {
        amount: amount.toFixed(2),
        currency: athCurrency,
        total: netAmount.toFixed(2),
        fee: fee.toFixed(2),
      };
    }
  };

  const athPreview = calculateATHPreview();

  return (
    <div className="space-y-8 max-w-7xl">
      <div className="relative">
        <div className="absolute -top-20 -left-20 w-96 h-96 gradient-primary opacity-10 rounded-full blur-3xl" />
        <h1 className="text-5xl font-bold gradient-text mb-6 relative">محفظتي</h1>
      </div>

      {/* Wallet Address Section */}
      <Card className="rounded-3xl border-white/20 dark:border-white/10 backdrop-blur-xl bg-white/70 dark:bg-white/5 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl gradient-text">عنوان المحفظة</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={userAddress}
              readOnly
              className="font-mono text-sm rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border-white/20"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={handleCopyAddress}
              className="rounded-xl backdrop-blur-sm bg-background/50 border-white/20"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowQRDialog(true)}
              className="rounded-xl backdrop-blur-sm bg-background/50 border-white/20"
            >
              <QrCode className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Currency Balances */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* USD Balance */}
        <Card className="rounded-3xl border-white/20 dark:border-white/10 backdrop-blur-xl bg-white/70 dark:bg-white/5 shadow-xl">
          <CardHeader>
            <CardTitle className="text-lg gradient-text">USD Balance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-4xl font-bold tabular-nums">${usdBalance.toFixed(2)}</div>
            <div className="grid grid-cols-3 gap-2">
              <Button
                onClick={() => setShowSendDialog(true)}
                className="rounded-full gradient-primary text-white border-0 shadow-lg"
                size="sm"
              >
                <Send className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => setShowDepositDialog(true)}
                variant="outline"
                className="rounded-full backdrop-blur-sm bg-background/50 border-white/20"
                size="sm"
              >
                <ArrowDownToLine className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => setShowWithdrawDialog(true)}
                variant="outline"
                className="rounded-full backdrop-blur-sm bg-background/50 border-white/20"
                size="sm"
              >
                <ArrowUpFromLine className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* SYP Balance */}
        <Card className="rounded-3xl border-white/20 dark:border-white/10 backdrop-blur-xl bg-white/70 dark:bg-white/5 shadow-xl">
          <CardHeader>
            <CardTitle className="text-lg gradient-text">SYP Balance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-4xl font-bold tabular-nums">{sypBalance.toLocaleString()} SYP</div>
            <div className="grid grid-cols-3 gap-2">
              <Button
                onClick={() => setShowSendDialog(true)}
                className="rounded-full gradient-primary text-white border-0 shadow-lg"
                size="sm"
              >
                <Send className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => setShowDepositDialog(true)}
                variant="outline"
                className="rounded-full backdrop-blur-sm bg-background/50 border-white/20"
                size="sm"
              >
                <ArrowDownToLine className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => setShowWithdrawDialog(true)}
                variant="outline"
                className="rounded-full backdrop-blur-sm bg-background/50 border-white/20"
                size="sm"
              >
                <ArrowUpFromLine className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ATHR Balance */}
      <Card className="rounded-3xl border-white/20 dark:border-white/10 backdrop-blur-xl bg-white/70 dark:bg-white/5 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl gradient-text">ATHR Balance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-4xl font-bold tabular-nums">{athrBalance.toFixed(2)} ATHR</div>
          <p className="text-sm text-muted-foreground">
            1 ATHR = {athRates.USD} USD أو {athRates.SYP} SYP
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => {
                setAthAction("buy");
                setShowATHDialog(true);
              }}
              className="rounded-full gradient-primary text-white border-0 shadow-lg"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              شراء
            </Button>
            <Button
              onClick={() => {
                setAthAction("sell");
                setShowATHDialog(true);
              }}
              variant="outline"
              className="rounded-full backdrop-blur-sm bg-background/50 border-white/20"
            >
              <TrendingDown className="h-4 w-4 mr-2" />
              بيع
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* QR Code Dialog */}
      <Dialog open={showQRDialog} onOpenChange={setShowQRDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>رمز QR للمحفظة</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4">
            <div className="p-6 bg-white rounded-2xl">
              <QRCode id="wallet-qr-code" value={userAddress} size={200} />
            </div>
            <Button
              onClick={handleDownloadQR}
              className="w-full rounded-full gradient-primary text-white border-0 shadow-lg"
            >
              <Download className="h-4 w-4 mr-2" />
              تحميل رمز QR
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Send Dialog */}
      <Dialog open={showSendDialog} onOpenChange={setShowSendDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>إرسال</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Tabs value={sendMethod} onValueChange={(v) => setSendMethod(v as any)}>
              <TabsList className="grid w-full grid-cols-3 bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-full p-1">
                <TabsTrigger value="manual" className="rounded-full data-[state=active]:gradient-primary data-[state=active]:text-white">يدوي</TabsTrigger>
                <TabsTrigger value="scan" className="rounded-full data-[state=active]:gradient-primary data-[state=active]:text-white">مسح QR</TabsTrigger>
                <TabsTrigger value="upload" className="rounded-full data-[state=active]:gradient-primary data-[state=active]:text-white">رفع QR</TabsTrigger>
              </TabsList>
              <TabsContent value="manual" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>عنوان المستلم</Label>
                  <Input
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                    placeholder="أدخل عنوان المستلم"
                    className="font-mono text-sm rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label>المبلغ (USD)</Label>
                  <Input
                    type="number"
                    value={sendAmount}
                    onChange={(e) => setSendAmount(e.target.value)}
                    placeholder="0.00"
                    className="text-2xl font-bold rounded-xl"
                  />
                </div>
                <p className="text-xs text-muted-foreground">رسوم: 0.05%</p>
              </TabsContent>
              <TabsContent value="scan" className="mt-4">
                <div className="border-2 border-dashed border-white/20 rounded-2xl p-12 text-center bg-white/30 dark:bg-white/5">
                  <QrCode className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-sm text-muted-foreground">مسح رمز QR</p>
                </div>
              </TabsContent>
              <TabsContent value="upload" className="mt-4">
                <div className="border-2 border-dashed border-white/20 rounded-2xl p-12 text-center bg-white/30 dark:bg-white/5">
                  <Upload className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-sm text-muted-foreground mb-4">رفع صورة رمز QR</p>
                  <Button variant="outline" className="rounded-full">اختيار ملف</Button>
                </div>
              </TabsContent>
            </Tabs>
            <Button
              onClick={handleSend}
              className="w-full rounded-full gradient-primary text-white border-0 shadow-lg"
            >
              <Send className="h-4 w-4 mr-2" />
              إرسال
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Deposit Dialog */}
      <Dialog open={showDepositDialog} onOpenChange={setShowDepositDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>إيداع</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>اختر عملة الإيداع</Label>
              <Select value={depositCurrency} onValueChange={setDepositCurrency}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="اختر العملة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="SYP">SYP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {depositCurrency && (
              <div className="p-4 rounded-xl bg-white/50 dark:bg-white/5 border border-white/20">
                <p className="text-sm font-medium mb-2">طرق الإيداع المتوفرة:</p>
                <p className="text-xs text-muted-foreground">
                  سيتم عرض طرق الإيداع والتعليمات والعناوين من لوحة التحكم
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Withdraw Dialog */}
      <Dialog open={showWithdrawDialog} onOpenChange={setShowWithdrawDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>سحب</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>اختر عملة السحب</Label>
              <Select value={withdrawCurrency} onValueChange={setWithdrawCurrency}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="اختر العملة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="SYP">SYP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {withdrawCurrency && (
              <div className="p-4 rounded-xl bg-white/50 dark:bg-white/5 border border-white/20">
                <p className="text-sm font-medium mb-2">طرق السحب المتوفرة:</p>
                <p className="text-xs text-muted-foreground">
                  سيتم عرض طرق السحب والتعليمات والرسوم من لوحة التحكم
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* ATH Trade Dialog */}
      <Dialog open={showATHDialog} onOpenChange={setShowATHDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{athAction === "buy" ? "شراء" : "بيع"} ATHR</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>الكمية (ATHR)</Label>
              <Input
                type="number"
                value={athAmount}
                onChange={(e) => setAthAmount(e.target.value)}
                placeholder="0.00"
                className="text-2xl font-bold rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label>العملة</Label>
              <Select value={athCurrency} onValueChange={setAthCurrency}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="SYP">SYP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Price Preview */}
            {athPreview && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border border-blue-200 dark:border-blue-800">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">الكمية:</span>
                    <span className="font-bold">{athPreview.amount} ATHR</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">السعر:</span>
                    <span className="font-bold">
                      1 ATHR = {athRates[athCurrency as keyof typeof athRates]} {athCurrency}
                    </span>
                  </div>
                  {athAction === "sell" && parseFloat(athPreview.fee) > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">الرسوم (0.05%):</span>
                      <span className="text-red-600 dark:text-red-400 font-medium">
                        -{athPreview.fee} {athCurrency}
                      </span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-blue-200 dark:border-blue-800">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">
                        {athAction === "buy" ? "المبلغ المطلوب:" : "ستحصل على:"}
                      </span>
                      <span className="text-xl font-bold gradient-text">
                        {athPreview.total} {athCurrency}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <Button
              onClick={handleATHTrade}
              className="w-full rounded-full gradient-primary text-white border-0 shadow-lg"
              disabled={!athAmount || parseFloat(athAmount) <= 0}
            >
              {athAction === "buy" ? "تأكيد الشراء" : "تأكيد البيع"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
