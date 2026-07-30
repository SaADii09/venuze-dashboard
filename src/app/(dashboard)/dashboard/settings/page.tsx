"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-dark-brown">Settings</h1>
        <p className="text-dark-brown/60 mt-1">
          Manage your account settings and preferences.
        </p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardContent>
          <h2 className="text-lg font-semibold text-dark-brown mb-4">
            Profile
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center">
                <span className="text-xl font-bold text-primary-500">JD</span>
              </div>
              <div>
                <Button variant="secondary" size="sm">
                  Change avatar
                </Button>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="First name" defaultValue="John" />
              <Input label="Last name" defaultValue="Doe" />
            </div>
            <Input label="Email" type="email" defaultValue="john@venuze.com" />
            <Input label="Phone" defaultValue="+44 20 1234 5678" />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardContent>
          <h2 className="text-lg font-semibold text-dark-brown mb-4">
            Notifications
          </h2>
          <div className="space-y-4">
            {[
              {
                label: "Email notifications",
                description: "Receive email updates about your bookings",
              },
              {
                label: "Marketing emails",
                description:
                  "Receive tips, trends, and promotions for your venues",
              },
              {
                label: "Security alerts",
                description:
                  "Get notified about important account security updates",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
              >
                <div>
                  <p className="font-medium text-dark-brown text-sm">
                    {item.label}
                  </p>
                  <p className="text-xs text-dark-brown/50">
                    {item.description}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500" />
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Password Settings */}
      <Card>
        <CardContent>
          <h2 className="text-lg font-semibold text-dark-brown mb-4">
            Change Password
          </h2>
          <div className="space-y-4">
            <Input
              label="Current password"
              type="password"
              placeholder="••••••••"
            />
            <Input
              label="New password"
              type="password"
              placeholder="••••••••"
            />
            <Input
              label="Confirm new password"
              type="password"
              placeholder="••••••••"
            />
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardContent>
          <h2 className="text-lg font-semibold text-red-600 mb-2">
            Danger Zone
          </h2>
          <p className="text-sm text-dark-brown/60 mb-4">
            Permanently delete your account and all associated data.
          </p>
          <Button variant="danger" size="sm">
            Delete account
          </Button>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex items-center gap-4">
        <Button onClick={handleSave}>
          {saved ? "Saved!" : "Save changes"}
        </Button>
        {saved && (
          <span className="text-sm text-green-600 font-medium">
            Settings saved successfully
          </span>
        )}
      </div>
    </div>
  );
}
