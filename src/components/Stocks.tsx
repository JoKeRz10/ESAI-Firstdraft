import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Star, 
  Filter,
  BarChart3,
  Activity,
  Eye,
  Plus,
  Minus
} from "lucide-react";

// Mock stock data
const stocksData = [
  { symbol: "AAPL", name: "Apple Inc.", price: 185.42, change: 2.4, volume: "45.2M", marketCap: "2.8T", sector: "Technology", prediction: "Buy", confidence: 92 },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 142.83, change: -1.2, volume: "28.1M", marketCap: "1.8T", sector: "Communication", prediction: "Hold", confidence: 89 },
  { symbol: "TSLA", name: "Tesla Inc.", price: 248.15, change: 5.8, volume: "52.8M", marketCap: "789B", sector: "Consumer Discretionary", prediction: "Buy", confidence: 94 },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 378.92, change: 1.5, volume: "32.4M", marketCap: "2.9T", sector: "Technology", prediction: "Buy", confidence: 91 },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 156.78, change: -0.8, volume: "41.3M", marketCap: "1.6T", sector: "Consumer Discretionary", prediction: "Hold", confidence: 87 },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 875.30, change: 3.2, volume: "38.7M", marketCap: "2.1T", sector: "Technology", prediction: "Buy", confidence: 96 },
  { symbol: "META", name: "Meta Platforms", price: 485.20, change: -2.1, volume: "19.8M", marketCap: "1.2T", sector: "Communication", prediction: "Hold", confidence: 85 },
  { symbol: "BRK.A", name: "Berkshire Hathaway", price: 627843, change: 0.8, volume: "1.2K", marketCap: "950B", sector: "Financial", prediction: "Hold", confidence: 78 }
];

const marketIndices = [
  { name: "S&P 500", value: "5,189.42", change: 1.2 },
  { name: "NASDAQ", value: "16,274.94", change: 2.1 },
  { name: "DOW", value: "38,834.86", change: 0.8 }
];

const topGainers = [
  { symbol: "TSLA", change: 5.8 },
  { symbol: "NVDA", change: 3.2 },
  { symbol: "AAPL", change: 2.4 }
];

const topLosers = [
  { symbol: "META", change: -2.1 },
  { symbol: "GOOGL", change: -1.2 },
  { symbol: "AMZN", change: -0.8 }
];

interface NavigationProps {
  currentPage: string;
  onGoToHome: () => void;
  onGoToStocks: () => void;
  onGoToPortfolio: () => void;
  onGoToCommunity: () => void;
  onGoToNews: () => void;
  onGoToLearn: () => void;
  onGoToSimulator: () => void;
  onGoToProfile: () => void;
  onGoToDashboard: () => void;
}

interface StocksProps extends NavigationProps {}

