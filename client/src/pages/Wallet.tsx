import { useState, useEffect, useRef } from "react";
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
import { Copy, QrCode, Download, Send, ArrowDownToLine, ArrowUpFromLine, Upload, TrendingUp, TrendingDown, Camera, X } from "lucide-react";
import QRCode from "react-qr-code";
import { useToast } from "@/hooks/use-toast";
import jsQR from "jsqr";

export default function Wallet() {
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [scanInterval, setScanInterval] = useState<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const userAddress = user?.walletAddress || "Loading...";
  
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
  const [sendCurrency, setSendCurrency] = useState("USD");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [depositCurrency, setDepositCurrency] = useState("");
  const [withdrawCurrency, setWithdrawCurrency] = useState("");
  const [athAmount, setAthAmount] = useState("");
  const [athCurrency, setAthCurrency] = useState("USD");
  const [isCameraActive, setIsCameraActive] = useState(false);

  // Real balances - from user data
  const [usdBalance, setUsdBalance] = useState(parseFloat(user?.usdBalance || "0"));
  const [sypBalance, setSypBalance] = useState(parseFloat(user?.sypBalance || "0"));
  const [athrBalance, setAthrBalance] = useState(parseFloat(user?.athrBalance || "0"));

  useEffect(() => {
    if (user) {
      setUsdBalance(parseFloat(user.usdBalance || "0"));
      setSypBalance(parseFloat(user.sypBalance || "0"));
      setAthrBalance(parseFloat(user.athrBalance || "0"));
    }
  }, [user]);

  // ATHR rates (configurable from admin panel)
  const athRates = {
    USD: 0.001,
    SYP: 11,
  };

  // Scan QR code from video
  const scanQRCode = () => {
    if (videoRef.current && canvasRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext("2d");
      
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        
        if (code) {
          setRecipientAddress(code.data);
          stopCamera();
          // تأخير قليل قبل التحويل للتبويب اليدوي للتأكد من إيقاف الكاميرا
          setTimeout(() => {
            setSendMethod("manual");
          }, 100);
          toast({
            title: "تم المسح بنجاح",
            description: "تم قراءة عنوان المحفظة",
          });
        }
      }
    }
  };

  // Start camera for QR scanning
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
      }
      
      setStream(mediaStream);
      setIsCameraActive(true);
      
      // بدء المسح بعد تشغيل الكاميرا
      const interval = setInterval(scanQRCode, 300);
      setScanInterval(interval);
    } catch (error) {
      console.error("Camera error:", error);
      toast({
        title: "خطأ",
        description: "لا يمكن الوصول إلى الكاميرا. تأكد من منح الإذن",
        variant: "destructive",
      });
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (scanInterval) {
      clearInterval(scanInterval);
      setScanInterval(null);
    }
    setIsCameraActive(false);
  };

  // Handle file upload for QR
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "معالجة الصورة",
        description: "جاري معالجة رمز QR...",
      });
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          if (canvasRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");
            
            if (context) {
              canvas.width = img.width;
              canvas.height = img.height;
              context.drawImage(img, 0, 0);
              
              const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
              const code = jsQR(imageData.data, imageData.width, imageData.height);
              
              if (code) {
                setRecipientAddress(code.data);
                setSendMethod("manual");
                toast({
                  title: "تم القراءة",
                  description: "تم قراءة عنوان المحفظة من الصورة",
                });
              } else {
                toast({
                  title: "خطأ",
                  description: "لم يتم العثور على رمز QR في الصورة",
                  variant: "destructive",
                });
              }
            }
          }
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
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

  // Calculate send preview with fees
  const calculateSendPreview = () => {
    if (!sendAmount || parseFloat(sendAmount) <= 0) return null;
    
    const amount = parseFloat(sendAmount);
    const fee = amount * 0.0005; // 0.05% fee
    const total = amount + fee;
    
    return {
      amount: amount.toFixed(2),
      fee: fee.toFixed(2),
      total: total.toFixed(2),
      willReceive: amount.toFixed(2),
    };
  };

  const sendPreview = calculateSendPreview();

  const handleSend = async () => {
    if (!sendAmount || !recipientAddress) {
      toast({
        title: "خطأ",
        description: "الرجاء ملء جميع الحقول",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "خطأ",
        description: "الرجاء تسجيل الدخول",
        variant: "destructive",
      });
      return;
    }

    const amount = parseFloat(sendAmount);
    const fee = amount * 0.0005;
    const total = amount + fee;

    // Check balance based on currency
    const currentBalance = sendCurrency === "USD" ? usdBalance : sypBalance;
    if (total > currentBalance) {
      toast({
        title: "خطأ",
        description: "الرصيد غير كافي",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("/api/wallet/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          recipientAddress,
          amount: sendAmount,
          currency: sendCurrency,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      // Update balances
      if (sendCurrency === "USD") {
        setUsdBalance(parseFloat(data.senderBalance));
        const updatedUser = { ...user, usdBalance: data.senderBalance };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      } else {
        setSypBalance(parseFloat(data.senderBalance));
        const updatedUser = { ...user, sypBalance: data.senderBalance };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }

      toast({
        title: "تم الإرسال بنجاح",
        description: `تم إرسال ${amount.toFixed(2)} ${sendCurrency} مع رسوم ${fee.toFixed(2)} ${sendCurrency}`,
      });

      setShowSendDialog(false);
      setSendAmount("");
      setRecipientAddress("");
      stopCamera();
    } catch (error: any) {
      toast({
        title: "خطأ",
        description: error.message || "فشل الإرسال",
        variant: "destructive",
      });
    }
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

    if (!user) {
      toast({
        title: "خطأ",
        description: "الرجاء تسجيل الدخول",
        variant: "destructive",
      });
      return;
    }

    const amount = parseFloat(athAmount);
    const rate = athRates[athCurrency as keyof typeof athRates];
    
    try {
      const response = await fetch("/api/wallet/trade-athr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          action: athAction,
          amount: athAmount,
          currency: athCurrency,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      // Update local state
      if (data.balances.usdBalance) setUsdBalance(parseFloat(data.balances.usdBalance));
      if (data.balances.sypBalance) setSypBalance(parseFloat(data.balances.sypBalance));
      if (data.balances.athrBalance) setAthrBalance(parseFloat(data.balances.athrBalance));

      // Update user in localStorage
      const updatedUser = { ...user, ...data.balances };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      if (athAction === "buy") {
        const total = amount * rate;
        toast({
          title: "تم الشراء بنجاح",
          description: `تم شراء ${amount.toFixed(2)} ATHR مقابل ${total.toFixed(2)} ${athCurrency}`,
        });
      } else {
        const totalBeforeFee = amount * rate;
        const fee = totalBeforeFee * 0.0005;
        const netAmount = totalBeforeFee - fee;
        toast({
          title: "تم البيع بنجاح",
          description: `تم بيع ${amount.toFixed(2)} ATHR مقابل ${netAmount.toFixed(2)} ${athCurrency}`,
        });
      }

      setShowATHDialog(false);
      setAthAmount("");
    } catch (error: any) {
      toast({
        title: "خطأ",
        description: error.message || "فشلت العملية",
        variant: "destructive",
      });
    }
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
        fee: "0.00",
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

  // Clean up camera on unmount or dialog close
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  useEffect(() => {
    if (!showSendDialog) {
      stopCamera();
      setSendMethod("manual");
      setIsCameraActive(false);
    }
  }, [showSendDialog]);

  // إيقاف الكاميرا عند التحويل من تبويب المسح
  useEffect(() => {
    if (sendMethod !== "scan" && isCameraActive) {
      stopCamera();
    }
  }, [sendMethod]);

  return (
    <div className="space-y-8 max-w-7xl" data-testid="wallet-page">
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
              data-testid="wallet-address"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={handleCopyAddress}
              className="rounded-xl backdrop-blur-sm bg-background/50 border-white/20"
              data-testid="button-copy-address"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowQRDialog(true)}
              className="rounded-xl backdrop-blur-sm bg-background/50 border-white/20"
              data-testid="button-show-qr"
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
            <div className="text-4xl font-bold tabular-nums" data-testid="balance-usd">${usdBalance.toFixed(2)}</div>
            <div className="grid grid-cols-3 gap-2">
              <Button
                onClick={() => {
                  setSendCurrency("USD");
                  setShowSendDialog(true);
                }}
                className="rounded-full gradient-primary text-white border-0 shadow-lg"
                size="sm"
                data-testid="button-send-usd"
              >
                <Send className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => {
                  setDepositCurrency("USD");
                  setShowDepositDialog(true);
                }}
                variant="outline"
                className="rounded-full backdrop-blur-sm bg-background/50 border-white/20"
                size="sm"
                data-testid="button-deposit-usd"
              >
                <ArrowDownToLine className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => {
                  setWithdrawCurrency("USD");
                  setShowWithdrawDialog(true);
                }}
                variant="outline"
                className="rounded-full backdrop-blur-sm bg-background/50 border-white/20"
                size="sm"
                data-testid="button-withdraw-usd"
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
            <div className="text-4xl font-bold tabular-nums" data-testid="balance-syp">{sypBalance.toLocaleString()} SYP</div>
            <div className="grid grid-cols-3 gap-2">
              <Button
                onClick={() => {
                  setSendCurrency("SYP");
                  setShowSendDialog(true);
                }}
                className="rounded-full gradient-primary text-white border-0 shadow-lg"
                size="sm"
                data-testid="button-send-syp"
              >
                <Send className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => {
                  setDepositCurrency("SYP");
                  setShowDepositDialog(true);
                }}
                variant="outline"
                className="rounded-full backdrop-blur-sm bg-background/50 border-white/20"
                size="sm"
                data-testid="button-deposit-syp"
              >
                <ArrowDownToLine className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => {
                  setWithdrawCurrency("SYP");
                  setShowWithdrawDialog(true);
                }}
                variant="outline"
                className="rounded-full backdrop-blur-sm bg-background/50 border-white/20"
                size="sm"
                data-testid="button-withdraw-syp"
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
          <div className="text-4xl font-bold tabular-nums" data-testid="balance-athr">{athrBalance.toFixed(2)} ATHR</div>
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
              data-testid="button-buy-athr"
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
              data-testid="button-sell-athr"
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
              data-testid="button-download-qr"
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
            <DialogTitle>إرسال {sendCurrency}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Tabs value={sendMethod} onValueChange={(v) => setSendMethod(v as any)}>
              <TabsList className="grid w-full grid-cols-3 bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-full p-1">
                <TabsTrigger value="manual" className="rounded-full data-[state=active]:gradient-primary data-[state=active]:text-white" data-testid="tab-manual">يدوي</TabsTrigger>
                <TabsTrigger value="scan" className="rounded-full data-[state=active]:gradient-primary data-[state=active]:text-white" data-testid="tab-scan">مسح QR</TabsTrigger>
                <TabsTrigger value="upload" className="rounded-full data-[state=active]:gradient-primary data-[state=active]:text-white" data-testid="tab-upload">رفع QR</TabsTrigger>
              </TabsList>
              
              <TabsContent value="manual" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>عنوان المستلم</Label>
                  <Input
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                    placeholder="أدخل عنوان المستلم"
                    className="font-mono text-sm rounded-xl"
                    data-testid="input-recipient-address"
                  />
                </div>
                <div className="space-y-2">
                  <Label>المبلغ ({sendCurrency})</Label>
                  <Input
                    type="number"
                    value={sendAmount}
                    onChange={(e) => setSendAmount(e.target.value)}
                    placeholder="0.00"
                    className="text-2xl font-bold rounded-xl"
                    data-testid="input-send-amount"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="scan" className="mt-4">
                {!isCameraActive ? (
                  <div className="border-2 border-dashed border-white/20 rounded-2xl p-12 text-center bg-white/30 dark:bg-white/5">
                    <Camera className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <p className="text-sm text-muted-foreground mb-4">مسح رمز QR باستخدام الكاميرا</p>
                    <Button 
                      onClick={startCamera}
                      className="gradient-primary"
                      data-testid="button-start-camera"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      تشغيل الكاميرا
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative rounded-2xl overflow-hidden bg-black">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full h-64 object-cover"
                      />
                      <canvas ref={canvasRef} className="hidden" />
                    </div>
                    <Button
                      onClick={stopCamera}
                      variant="outline"
                      className="w-full"
                      data-testid="button-stop-camera"
                    >
                      <X className="h-4 w-4 mr-2" />
                      إيقاف الكاميرا
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="upload" className="mt-4">
                <div className="border-2 border-dashed border-white/20 rounded-2xl p-12 text-center bg-white/30 dark:bg-white/5">
                  <Upload className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-sm text-muted-foreground mb-4">رفع صورة رمز QR</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button 
                    variant="outline" 
                    className="rounded-full"
                    onClick={() => fileInputRef.current?.click()}
                    data-testid="button-upload-qr"
                  >
                    اختيار ملف
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            {/* Send Preview */}
            {sendPreview && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border border-blue-200 dark:border-blue-800">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">المبلغ:</span>
                    <span className="font-bold">{sendPreview.amount} {sendCurrency}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">الرسوم (0.05%):</span>
                    <span className="text-red-600 dark:text-red-400 font-medium">
                      +{sendPreview.fee} {sendCurrency}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-blue-200 dark:border-blue-800">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">الإجمالي:</span>
                      <span className="text-xl font-bold gradient-text">
                        {sendPreview.total} {sendCurrency}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">سيستلم:</span>
                    <span className="font-medium text-green-600 dark:text-green-400">
                      {sendPreview.willReceive} {sendCurrency}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <Button
              onClick={handleSend}
              className="w-full rounded-full gradient-primary text-white border-0 shadow-lg"
              disabled={!sendAmount || !recipientAddress || parseFloat(sendAmount) <= 0}
              data-testid="button-confirm-send"
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
                data-testid="input-athr-amount"
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
              data-testid="button-confirm-athr-trade"
            >
              {athAction === "buy" ? "تأكيد الشراء" : "تأكيد البيع"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
