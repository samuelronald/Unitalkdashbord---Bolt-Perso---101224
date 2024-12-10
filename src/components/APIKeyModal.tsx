import { useState, useEffect } from 'react';
import { X, Key, Globe } from 'lucide-react';

interface APIKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  provider: any;
  onSave: (provider: any, apiKey: string, apiKeyName: string, apiProxy: string) => void;
}

export default function APIKeyModal({
  isOpen,
  onClose,
  provider,
  onSave
}: APIKeyModalProps) {
  const [apiKey, setApiKey] = useState('');
  const [apiKeyName, setApiKeyName] = useState('');
  const [apiProxy, setApiProxy] = useState('');

  useEffect(() => {
    if (provider) {
      setApiKey(provider.apiKey || '');
      setApiKeyName(provider.apiKeyName || '');
      setApiProxy(provider.apiProxy || '');
    }
  }, [provider]);

  if (!isOpen || !provider) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(provider, apiKey, apiKeyName, apiProxy);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex items-center gap-3">
            <Globe className="h-6 w-6 text-gray-500" />
            <h2 className="text-xl font-semibold text-gray-900">
              Configure {provider.name} API
            </h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">API Key Name</label>
            <input
              type="text"
              value={apiKeyName}
              onChange={(e) => setApiKeyName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Production Key"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">API Key</label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="sk-..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">API Proxy URL (Optional)</label>
            <input
              type="url"
              value={apiProxy}
              onChange={(e) => setApiProxy(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="https://api.proxy.com"
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700"
            >
              Save & Test Connection
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
