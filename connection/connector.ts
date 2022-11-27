import {initializeConnector, Web3ReactHooks} from "@web3-react/core";
import {MetaMask} from "@web3-react/metamask";
import {Network} from "@web3-react/network";
import {URLS} from "../chains";
import {WalletConnect} from "@web3-react/walletconnect";
import {Connector} from "@web3-react/types";
import {CoinbaseWallet} from "@web3-react/coinbase-wallet";

function onError(error: Error) {
    console.debug(`web3-react error: ${error}`)
}

export const [metaMask, metaMaskHooks] = initializeConnector<MetaMask>((actions) => new MetaMask({actions}))

export const [walletConnect, walletConnectHooks] = initializeConnector<WalletConnect>(
    (actions) =>
        new WalletConnect({
            actions,
            options: {
                rpc: URLS,
            },
        })
)

export const [network, networkHooks] = initializeConnector<Network>((actions) => new Network({actions, urlMap: URLS}))

export const [coinbase, coinbaseHooks] = initializeConnector<CoinbaseWallet>(
    (actions) =>
        new CoinbaseWallet({
            actions,
            options: {
                url: URLS[1][0],
                appName: 'eth-wallet',
            },
            onError,
        })
)

export type Connectors = [MetaMask | WalletConnect | CoinbaseWallet | Network, Web3ReactHooks][]