export function Stocks({ currentPage, onGoToHome, onGoToStocks, onGoToPortfolio, onGoToCommunity, onGoToNews, onGoToLearn, onGoToSimulator, onGoToProfile, onGoToDashboard }: StocksProps) {
  const [selectedStock, setSelectedStock] = useState(stocksData[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState("all");
  const [selectedView, setSelectedView] = useState("list");

  const sectors = ["all", "Technology", "Communication", "Consumer Discretionary", "Financial"];

  const filteredStocks = stocksData.filter(stock => {
    const matchesSearch = stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         stock.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = selectedSector === "all" || stock.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  const generateMockChartData = () => {
    const data = [];
    const basePrice = selectedStock.price;
    for (let i = 0; i < 30; i++) {
      const variance = (Math.random() - 0.5) * (basePrice * 0.1);
      data.push({
        day: i,
        price: basePrice + variance
      });
    }
    return data;
  };

  const chartData = generateMockChartData();

  return (
    <div className="min-h-screen bg-background">


      <main className="container mx-auto">
        <div className="py-6">
          {/* Market Snapshot */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold mb-6">Market Snapshot</h1>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {marketIndices.map((index) => (
                <Card key={index.name}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{index.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      <p className="text-2xl font-bold">{index.value}</p>
                      <div className={`flex items-center gap-1 text-sm ${
                        index.change >= 0 ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {index.change >= 0 ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        {index.change >= 0 ? '+' : ''}{index.change}%
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Top Gainers & Losers + AI Pick */}
            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-500">
                    <TrendingUp className="w-5 h-5" />
                    Top Gainers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {topGainers.map((stock) => (
                    <div key={stock.symbol} className="flex items-center justify-between">
                      <span className="font-medium">{stock.symbol}</span>
                      <span className="text-green-500">+{stock.change}%</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-500">
                    <TrendingDown className="w-5 h-5" />
                    Top Losers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {topLosers.map((stock) => (
                    <div key={stock.symbol} className="flex items-center justify-between">
                      <span className="font-medium">{stock.symbol}</span>
                      <span className="text-red-500">{stock.change}%</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-primary" />
                    AI Stock Pick
                  </CardTitle>
                  <Badge variant="secondary" className="w-fit">Today's Recommendation</Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-lg">AAPL</span>
                      <Badge className="bg-green-500">Buy</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Expected rise of +5% over next week based on earnings momentum and technical indicators.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Confidence</span>
                      <span className="font-medium text-primary">92%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Stock Search & Filter */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search stocks (e.g., AAPL, Apple)"
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={selectedSector} onValueChange={setSelectedSector}>
                <SelectTrigger className="w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sectors</SelectItem>
                  {sectors.slice(1).map(sector => (
                    <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex rounded-lg border">
                <Button 
                  variant={selectedView === "list" ? "default" : "ghost"} 
                  size="sm"
                  onClick={() => setSelectedView("list")}
                  className="rounded-r-none"
                >
                  List
                </Button>
                <Button 
                  variant={selectedView === "detail" ? "default" : "ghost"} 
                  size="sm"
                  onClick={() => setSelectedView("detail")}
                  className="rounded-l-none"
                >
                  Detail
                </Button>
              </div>
            </div>
          </div>

          {selectedView === "list" ? (
            /* Stock List View */
            <div className="grid gap-4">
              {filteredStocks.map((stock) => (
                <Card key={stock.symbol} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => {
                  console.log('Navigating to dashboard for stock:', stock.symbol);
                  onGoToDashboard();
                }}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <span className="font-medium">{stock.symbol}</span>
                        </div>
                        <div>
                          <p className="font-medium">{stock.symbol}</p>
                          <p className="text-sm text-muted-foreground">{stock.name}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-5 gap-8 text-right">
                        <div>
                          <p className="text-sm text-muted-foreground">Price</p>
                          <p className="font-medium">${stock.price > 1000 ? stock.price.toLocaleString() : stock.price}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Change</p>
                          <p className={`font-medium ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {stock.change >= 0 ? '+' : ''}{stock.change}%
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Volume</p>
                          <p className="font-medium">{stock.volume}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">AI Prediction</p>
                          <Badge variant={stock.prediction === "Buy" ? "default" : "secondary"}>
                            {stock.prediction}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Confidence</p>
                          <p className="font-medium">{stock.confidence}%</p>
                        </div>
                      </div>

                      <Button variant="ghost" size="icon" onClick={(e) => { 
                        e.stopPropagation(); 
                        console.log('Navigating to dashboard via eye button for stock:', stock.symbol);
                        onGoToDashboard(); 
                      }}>
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            /* Stock Detail View */
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">{selectedStock.symbol}</CardTitle>
                      <CardDescription>{selectedStock.name}</CardDescription>
                    </div>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      Live
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Current Price</p>
                      <p className="text-3xl font-bold">${selectedStock.price > 1000 ? selectedStock.price.toLocaleString() : selectedStock.price}</p>
                      <div className={`flex items-center gap-1 text-sm ${
                        selectedStock.change >= 0 ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {selectedStock.change >= 0 ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        {selectedStock.change >= 0 ? '+' : ''}{selectedStock.change}%
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">AI Prediction</p>
                      <Badge 
                        variant={selectedStock.prediction === "Buy" ? "default" : "secondary"}
                        className="text-lg px-3 py-1"
                      >
                        {selectedStock.prediction}
                      </Badge>
                      <p className="text-sm text-muted-foreground">Next 7 days</p>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Confidence Score</p>
                      <div className="space-y-2">
                        <Progress value={selectedStock.confidence} className="h-2" />
                        <p className="text-sm font-medium">{selectedStock.confidence}%</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Market Cap</p>
                      <p className="text-xl font-bold">{selectedStock.marketCap}</p>
                      <p className="text-sm text-muted-foreground">{selectedStock.sector}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Price Chart (30 Days)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 bg-gradient-to-br from-muted/50 to-background rounded-lg p-6 flex items-end justify-center">
                    <div className="flex items-end space-x-1 h-full w-full">
                      {chartData.map((point, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center">
                          <div 
                            className="w-full bg-primary/80 rounded-t-sm transition-all duration-300 hover:bg-primary"
                            style={{ 
                              height: `${Math.max(10, (point.price / selectedStock.price) * 60)}%` 
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                    <span>30 days ago</span>
                    <span className="text-primary font-medium">
                      ${selectedStock.price > 1000 ? selectedStock.price.toLocaleString() : selectedStock.price}
                    </span>
                    <span>Today</span>
                  </div>
                </CardContent>
              </Card>

              <Tabs defaultValue="analysis" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="analysis">Analysis</TabsTrigger>
                  <TabsTrigger value="news">Related News</TabsTrigger>
                  <TabsTrigger value="comments">Community</TabsTrigger>
                </TabsList>
                
                <TabsContent value="analysis" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Technical Indicators</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">RSI (14)</span>
                          <span className="font-medium">67.2</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">MACD</span>
                          <span className="font-medium text-green-500">+2.4</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Moving Average (50)</span>
                          <span className="font-medium">${(selectedStock.price * 0.95).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Volume</span>
                          <span className="font-medium">{selectedStock.volume}</span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Key Metrics</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Market Cap</span>
                          <span className="font-medium">{selectedStock.marketCap}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">P/E Ratio</span>
                          <span className="font-medium">24.5</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">52W High</span>
                          <span className="font-medium">${(selectedStock.price * 1.2).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">52W Low</span>
                          <span className="font-medium">${(selectedStock.price * 0.7).toFixed(2)}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="news" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Related News</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <p className="text-sm font-medium">Q4 Earnings Report Shows Strong Growth</p>
                          <p className="text-xs text-muted-foreground">2 hours ago • MarketWatch</p>
                        </div>
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <p className="text-sm font-medium">Analyst Upgrades Price Target</p>
                          <p className="text-xs text-muted-foreground">5 hours ago • Bloomberg</p>
                        </div>
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <p className="text-sm font-medium">New Product Launch Announcement</p>
                          <p className="text-xs text-muted-foreground">1 day ago • Reuters</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="comments" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Community Discussion</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">TradingPro_2024</span>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className="h-6 px-2">
                                <Plus className="w-3 h-3" />
                                12
                              </Button>
                              <span className="text-xs text-muted-foreground">2h ago</span>
                            </div>
                          </div>
                          <p className="text-sm">Strong technical setup here. Looking for a breakout above $190 resistance level.</p>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">InvestorJane</span>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className="h-6 px-2">
                                <Plus className="w-3 h-3" />
                                8
                              </Button>
                              <span className="text-xs text-muted-foreground">4h ago</span>
                            </div>
                          </div>
                          <p className="text-sm">Earnings beat expectations, but guidance was cautious. Mixed signals here.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}