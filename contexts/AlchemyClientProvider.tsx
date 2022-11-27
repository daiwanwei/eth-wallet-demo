import {FC, ReactNode, useMemo} from "react";
import {Alchemy, Network} from "alchemy-sdk";
import {useWeb3React} from "@web3-react/core";
import {AlchemyClientContext} from "../hooks/useAlchemyClient";



export interface AlchemyClientProviderProps {
    children: ReactNode
    apiKey: string
}


export const AlchemyClientProvider: FC<AlchemyClientProviderProps> = (
    {children,apiKey}
) => {
    const {chainId}=useWeb3React()
    const alchemy = useMemo(() => {
        let network=Network.ETH_MAINNET
        switch (chainId){
            case 1:
                network=Network.ETH_MAINNET
                break
            default:
                network=Network.ETH_MAINNET
        }
        return new Alchemy({apiKey,network})
    }, [apiKey,chainId])
    return (
        <AlchemyClientContext.Provider value={{alchemy}}>
            {children}
        </AlchemyClientContext.Provider>
    )
}
