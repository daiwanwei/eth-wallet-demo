import type {FC, ReactNode} from 'react';
import React, {useMemo, useState} from 'react';
import {coinbaseWallet, metaMaskWallet, selectWallet, Wallet, walletConnectWallet} from "../connection/wallet";
import {
    coinbase, coinbaseHooks,
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

        if (isMetaMask) w.push(metaMaskWallet)
        w.push(coinbaseWallet)
        w.push(walletConnectWallet)
        return w
    }, []);

    // @ts-ignore
    const connectors:Connectors = useMemo(
        () => {
            let cons = []
            cons.push([walletConnect, walletConnectHooks])
            // if (getIsMetaMask()) cons.push([metaMask, metaMaskHooks])
            cons.push([coinbase, coinbaseHooks])
            cons.push([network, networkHooks])
            if (getIsMetaMask()) cons.push([metaMask, metaMaskHooks])
            return cons
        }, []);

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
