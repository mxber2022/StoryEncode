import React, { useState } from 'react';
import { X, Shield, Tag, FileText, Scale, Loader, CheckCircle } from 'lucide-react';
import { ChatMessage } from '../types';

interface RegisterIPModalProps {
  message: ChatMessage;
  onSubmit: (data: {
    title: string;
    description: string;
    tags: string[];
    license: string;
  }) => void;
  onClose: () => void;
}

const RegisterIPModal: React.FC<RegisterIPModalProps> = ({ message, onSubmit, onClose }) => {
  const [title, setTitle] = useState(message.content.substring(0, 50) + '...');
  const [description, setDescription] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [license, setLicense] = useState('All Rights Reserved');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      tags,
      license,
    });
  };

  const handleTagInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2.5 rounded-lg shadow-lg border border-green-500/30">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-100">Register as IP</h2>
                <p className="text-gray-400">Protect your creative content on-chain</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Content Preview */}
          <div className="bg-gray-950/50 border border-gray-700 rounded-lg p-4">
            <h3 className="font-medium text-gray-200 mb-2">Content to Register</h3>
            <div className="text-sm text-gray-300 max-h-32 overflow-y-auto whitespace-pre-wrap">
              {message.content}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-200 mb-2">
              <FileText className="w-4 h-4" />
              <span>Title *</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-950/50 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-200 mb-2">
              <FileText className="w-4 h-4" />
              <span>Description (Optional)</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full bg-gray-950/50 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              placeholder="Additional context or description..."
            />
          </div>

          {/* Tags */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-200 mb-2">
              <Tag className="w-4 h-4" />
              <span>Tags</span>
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center space-x-1 bg-gray-600/20 text-gray-300 border border-gray-600/30 px-3 py-1 rounded-full text-sm"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-gray-400 hover:text-gray-300"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={handleTagInputKeyPress}
              onBlur={addTag}
              className="w-full bg-gray-950/50 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Add tags (press Enter or comma to add)"
            />
          </div>

          {/* License */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-200 mb-2">
              <Scale className="w-4 h-4" />
              <span>License *</span>
            </label>
            <select
              value={license}
              onChange={(e) => setLicense(e.target.value)}
              className="w-full bg-gray-950/50 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            >
              <option value="All Rights Reserved">All Rights Reserved</option>
              <option value="CC BY">Creative Commons Attribution</option>
              <option value="CC BY-SA">Creative Commons Attribution-ShareAlike</option>
              <option value="CC BY-NC">Creative Commons Attribution-NonCommercial</option>
              <option value="Public Domain">Public Domain</option>
              <option value="Remix Allowed">Remix Allowed</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !title.trim()}
              className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border border-green-500/30"
            >
              {isSubmitting ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>Registering...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Register IP</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterIPModal;