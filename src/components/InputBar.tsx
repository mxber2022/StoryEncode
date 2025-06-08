import React from 'react';
import { Send, X, Shuffle, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types';

interface InputBarProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  remixingFrom?: ChatMessage | null;
  onClearRemix?: () => void;
}

const InputBar: React.FC<InputBarProps> = ({ 
  value, 
  onChange, 
  onSend, 
  remixingFrom, 
  onClearRemix 
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="sticky bottom-0 border-t border-gray-800/50 bg-black/95 backdrop-blur-xl px-6 py-5">
      <div className="max-w-4xl mx-auto">
        {remixingFrom && (
          <div className="mb-4 p-4 bg-gradient-to-r from-orange-500/10 via-orange-400/15 to-orange-500/10 border border-orange-500/30 rounded-xl backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-orange-500/20 p-2 rounded-lg">
                  <Shuffle className="w-4 h-4 text-orange-400" />
                </div>
                <div>
                  <span className="text-sm font-medium text-orange-300">
                    Remixing content
                  </span>
                  <p className="text-xs text-orange-400/80 mt-0.5">
                    Building upon existing work with proper attribution
                  </p>
                </div>
              </div>
              <button
                onClick={onClearRemix}
                className="text-orange-400 hover:text-orange-300 transition-colors p-2 hover:bg-orange-500/10 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-600/20 via-gray-500/30 to-gray-600/20 rounded-2xl blur-xl group-focus-within:blur-2xl transition-all duration-500"></div>
          <div className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl group-focus-within:border-gray-600/70 transition-all duration-300">
            <div className="flex items-end space-x-4 p-4">
              <div className="flex-1">
                <textarea
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Describe your creative vision..."
                  className="w-full resize-none bg-transparent text-gray-200 placeholder-gray-400 focus:outline-none text-base leading-relaxed min-h-[56px] max-h-40 font-normal tracking-normal"
                  rows={2}
                />
              </div>
              <button
                onClick={onSend}
                disabled={!value.trim()}
                className="group/btn relative overflow-hidden p-3 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 text-white rounded-xl hover:from-gray-500 hover:via-gray-400 hover:to-gray-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border border-gray-500/30 flex-shrink-0"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
                <Send className="w-5 h-5 relative z-10" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-sm text-gray-400">
          {/* <div className="flex items-center space-x-4">
            <p className="font-normal">Press Enter to send, Shift+Enter for new line</p>
            <div className="hidden sm:flex items-center space-x-2">
              <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
              <span className="font-normal">AI-powered creativity</span>
            </div>
          </div> */}
          {/* <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-gray-500" />
            <span className="font-normal">Powered by StoryMint AI</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default InputBar;