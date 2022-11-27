import { createContext, useContext } from 'react';
import {Wallet} from "../connection/wallet";
export interface WalletContextState {
    wallets: Wallet[];
    select: (name:string) => Promise<void>;
}

const DEFAULT_CONTEXT = {
    select(name:string) {
        console.error(constructMissingProviderErrorMessage('call', 'select'));
    },
    wallets: [] as Wallet[],
};

Object.defineProperty(DEFAULT_CONTEXT, 'wallets', {
    get() {
        console.error(constructMissingProviderErrorMessage('read', 'wallets'));
        return false;
    },
});

function constructMissingProviderErrorMessage(action: string, valueName: string) {
    return (
        'You have tried to ' +
        ` ${action} "${valueName}"` +
        ' on a WalletContext without providing one.' +
        ' Make sure to render a WalletProvider' +
        ' as an ancestor of the component that uses ' +
        'WalletContext'
    );
}

export const WalletContext = createContext<WalletContextState>(DEFAULT_CONTEXT as WalletContextState);

export function useWallet(): WalletContextState {
    return useContext(WalletContext);
}
