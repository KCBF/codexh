import React, { useState, useEffect } from 'react';
import { useWalletContext } from '@/providers/WalletProvider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const WalletConnect: React.FC = () => {
  const { 
    isConnected, 
    address, 
    chainId,
    isCorrectNetwork, 
    isConnecting, 
    error, 
    connectWallet,
    disconnectWallet,
    switchToCOTITestnet 
  } = useWalletContext();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // Format address for display
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Close popover when network changes
  useEffect(() => {
    if (isCorrectNetwork) {
      setIsPopoverOpen(false);
    }
  }, [isCorrectNetwork]);

  // Handle disconnect
  const handleDisconnect = () => {
    disconnectWallet();
    setIsPopoverOpen(false);
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant={isConnected ? "outline" : "default"} 
          className={`rounded-full ${isConnected ? 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100' : 'bg-purple-600 text-white hover:bg-purple-700'}`}
          onClick={() => {
            if (!isConnected) {
              connectWallet();
            } else {
              setIsPopoverOpen(true);
            }
          }}
          disabled={isConnecting}
        >
          {isConnecting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connecting...
            </>
          ) : isConnected ? (
            <>
              {formatAddress(address || '')}
            </>
          ) : (
            'Connect Wallet'
          )}
        </Button>
      </PopoverTrigger>
      
      {isConnected && (
        <PopoverContent className="w-80 p-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Connected Wallet</h3>
              <p className="text-sm text-gray-500 break-all">{address}</p>
              <p className="text-xs text-gray-400">Chain ID: {chainId}</p>
            </div>
            
            <div className="pt-2 border-t">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 p-0"
                onClick={handleDisconnect}
              >
                Disconnect
              </Button>
            </div>
          </div>
        </PopoverContent>
      )}
      
      {error && (
        <div className="absolute top-full mt-2 right-0 bg-red-50 text-red-600 text-sm p-2 rounded-md">
          {error}
        </div>
      )}
    </Popover>
  );
};

export default WalletConnect; 