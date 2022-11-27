import {createContext, useContext} from "react";

export interface CollectionListContextState{
    collections:Collection[]
}

export interface Collection{
    contract: string
    name: string
    symbol: string
}

export const CollectionListContext=createContext({} as CollectionListContextState)

export function useCollectionList(){
    return useContext(CollectionListContext)
}
