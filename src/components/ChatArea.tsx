import React, { useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import MessageCard from './MessageCard';
import { MessageCircle, Sparkles, Zap, ArrowRight } from 'lucide-react';

interface ChatAreaProps {
  messages: ChatMessage[];
  onRegisterIP: (messageId: string) => void;
  onRemix: (message: ChatMessage) => void;
}

const ChatArea: React.FC<ChatAreaProps> = ({ messages, onRegisterIP, onRemix }) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const scrollableRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (bottomRef.current && scrollableRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col min-h-0 px-2 sm:px-6 py-6 pb-20">
      <div ref={scrollableRef} className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden max-w-4xl mx-auto w-full space-y-6">
        {messages.length === 0 ? (
          <div className="text-center py-20">
            {/* Hero Section */}
            <div className="relative mb-10">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-600/10 via-gray-500/20 to-gray-600/10 rounded-full blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-gray-700/40 via-gray-600/40 to-gray-700/40 w-20 h-20 rounded-full flex items-center justify-center mx-auto border border-gray-600/50 shadow-2xl backdrop-blur-sm">
                <MessageCircle className="w-8 h-8 text-gray-200" />
              </div>
            </div>
            <div className="space-y-3 mb-10">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-100 via-white to-gray-200 bg-clip-text text-transparent tracking-tight">
                Create. Protect. Monetize.
              </h1>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed font-normal">
                Transform your creative ideas into protected intellectual property with AI-powered content generation and blockchain registration.
              </p>
            </div>
            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-600/20 to-gray-700/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-gray-600/70 transition-all duration-500 group-hover:transform group-hover:scale-105">
                  <div className="bg-gradient-to-br from-gray-600/30 via-gray-500/30 to-gray-600/30 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 border border-gray-600/50 shadow-lg">
                    <Sparkles className="w-6 h-6 text-gray-200" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-100 mb-2">AI Generation</h3>
                  <p className="text-sm text-gray-400 leading-relaxed font-normal">Create unique stories, poems, and content with advanced AI models tailored for creative expression.</p>
                </div>
              </div>
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-emerald-700/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-green-600/50 transition-all duration-500 group-hover:transform group-hover:scale-105">
                  <div className="bg-gradient-to-br from-green-600/30 via-green-500/30 to-emerald-600/30 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 border border-green-600/50 shadow-lg">
                    <MessageCircle className="w-6 h-6 text-green-200" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-100 mb-2">IP Protection</h3>
                  <p className="text-sm text-gray-400 leading-relaxed font-normal">Register your creative works on-chain with immutable proof of ownership and creation timestamp.</p>
                </div>
              </div>
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-amber-700/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-orange-600/50 transition-all duration-500 group-hover:transform group-hover:scale-105">
                  <div className="bg-gradient-to-br from-orange-600/30 via-orange-500/30 to-amber-600/30 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 border border-orange-600/50 shadow-lg">
                    <Zap className="w-6 h-6 text-orange-200" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-100 mb-2">Remix & Build</h3>
                  <p className="text-sm text-gray-400 leading-relaxed font-normal">Iterate and build upon existing content while maintaining proper attribution and licensing.</p>
                </div>
              </div>
            </div>
            {/* CTA Section */}
            <div className="bg-gradient-to-r from-gray-900/50 via-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-gray-100 mb-3">Ready to get started?</h3>
              <p className="text-sm text-gray-400 mb-4 font-normal">Type your first prompt below to begin creating and protecting your intellectual property.</p>
              <div className="flex items-center justify-center space-x-2 text-gray-300">
                <span className="text-sm font-normal">Start with something like:</span>
                <ArrowRight className="w-4 h-4" />
                <span className="text-sm font-medium">"Write a short story about..."</span>
              </div>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <MessageCard
                key={message.id}
                message={message}
                onRegisterIP={onRegisterIP}
                onRemix={onRemix}
              />
            ))}
            <div ref={bottomRef} />
          </>
        )}
      </div>
    </div>
  );
};

export default ChatArea;