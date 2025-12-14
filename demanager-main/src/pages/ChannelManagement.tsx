import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { TrendingUp } from "lucide-react";

const channelMetrics = [
  "Opening ESP Count",
  "New ESP Count",
  "Existing ESP Count",
  "Churned ESP Count",
  "Closing ESP Count",
  "Sales (New ESP)",
  "Sales (Existing ESP)",
  "Sales (Total ESP)",
  "Prod/ESP (New ESP)",
  "Prod/ESP (Existing ESP)",
  "Prod/ESP (Total ESP)",
];

const ChannelManagement = () => {
  const [metrics, setMetrics] = useState<{ [key: string]: number | "" }>(
    Object.fromEntries(channelMetrics.map((label) => [label, ""]))
  );

  const handleInputChange = (label: string, value: string) => {
    setMetrics((prev) => ({ ...prev, [label]: value === "" ? "" : Number(value) }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Channel Management</h1>
          <p className="text-muted-foreground">Manage and analyze ESP (Channel) performance metrics</p>
        </div>
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="gradient-info rounded-lg p-2">
                <TrendingUp className="h-5 w-5 text-info-foreground" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Channel Performance</h2>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left py-2 px-4 bg-muted font-bold">TYPE</th>
                  <th className="text-left py-2 px-4 bg-muted font-bold">Value</th>
                </tr>
              </thead>
              <tbody>
                {channelMetrics.map((label) => (
                  <tr key={label} className="border-b border-border last:border-0">
                    <td className="py-2 px-4 font-medium text-foreground">{label}</td>
                    <td className="py-2 px-4">
                      <input
                        type="number"
                        className="w-32 px-2 py-1 border rounded bg-background text-foreground"
                        placeholder="Enter value"
                        value={metrics[label]}
                        onChange={(e) => handleInputChange(label, e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default ChannelManagement;
