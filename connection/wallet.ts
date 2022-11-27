import {coinbase, metaMask, walletConnect} from "./connector";
import {MetaMask} from "@web3-react/metamask";
import {WalletConnect} from "@web3-react/walletconnect";
import {Connector} from "@web3-react/types";
import {CoinbaseWallet} from "@web3-react/coinbase-wallet";


export enum WalletType {
    METAMASK = 'MetaMask',
    COINBASE_WALLET = 'Coinbase',
    WALLET_CONNECT = 'WalletConnect',
}

export enum WalletReadyState {
    /**
     * User-installable wallets can typically be detected by scanning for an API
     * that they've injected into the global context. If such an API is present,
     * we consider the wallet to have been installed.
     */
    Installed = 'Installed',
    NotDetected = 'NotDetected',
    /**
     * Loadable wallets are always available to you. Since you can load them at
     * any time, it's meaningless to say that they have been detected.
     */
    Loadable = 'Loadable',
    /**
     * If a wallet is not supported on a given platform (eg. server-rendering, or
     * mobile) then it will stay in the `Unsupported` state.
     */
    Unsupported = 'Unsupported'
}

export interface Wallet {
    connector: MetaMask | WalletConnect | CoinbaseWallet;
    readyState: WalletReadyState;
    name: string
    icon: string
}

export const metaMaskWallet: Wallet = {
    connector: metaMask,
    readyState: WalletReadyState.Installed,
    name: WalletType.METAMASK,
    icon: "/metamask.ico"
}

export const walletConnectWallet: Wallet = {
    connector: walletConnect,
    readyState: WalletReadyState.Installed,
    name: WalletType.WALLET_CONNECT,
    icon: "/walletconnect.svg"
}

export const coinbaseWallet: Wallet = {
    connector: coinbase,
    readyState: WalletReadyState.Installed,
    name: WalletType.COINBASE_WALLET,
    icon: "/coinbase.svg"
}

const WALLETS = [
    metaMaskWallet, walletConnectWallet,coinbaseWallet
]

export function getWallet(c: Connector | WalletType): Wallet| null {
    if (c instanceof Connector) {
        const connection = WALLETS.find((wallet) => wallet.connector === c)
        if (!connection) {
            throw Error('unsupported connector')
        }
        return connection
    } else {
        switch (c) {
            case WalletType.METAMASK:
                return metaMaskWallet
            case WalletType.WALLET_CONNECT:
                return walletConnectWallet
            case WalletType.COINBASE_WALLET:
                return coinbaseWallet
            default:
                return null
        }
    }
}

export function getType(name: string): WalletType {
    switch (name) {
        case "MetaMask":
            return WalletType.METAMASK
        case "Coinbase":
            return WalletType.COINBASE_WALLET
        case "WalletConnect":
            return WalletType.WALLET_CONNECT
        default:
            throw new Error(`type not found ${name}`)
    }
}

export async function selectWallet(name: string) {
    const type = getType(name)
    switch (type) {
        case WalletType.METAMASK:
            await metaMask.activate()
            return
        case WalletType.COINBASE_WALLET:
            await coinbase.activate()
            return
        case WalletType.WALLET_CONNECT:
            await walletConnect.activate()
            return
    }
}

