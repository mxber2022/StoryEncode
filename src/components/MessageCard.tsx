import React from 'react';
import { User, Sparkles, Shield, Shuffle, ExternalLink, Clock, CheckCircle, XCircle, Loader } from 'lucide-react';
import { ChatMessage } from '../types';

interface MessageCardProps {
  message: ChatMessage;
  onRegisterIP: (messageId: string) => void;
  onRemix: (message: ChatMessage) => void;
}

const MessageCard: React.FC<MessageCardProps> = ({ message, onRegisterIP, onRemix }) => {
  const getStatusBadge = () => {
    switch (message.registrationStatus) {
      case 'pending':
        return (
          <span className="inline-flex items-center space-x-2 px-3 py-1.5 bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 rounded-full text-sm font-medium backdrop-blur-sm">
            <Loader className="w-3 h-3 animate-spin" />
            <span>Registering...</span>
          </span>
        );
      case 'confirmed':
        return (
          <span className="inline-flex items-center space-x-2 px-3 py-1.5 bg-green-500/10 text-green-400 border border-green-500/30 rounded-full text-sm font-medium backdrop-blur-sm">
            <CheckCircle className="w-3 h-3" />
            <span>Registered</span>
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center space-x-2 px-3 py-1.5 bg-red-500/10 text-red-400 border border-red-500/30 rounded-full text-sm font-medium backdrop-blur-sm">
            <XCircle className="w-3 h-3" />
            <span>Failed</span>
          </span>
        );
      default:
        return null;
    }
  };

  if (message.type === 'user') {
    return (
      <div className="flex justify-end group">
        <div className="max-w-2xl relative">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-600/20 to-gray-700/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
          <div className="relative bg-gradient-to-br from-gray-700 via-gray-600 to-gray-700 text-white rounded-2xl rounded-tr-lg px-6 py-5 shadow-2xl border border-gray-600/50 backdrop-blur-sm">
            <div className="flex items-start space-x-4">
              <div className="flex-1">
                <p className="text-white/95 leading-relaxed text-base font-normal break-words">{message.content}</p>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
                  <span className="text-xs text-white/60 flex items-center space-x-1.5">
                    <Clock className="w-3 h-3" />
                    <span>{message.timestamp.toLocaleTimeString()}</span>
                  </span>
                  {message.remixedFrom && (
                    <span className="text-xs text-white/80 bg-white/10 px-2.5 py-1 rounded-full backdrop-blur-sm">
                      Remix
                    </span>
                  )}
                </div>
              </div>
              <div className="bg-white/15 p-2.5 rounded-full flex-shrink-0 backdrop-blur-sm border border-white/20">
                <User className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start group">
      <div className="max-w-4xl relative w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-700/10 to-gray-800/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
        <div className="relative bg-gray-900/70 backdrop-blur-xl rounded-2xl rounded-tl-lg shadow-2xl border border-gray-700/50 overflow-hidden">
          <div className="p-6">
            <div className="flex items-start space-x-5">
              <div className="bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500 p-2.5 rounded-full flex-shrink-0 shadow-xl border border-gray-600/30">
                <Sparkles className="w-5 h-5 text-black" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="prose prose-gray max-w-none">
                  <div className="whitespace-pre-wrap text-gray-100 leading-relaxed text-base font-normal tracking-normal break-words">
                    {message.content}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions and Status */}
            <div className="mt-6 pt-5 border-t border-gray-700/50">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  {message.registrationStatus !== 'confirmed' && (
                    <button
                      onClick={() => onRegisterIP(message.id)}
                      disabled={message.registrationStatus === 'pending'}
                      className="group/btn relative overflow-hidden flex items-center space-x-2.5 px-5 py-2.5 bg-gradient-to-r from-green-600 via-green-500 to-green-600 text-white rounded-xl font-medium hover:from-green-500 hover:via-green-400 hover:to-green-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border border-green-500/30 text-sm"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
                      <Shield className="w-4 h-4 relative z-10" />
                      <span className="relative z-10">Register as IP</span>
                    </button>
                  )}

                  <button
                    onClick={() => onRemix(message)}
                    className="group/btn relative overflow-hidden flex items-center space-x-2.5 px-5 py-2.5 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 text-white rounded-xl font-medium hover:from-orange-500 hover:via-orange-400 hover:to-orange-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border border-orange-500/30 text-sm"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
                    <Shuffle className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">Remix</span>
                  </button>
                </div>

                <div className="flex items-center space-x-3">
                  {getStatusBadge()}
                  <span className="text-sm text-gray-400 flex items-center space-x-1.5">
                    <Clock className="w-3 h-3" />
                    <span>{message.timestamp.toLocaleTimeString()}</span>
                  </span>
                </div>
              </div>

              {/* Metadata for registered content */}
              {message.metadata && (
                <div className="mt-5 p-5 bg-gradient-to-r from-green-500/5 via-green-400/10 to-green-500/5 rounded-xl border border-green-500/20 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-green-400 mb-1.5 text-base">
                        {message.metadata.title}
                      </h4>
                      <p className="text-sm text-green-300/80">
                        Registered on {message.metadata.registrationDate.toLocaleDateString()}
                      </p>
                    </div>
                    <button className="group/link flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors px-3 py-2 rounded-lg hover:bg-green-500/10">
                      <ExternalLink className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                      <span className="text-sm font-medium">View on-chain</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;