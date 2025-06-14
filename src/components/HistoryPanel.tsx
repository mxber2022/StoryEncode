import React, { useState } from 'react';
import { X, Search, Filter, ExternalLink, Calendar, Tag, Shield, Download, Share2 } from 'lucide-react';
import { RegisteredIP } from '../types';

interface HistoryPanelProps {
  registeredIPs: RegisteredIP[];
  onClose: () => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ registeredIPs, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedIP, setSelectedIP] = useState<RegisteredIP | null>(null);

  const filteredIPs = registeredIPs.filter(ip => {
    const matchesSearch = ip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ip.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === 'all' || ip.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || ip.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'failed': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'story': return '📖';
      case 'poem': return '📝';
      case 'image': return '🎨';
      case 'code': return '💻';
      default: return '📄';
    }
  };

  return (
    <div className="w-96 bg-gray-900/90 backdrop-blur-xl border-l border-gray-800/50 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-800/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {/* Custom S Logo */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-400/20 via-gray-300/30 to-gray-500/20 rounded-lg blur-md group-hover:blur-lg transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500 p-2 rounded-lg shadow-xl border border-gray-600/40 backdrop-blur-sm">
                <div className="w-5 h-5 flex items-center justify-center">
                  <svg 
                    viewBox="0 0 24 24" 
                    className="w-5 h-5 text-black font-bold"
                    fill="currentColor"
                  >
                    <path d="M12 2C8.5 2 6 4.5 6 8c0 1.5 0.5 2.8 1.3 3.8L6 13c-1.1 0.6-2 1.9-2 3.5C4 19.5 6.5 22 10 22h4c3.5 0 6-2.5 6-6c0-1.5-0.5-2.8-1.3-3.8L20 11c1.1-0.6 2-1.9 2-3.5C22 4.5 19.5 2 16 2h-4zm0 2h4c2.5 0 4 1.5 4 3.5c0 0.8-0.3 1.5-0.8 2L18 10.2c0.8 0.8 1.2 1.8 1.2 2.8c0 2.5-1.5 4-4 4h-4c-2.5 0-4-1.5-4-4c0-0.8 0.3-1.5 0.8-2L9 10.2C8.2 9.4 7.8 8.4 7.8 7.5C7.8 5 9.3 3.5 12 3.5z"/>
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-100">My Registered IP</h2>
              <p className="text-sm text-gray-400">{registeredIPs.length} items</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title or tags..."
            className="w-full pl-10 pr-4 py-2 bg-gray-950/50 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-2 gap-3">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-gray-950/50 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <option value="all">All Types</option>
            <option value="story">Stories</option>
            <option value="poem">Poems</option>
            <option value="image">Images</option>
            <option value="code">Code</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-gray-950/50 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Content List */}
      <div className="flex-1 overflow-y-auto">
        {filteredIPs.length === 0 ? (
          <div className="p-6 text-center text-gray-400">
            <Shield className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="font-medium mb-1">No registered IP found</p>
            <p className="text-sm">Start creating and registering your content!</p>
          </div>
        ) : (
          <div className="space-y-3 p-4">
            {filteredIPs.map((ip) => (
              <div
                key={ip.id}
                className="bg-gray-950/50 border border-gray-800/50 rounded-lg p-4 hover:bg-gray-800/30 transition-colors cursor-pointer"
                onClick={() => setSelectedIP(ip)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{getTypeIcon(ip.type)}</span>
                    <h3 className="font-semibold text-gray-200 truncate flex-1">
                      {ip.title}
                    </h3>
                  </div>
                  <span className={`px-2 py-1 border rounded-full text-xs font-medium ${getStatusColor(ip.status)}`}>
                    {ip.status}
                  </span>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-400 mb-2">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{ip.registrationDate.toLocaleDateString()}</span>
                  </span>
                  <span className="capitalize">{ip.type}</span>
                </div>

                {ip.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {ip.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-1 bg-gray-600/20 text-gray-300 border border-gray-600/30 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                    {ip.tags.length > 3 && (
                      <span className="text-xs text-gray-500">+{ip.tags.length - 3} more</span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Selected IP Details Modal */}
      {selectedIP && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getTypeIcon(selectedIP.type)}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-100">{selectedIP.title}</h2>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className={`px-3 py-1 border rounded-full text-sm font-medium ${getStatusColor(selectedIP.status)}`}>
                        {selectedIP.status}
                      </span>
                      <span className="text-sm text-gray-400 capitalize">{selectedIP.type}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedIP(null)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Content */}
              <div>
                <h3 className="font-medium text-gray-200 mb-3">Content</h3>
                <div className="bg-gray-950/50 border border-gray-700 rounded-lg p-4 max-h-64 overflow-y-auto">
                  <div className="whitespace-pre-wrap text-gray-300">
                    {selectedIP.content}
                  </div>
                </div>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-200 mb-3">Registration Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Date:</span>
                      <span className="text-gray-300">{selectedIP.registrationDate.toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">License:</span>
                      <span className="text-gray-300">{selectedIP.license}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">On-chain ID:</span>
                      <span className="font-mono text-xs text-gray-300">{selectedIP.onChainId}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-200 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedIP.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 bg-gray-600/20 text-gray-300 border border-gray-600/30 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
                <button className="flex items-center space-x-2 px-4 py-2 text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
                <a
                  href={`https://aeneid.explorer.story.foundation/ipa/${selectedIP.onChainId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-500 hover:via-gray-400 hover:to-gray-500 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-500/30"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>View on-chain</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPanel;