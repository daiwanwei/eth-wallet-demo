
import {createContext, useContext} from "react";
import {Alchemy} from "alchemy-sdk";

export interface AlchemyClientContextState{
    alchemy: Alchemy
}

export const AlchemyClientContext=createContext({} as AlchemyClientContextState)

export function useAlchemyClient():AlchemyClientContextState{
    return useContext(AlchemyClientContext)
}
