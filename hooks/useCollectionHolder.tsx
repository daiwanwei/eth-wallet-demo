import {createContext, useContext} from "react";

export interface TokenInfo{
    contractAddress: string
    name: string
    symbol: string
    image: string
    amount: number
}

export interface CollectionHolderContextState{
    holder?:string
    isHolder:boolean
    tokens: TokenInfo[]
}

export const CollectionHolderContext=createContext({} as CollectionHolderContextState)

export function useCollectionHolder(){
    return useContext(CollectionHolderContext)
}
