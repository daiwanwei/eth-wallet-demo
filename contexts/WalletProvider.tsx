import type {FC, ReactNode} from 'react';
import React, {useMemo} from 'react';
import {selectWallet, Wallet, WalletReadyState, WalletType} from "../connection/wallet";
import {
    coinbase,
    coinbaseHooks,
    Connectors,
    metaMask,
    metaMaskHooks,
    network,
    networkHooks,
    walletConnect,
    walletConnectHooks
} from "../connection/connector";
import {WalletContext} from '../hooks/useWallet';
import {getIsMetaMask} from "../connection/utils";
import {Web3ReactProvider} from "@web3-react/core";

export interface WalletProps {
    children: ReactNode;
}

export const WalletProvider: FC<WalletProps> = ({children, ...props}) => {
    const isMetaMask = getIsMetaMask()
    const wallets: Wallet[] = useMemo(() => {
        let w = []

        w.push({
            connector: metaMask,
            hooks:metaMaskHooks,
            readyState: isMetaMask?
                WalletReadyState.Installed: WalletReadyState.NotDetected,
            name: WalletType.METAMASK,
            icon: "/metamask.ico"
        })
        w.push({
            connector: coinbase,
            hooks:coinbaseHooks,
            readyState: WalletReadyState.Installed,
            name: WalletType.COINBASE_WALLET,
            icon: "/coinbase.svg"
        })
        w.push({
            connector: walletConnect,
            hooks:walletConnectHooks,
            readyState: WalletReadyState.Installed,
            name: WalletType.WALLET_CONNECT,
            icon: "/walletconnect.svg"
        })
        return w
    }, []);

    // @ts-ignore
    const connectors:Connectors = useMemo(
        () => {
            let cons = []
            wallets.forEach(({connector,hooks,readyState})=>{
                if (readyState===WalletReadyState.Installed){
                    cons.push([connector,hooks])
                }
            })
            cons.push([network, networkHooks])
            return cons
        }, [wallets]);

    return (
        <WalletContext.Provider
            value={{
                wallets,
                select: selectWallet,
            }}

        >
            <Web3ReactProvider connectors={connectors}>
                {children}
            </Web3ReactProvider>
        </WalletContext.Provider>
    );
};
