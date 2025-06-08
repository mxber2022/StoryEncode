import React, { useState } from 'react';
import { Database, Wallet, ChevronDown, LogOut, Copy, Check } from 'lucide-react';

interface HeaderProps {
  onShowHistory: () => void;
  isWalletConnected: boolean;
  walletAddress: string;
  onConnectWallet: () => void;
  onDisconnectWallet: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onShowHistory, 
  isWalletConnected, 
  walletAddress, 
  onConnectWallet, 
  onDisconnectWallet 
}) => {
  const [showWalletDropdown, setShowWalletDropdown] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <header className="bg-black/90 backdrop-blur-xl border-b border-gray-800/50 px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          {/* Custom S Logo */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-400/30 via-gray-300/40 to-gray-500/30 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500 p-3 rounded-xl shadow-2xl border border-gray-600/50 backdrop-blur-sm">
              <div className="w-6 h-6 flex items-center justify-center">
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-6 h-6 text-black font-bold"
                  fill="currentColor"
                >
                  <path d="M12 2C8.5 2 6 4.5 6 8c0 1.5 0.5 2.8 1.3 3.8L6 13c-1.1 0.6-2 1.9-2 3.5C4 19.5 6.5 22 10 22h4c3.5 0 6-2.5 6-6c0-1.5-0.5-2.8-1.3-3.8L20 11c1.1-0.6 2-1.9 2-3.5C22 4.5 19.5 2 16 2h-4zm0 2h4c2.5 0 4 1.5 4 3.5c0 0.8-0.3 1.5-0.8 2L18 10.2c0.8 0.8 1.2 1.8 1.2 2.8c0 2.5-1.5 4-4 4h-4c-2.5 0-4-1.5-4-4c0-0.8 0.3-1.5 0.8-2L9 10.2C8.2 9.4 7.8 8.4 7.8 7.5C7.8 5 9.3 3.5 12 3.5z"/>
                </svg>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300 bg-clip-text text-transparent">
              StoryMint
            </h1>
            <p className="text-sm text-gray-400">AI Content & IP Platform</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={onShowHistory}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 text-white rounded-lg font-medium hover:from-gray-600 hover:via-gray-500 hover:to-gray-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border border-gray-500/30"
          >
            <Database className="w-4 h-4" />
            <span>My Registered IP</span>
          </button>

          {/* Wallet Connection */}
          <div className="relative">
            {isWalletConnected ? (
              <div>
                <button
                  onClick={() => setShowWalletDropdown(!showWalletDropdown)}
                  className="flex items-center space-x-3 px-4 py-2 bg-gray-900/80 border border-gray-700/50 rounded-lg hover:bg-gray-800/80 transition-all duration-300 shadow-lg"
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                  <span className="text-sm font-medium text-gray-200">
                    {formatAddress(walletAddress)}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>

                {showWalletDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-lg shadow-2xl z-50">
                    <div className="p-4 border-b border-gray-700/50">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Wallet Address</span>
                        <button
                          onClick={handleCopyAddress}
                          className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
                        >
                          {copied ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                          <span className="text-xs">{copied ? 'Copied!' : 'Copy'}</span>
                        </button>
                      </div>
                      <p className="text-white font-mono text-sm mt-1 break-all">
                        {walletAddress}
                      </p>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={() => {
                          onDisconnectWallet();
                          setShowWalletDropdown(false);
                        }}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-red-400 hover:bg-gray-800/50 rounded-lg transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Disconnect</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onConnectWallet}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 text-white rounded-lg font-medium hover:from-gray-600 hover:via-gray-500 hover:to-gray-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border border-gray-500/30"
              >
                <Wallet className="w-4 h-4" />
                <span>Connect Wallet</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;