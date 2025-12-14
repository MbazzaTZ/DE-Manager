import { Package, ShoppingCart, Users, Hand, Store, CheckCircle, TrendingUp } from "lucide-react";
import Header from "@/components/Header";
import StatCard from "@/components/StatCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useInventoryStats, useAgents, useSales } from "@/hooks/useDatabase";
import { format } from "date-fns";

const Dashboard = () => {
  const { data: stats } = useInventoryStats();
  const { data: agents } = useAgents();
  const { data: sales } = useSales();

  // Top agents by sales
  const topAgents = agents
    ?.filter((a) => a.status === "active")
    .sort((a, b) => b.total_sales - a.total_sales)
    .slice(0, 5);

  // Recent sales
  const recentSales = sales?.slice(0, 5);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your inventory and sales</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatCard
            title="Total Stock"
            value={stats?.total || 0}
            icon={Package}
            variant="primary"
          />
          <StatCard
            title="In Store"
            value={stats?.in_store || 0}
            icon={Store}
            variant="info"
          />
          <StatCard
            title="In Hand (Agents)"
            value={stats?.in_hand || 0}
            icon={Hand}
            variant="warning"
          />
          <StatCard
            title="Sold"
            value={stats?.sold || 0}
            icon={CheckCircle}
            variant="success"
          />
        </div>

        {/* Secondary Stats */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          <StatCard
            title="Full Sets"
            value={stats?.full_set || 0}
            icon={Package}
          />
          <StatCard
            title="Decoder Only"
            value={stats?.decoder_only || 0}
            icon={Package}
          />
          <StatCard
            title="Active Agents"
            value={agents?.filter((a) => a.status === "active").length || 0}
            icon={Users}
          />
        </div>

        {/* Tables Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Top Agents */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="gradient-success rounded-lg p-2">
                  <TrendingUp className="h-5 w-5 text-accent-foreground" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">Top Agents</h2>
              </div>
              <Badge variant="secondary">{topAgents?.length || 0} agents</Badge>
            </div>

            {topAgents && topAgents.length > 0 ? (
              <div className="space-y-4">
                {topAgents.map((agent, index) => (
                  <div
                    key={agent.id}
                    className="flex items-center justify-between py-3 border-b border-border last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{agent.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {agent.teams?.name || "No Team"}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="font-mono">
                      {agent.total_sales} sales
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No agents yet</p>
              </div>
            )}
          </Card>

          {/* Recent Sales */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="gradient-primary rounded-lg p-2">
                  <ShoppingCart className="h-5 w-5 text-primary-foreground" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">Recent Sales</h2>
              </div>
              <Badge variant="secondary">{sales?.length || 0} total</Badge>
            </div>

            {recentSales && recentSales.length > 0 ? (
              <div className="space-y-4">
                {recentSales.map((sale) => (
                  <div
                    key={sale.id}
                    className="flex items-center justify-between py-3 border-b border-border last:border-0"
                  >
                    <div>
                      <p className="font-medium text-foreground font-mono">
                        {sale.inventory?.smartcard || "N/A"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {sale.agents?.name || "Unknown"} •{" "}
                        {format(new Date(sale.sale_date), "MMM d")}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant={sale.is_paid ? "default" : "secondary"}>
                        {sale.is_paid ? "Paid" : "Unpaid"}
                      </Badge>
                      {sale.sale_price && (
                        <p className="text-sm font-medium text-foreground mt-1">
                          TZS {sale.sale_price.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <ShoppingCart className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No sales yet</p>
              </div>
            )}
          </Card>

          {/* Channel Performance */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="gradient-info rounded-lg p-2">
                  <TrendingUp className="h-5 w-5 text-info-foreground" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">Channel Performance</h2>
              </div>
              <Badge variant="secondary">{agents?.length || 0} ESPs</Badge>
            </div>

            {agents && agents.length > 0 ? (
              <div className="space-y-4">
                {agents.map((agent) => (
                  <div
                    key={agent.id}
                    className="flex items-center justify-between py-3 border-b border-border last:border-0"
                  >
                    <div>
                      <p className="font-medium text-foreground">{agent.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {agent.status === "active" ? "Active" : "Inactive"}
                      </p>
                    </div>
                    <Badge variant="secondary" className="font-mono">
                      {agent.total_sales} sales
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No ESPs yet</p>
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
