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
}

export const useWallet = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    address: null,
    chainId: null,
    provider: null,
    signer: null,
  });
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if MetaMask is installed
  const checkIfMetaMaskIsInstalled = useCallback((): boolean => {
    const { ethereum } = window as any;
    return Boolean(ethereum && ethereum.isMetaMask);
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
        
        setWalletState({
          isConnected: true,
          address,
          chainId: chainIdHex,
          provider,
          signer,
        });
      }
    } catch (err) {
      console.error('Error checking current network:', err);
    }
  }, [checkIfMetaMaskIsInstalled]);

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

      setWalletState({
        isConnected: true,
        address,
        chainId: chainIdHex,
        provider,
        signer,
      });
      
      setIsConnecting(false);
    } catch (err: any) {
      console.error('Error connecting to wallet:', err);
      setError(err.message || 'Failed to connect wallet');
      setIsConnecting(false);
    }
  }, [checkIfMetaMaskIsInstalled]);

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
    });
    
    // Clear any localStorage items related to wallet connection if needed
    localStorage.removeItem('walletConnected');
    
    console.log('Wallet disconnected (local state only)');
  }, []);

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
          
          setWalletState({
            ...walletState,
            chainId: chainIdHex,
            provider,
            signer,
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
  }, [walletState, checkIfMetaMaskIsInstalled]);

  return {
    ...walletState,
    isConnecting,
    error,
    connectWallet,
    disconnectWallet,
  };
};

export default useWallet; 