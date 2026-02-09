import { X, Wallet, ExternalLink, Download } from 'lucide-react';

const MetaMaskModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleInstall = () => {
    window.open('https://metamask.io/download/', '_blank');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
      <div className="bg-[#0d1025] w-[420px] rounded-2xl p-8 relative border border-white/10 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#6645eb]/20 to-[#d445eb]/20 flex items-center justify-center border border-white/10">
            <Wallet className="w-10 h-10 text-[#d445eb]" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-white mb-3">
          MetaMask Required
        </h2>

        {/* Description */}
        <p className="text-gray-400 text-center mb-6 leading-relaxed">
          To use Nafty, you need to install MetaMask - a secure cryptocurrency wallet that connects you to the blockchain.
        </p>

        {/* Features */}
        <div className="space-y-3 mb-8">
          <div className="flex items-center space-x-3 text-sm text-gray-300">
            <div className="w-2 h-2 rounded-full bg-[#6645eb]"></div>
            <span>Secure wallet for your crypto assets</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-300">
            <div className="w-2 h-2 rounded-full bg-[#6645eb]"></div>
            <span>Connect to Web3 applications</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-300">
            <div className="w-2 h-2 rounded-full bg-[#6645eb]"></div>
            <span>Free browser extension</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleInstall}
            className="w-full py-3.5 bg-gradient-to-r from-[#6645eb] to-[#d445eb] rounded-xl text-white font-semibold hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
          >
            <Download size={18} />
            <span>Install MetaMask</span>
            <ExternalLink size={14} />
          </button>
          <button
            onClick={onClose}
            className="w-full py-3.5 bg-white/5 border border-white/10 rounded-xl text-gray-300 font-medium hover:bg-white/10 transition-colors"
          >
            Maybe Later
          </button>
        </div>

        {/* Footer note */}
        <p className="text-xs text-gray-500 text-center mt-6">
          After installing, refresh this page to connect your wallet.
        </p>
      </div>
    </div>
  );
};

export default MetaMaskModal;
