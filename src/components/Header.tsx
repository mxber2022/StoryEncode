import React, { useState } from 'react';
import { Database, Wallet, ChevronDown, LogOut, Copy, Check } from 'lucide-react';
import { useConnectModal } from '@tomo-inc/tomo-evm-kit';
import { useAccount, useDisconnect } from 'wagmi';

interface HeaderProps {
  onShowHistory: () => void;
}

const Header: React.FC<HeaderProps> = ({ onShowHistory }) => {
  const { openConnectModal } = useConnectModal();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [showWalletDropdown, setShowWalletDropdown] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setShowWalletDropdown(false);
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <header className="bg-black/90 backdrop-blur-xl border-b border-gray-800/50 px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
      <div className="flex items-center gap-3">
  <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-400 to-mint-500">
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 text-white"
    >
      <path
        d="M70 30C70 20 30 20 30 40C30 60 70 60 70 80C70 90 30 90 30 70"
        stroke="white"
        strokeWidth="10"
        strokeLinecap="round"
      />
    </svg>
  </div>
  <div>
    <h1 className="text-2xl font-semibold text-white">GPT.IP</h1>
    {/* <p className="text-sm text-gray-400">AI Content & IP Platform</p> */}
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
            {isConnected && address ? (
              <div>
                <button
                  onClick={() => setShowWalletDropdown(!showWalletDropdown)}
                  className="flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-green-700 via-green-600 to-green-700 border border-green-400/50 rounded-lg hover:bg-green-800/80 transition-all duration-300 shadow-lg"
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                  <span className="text-sm font-medium text-white">
                    {formatAddress(address)}
                  </span>
                  <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full ml-2">Connected</span>
                  <ChevronDown className="w-4 h-4 text-white" />
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
                        {address}
                      </p>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={handleDisconnect}
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
                onClick={() => openConnectModal?.()}
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