import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Bell, Lock, Globe, Palette } from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Customize your experience</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>Manage your notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="chat-notifs" className="cursor-pointer">
                Chat Messages
              </Label>
              <Switch id="chat-notifs" defaultChecked data-testid="switch-chat-notifications" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="friend-notifs" className="cursor-pointer">
                Friend Requests
              </Label>
              <Switch id="friend-notifs" defaultChecked data-testid="switch-friend-notifications" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="wallet-notifs" className="cursor-pointer">
                Wallet Activity
              </Label>
              <Switch id="wallet-notifs" defaultChecked data-testid="switch-wallet-notifications" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifs" className="cursor-pointer">
                Email Notifications
              </Label>
              <Switch id="email-notifs" data-testid="switch-email-notifications" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Privacy
            </CardTitle>
            <CardDescription>Control your privacy settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="profile-visibility" className="cursor-pointer">
                Profile Visible
              </Label>
              <Switch id="profile-visibility" defaultChecked data-testid="switch-profile-visibility" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="online-status" className="cursor-pointer">
                Show Online Status
              </Label>
              <Switch id="online-status" defaultChecked data-testid="switch-online-status" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="who-message">Who Can Message You</Label>
              <Select defaultValue="everyone">
                <SelectTrigger id="who-message" data-testid="select-message-privacy">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="everyone">Everyone</SelectItem>
                  <SelectItem value="friends">Friends Only</SelectItem>
                  <SelectItem value="none">No One</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Language & Region
            </CardTitle>
            <CardDescription>Set your language preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select defaultValue="en">
                <SelectTrigger id="language" data-testid="select-language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ar">العربية (Arabic)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select defaultValue="utc">
                <SelectTrigger id="timezone" data-testid="select-timezone">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="damascus">Damascus (UTC+3)</SelectItem>
                  <SelectItem value="dubai">Dubai (UTC+4)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Appearance
            </CardTitle>
            <CardDescription>Customize how Athar looks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <Select defaultValue="system">
                <SelectTrigger id="theme" data-testid="select-theme">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="compact-mode" className="cursor-pointer">
                Compact Mode
              </Label>
              <Switch id="compact-mode" data-testid="switch-compact-mode" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full" data-testid="button-change-password">
            Change Password
          </Button>
          <Button variant="outline" className="w-full" data-testid="button-export-data">
            Export My Data
          </Button>
          <Button variant="destructive" className="w-full" data-testid="button-delete-account">
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
