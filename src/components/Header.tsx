import React from "react";
import { Button } from "./ui/button";
import { TrendingUp, User, Menu } from "lucide-react";

interface HeaderProps {
  currentPage?: string;
  onGoToHome?: () => void;
  onGoToStocks?: () => void;
  onGoToPortfolio?: () => void;
  onGoToCommunity?: () => void;
  onGoToNews?: () => void;
  onGoToLearn?: () => void;
  onGoToSimulator?: () => void;
  onGoToProfile?: () => void;
  onGoToDashboard?: () => void;
  onGoToSignup?: () => void;
}

export function Header({
  currentPage,
  onGoToHome,
  onGoToStocks,
  onGoToPortfolio,
  onGoToCommunity,
  onGoToNews,
  onGoToLearn,
  onGoToSimulator,
  onGoToProfile,
  onGoToDashboard,
  onGoToSignup

}: HeaderProps) {
  return (
    <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              onClick={onGoToHome}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-white">
                <img 
                  src="/src/assets/logo.png" 
                  alt="StockEye AI Logo" 
                  className="w-full h-full object-contain p-1"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23666'%3E%3Cpath d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'/%3E%3C/svg%3E";
                  }}
                />
              </div>
              <span className="text-2xl font-semibold ">EyeStock AI</span>
            </button>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={onGoToStocks} 
              className={`transition-colors ${
                currentPage === "stocks" 
                  ? "text-primary font-medium" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Market
            </button>
            <button 
              onClick={onGoToPortfolio} 
              className={`transition-colors relative
                ${
                  currentPage === "portfolio"
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }
              `}
            >
              Wallet
            </button>
            <button 
              onClick={onGoToCommunity} 
              className={`transition-colors ${
                currentPage === "community" 
                  ? "text-primary font-medium" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Community
            </button>
            <button 
              onClick={onGoToNews} 
              className={`transition-colors ${
                currentPage === "news" 
                  ? "text-primary font-medium" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              News
            </button>
            <button 
              onClick={onGoToLearn} 
              className={`transition-colors ${
                currentPage === "learn" 
                  ? "text-primary font-medium" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Learn
            </button>
            <button 
              onClick={onGoToSimulator} 
              className={`transition-colors ${
                currentPage === "simulator" 
                  ? "text-primary font-medium" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Simulator
            </button>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onGoToProfile} size="icon" className="hidden md:flex">
              <User className="w-5 h-5" />
            </Button>
            <Button variant="ghost" onClick={onGoToSignup} className="hidden md:inline-flex">Sign Up</Button>
            <Button onClick={onGoToDashboard}>Get Started</Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

