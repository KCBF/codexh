import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';

// COTI Testnet configuration
const COTI_TESTNET = {
  chainId: '0x6c1d00', // 7082400 in hex
  chainName: 'COTI Testnet',
  nativeCurrency: {
    name: 'COTI',
    symbol: 'COTI',
    decimals: 18,
  },
  rpcUrls: ['https://testnet.coti.io/rpc'],
  blockExplorerUrls: ['https://testnet.cotiscan.io'],
};

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  chainId: string | null;
  provider: ethers.providers.Web3Provider | null;
  signer: ethers.Signer | null;
  isCorrectNetwork: boolean;
}

export const useWallet = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    address: null,
    chainId: null,
    provider: null,
    signer: null,
    isCorrectNetwork: false,
  });
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if MetaMask is installed
  const checkIfMetaMaskIsInstalled = useCallback((): boolean => {
    const { ethereum } = window as any;
    return Boolean(ethereum && ethereum.isMetaMask);
  }, []);

  // Check if connected to COTI Testnet
  const checkIfCorrectNetwork = useCallback((chainIdHex: string): boolean => {
    // Normalize chain IDs to lowercase for comparison
    return chainIdHex.toLowerCase() === COTI_TESTNET.chainId.toLowerCase();
  }, []);

  // Check current network and update state
  const checkCurrentNetwork = useCallback(async () => {
    try {
      if (!checkIfMetaMaskIsInstalled()) {
        return;
      }

      const { ethereum } = window as any;
      
      // Check if already connected
      const provider = new ethers.providers.Web3Provider(ethereum);
      const accounts = await provider.listAccounts();
      
      if (accounts.length > 0) {
        const address = accounts[0];
        const { chainId } = await provider.getNetwork();
        const chainIdHex = `0x${chainId.toString(16)}`;
        const signer = provider.getSigner();
        const isCorrectNetwork = checkIfCorrectNetwork(chainIdHex);
        
        setWalletState({
          isConnected: true,
          address,
          chainId: chainIdHex,
          provider,
          signer,
          isCorrectNetwork,
        });
      }
    } catch (err) {
      console.error('Error checking current network:', err);
    }
  }, [checkIfMetaMaskIsInstalled, checkIfCorrectNetwork]);

  // Connect to MetaMask
  const connectWallet = useCallback(async () => {
    try {
      setIsConnecting(true);
      setError(null);

      if (!checkIfMetaMaskIsInstalled()) {
        setError('MetaMask is not installed. Please install MetaMask to continue.');
        setIsConnecting(false);
        return;
      }

      const { ethereum } = window as any;
      const provider = new ethers.providers.Web3Provider(ethereum);
      
      // Request account access
      const accounts = await provider.send('eth_requestAccounts', []);
      const address = accounts[0];
      
      // Get the connected chain ID
      const { chainId } = await provider.getNetwork();
      const chainIdHex = `0x${chainId.toString(16)}`;
      
      // Get signer
      const signer = provider.getSigner();
      
      // Check if connected to COTI Testnet
      const isCorrectNetwork = checkIfCorrectNetwork(chainIdHex);

      setWalletState({
        isConnected: true,
        address,
        chainId: chainIdHex,
        provider,
        signer,
        isCorrectNetwork,
      });
      
      setIsConnecting(false);
    } catch (err: any) {
      console.error('Error connecting to wallet:', err);
      setError(err.message || 'Failed to connect wallet');
      setIsConnecting(false);
    }
  }, [checkIfMetaMaskIsInstalled, checkIfCorrectNetwork]);

  // Disconnect wallet (local state only)
  const disconnectWallet = useCallback(() => {
    // MetaMask doesn't support programmatic disconnection
    // So we just reset our local state
    setWalletState({
      isConnected: false,
      address: null,
      chainId: null,
      provider: null,
      signer: null,
      isCorrectNetwork: false,
    });
    
    // Clear any localStorage items related to wallet connection if needed
    localStorage.removeItem('walletConnected');
    
    console.log('Wallet disconnected (local state only)');
  }, []);

  // Switch to COTI Testnet
  const switchToCOTITestnet = useCallback(async () => {
    try {
      setError(null);
      
      if (!walletState.provider) {
        setError('Wallet not connected');
        return;
      }
      
      const { ethereum } = window as any;
      
      try {
        // Try to switch to the network
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: COTI_TESTNET.chainId }],
        });
      } catch (switchError: any) {
        // This error code indicates that the chain has not been added to MetaMask
        if (switchError.code === 4902) {
          try {
            await ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: COTI_TESTNET.chainId,
                  chainName: COTI_TESTNET.chainName,
                  nativeCurrency: COTI_TESTNET.nativeCurrency,
                  rpcUrls: COTI_TESTNET.rpcUrls,
                  blockExplorerUrls: COTI_TESTNET.blockExplorerUrls,
                },
              ],
            });
          } catch (addError: any) {
            setError(addError.message || 'Failed to add COTI Testnet');
            return;
          }
        } else {
          setError(switchError.message || 'Failed to switch to COTI Testnet');
          return;
        }
      }
      
      // Update state after successful network switch
      const provider = new ethers.providers.Web3Provider(ethereum);
      const { chainId } = await provider.getNetwork();
      const chainIdHex = `0x${chainId.toString(16)}`;
      const signer = provider.getSigner();
      
      setWalletState({
        ...walletState,
        chainId: chainIdHex,
        provider,
        signer,
        isCorrectNetwork: checkIfCorrectNetwork(chainIdHex),
      });
    } catch (err: any) {
      console.error('Error switching network:', err);
      setError(err.message || 'Failed to switch network');
    }
  }, [walletState, checkIfCorrectNetwork]);

  // Initialize wallet state on mount
  useEffect(() => {
    checkCurrentNetwork();
  }, [checkCurrentNetwork]);

  // Listen for account and chain changes
  useEffect(() => {
    if (checkIfMetaMaskIsInstalled()) {
      const { ethereum } = window as any;
      
      const handleAccountsChanged = async (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected their wallet
          setWalletState({
            isConnected: false,
            address: null,
            chainId: null,
            provider: null,
            signer: null,
            isCorrectNetwork: false,
          });
        } else if (walletState.isConnected) {
          // User switched accounts
          setWalletState({
            ...walletState,
            address: accounts[0],
          });
        }
      };
      
      const handleChainChanged = async (chainIdHex: string) => {
        console.log('Chain changed to:', chainIdHex);
        // Update state when chain changes
        if (walletState.isConnected) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const isCorrectNetwork = checkIfCorrectNetwork(chainIdHex);
          
          console.log('Is correct network:', isCorrectNetwork);
          console.log('Expected chainId:', COTI_TESTNET.chainId);
          
          setWalletState({
            ...walletState,
            chainId: chainIdHex,
            provider,
            signer,
            isCorrectNetwork,
          });
        }
      };
      
      ethereum.on('accountsChanged', handleAccountsChanged);
      ethereum.on('chainChanged', handleChainChanged);
      
      return () => {
        ethereum.removeListener('accountsChanged', handleAccountsChanged);
        ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [walletState, checkIfMetaMaskIsInstalled, checkIfCorrectNetwork]);

  return {
    ...walletState,
    isConnecting,
    error,
    connectWallet,
    disconnectWallet,
    switchToCOTITestnet,
  };
};

export default useWallet; 