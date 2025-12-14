import { useState } from "react";
import { Search, Package, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import SearchResultCard from "@/components/SearchResultCard";
import { useSearch } from "@/hooks/useDatabase";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const { data: searchResults, isLoading } = useSearch(submittedQuery);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setSubmittedQuery(searchQuery.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-2xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12 animate-slide-up">
            <div className="flex justify-center mb-6">
              <div className="gradient-primary rounded-2xl p-4 shadow-lg">
                <Package className="h-12 w-12 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              DE Manager
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Search for stock items by smartcard or serial number, or find agents by name
            </p>
          </div>

          {/* Search Box */}
          <div className="glass rounded-2xl p-6 mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter smartcard, serial number, or agent name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-12 h-12 text-base bg-background border-border"
                />
              </div>
              <Button
                onClick={handleSearch}
                disabled={isLoading || !searchQuery.trim()}
                className="h-12 px-6 gradient-primary hover:opacity-90 transition-opacity"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <Search className="h-5 w-5 mr-2" />
                    Search
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            {submittedQuery && !isLoading && (
              <>
                {searchResults?.inventory && (
                  <SearchResultCard type="inventory" data={searchResults.inventory} />
                )}
                
                {searchResults?.agents && searchResults.agents.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Matching Agents</h3>
                    {searchResults.agents.map((agent: any) => (
                      <SearchResultCard key={agent.id} type="agent" data={agent} />
                    ))}
                  </div>
                )}

                {!searchResults?.inventory && 
                 (!searchResults?.agents || searchResults.agents.length === 0) && (
                  <div className="text-center py-12 glass rounded-2xl animate-fade-in">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      No Results Found
                    </h3>
                    <p className="text-muted-foreground">
                      No stock items or agents match "{submittedQuery}"
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Instructions when no search */}
          {!submittedQuery && (
            <div className="text-center text-muted-foreground animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <p className="text-sm">
                Enter a smartcard number, serial number, or agent name to search
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
