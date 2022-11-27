import {FC, ReactNode, useEffect, useMemo, useState} from "react";
import {CollectionHolderContext} from "../hooks/useCollectionHolder";
import {useCollectionList} from "../hooks/useWhitelist";
import {useWeb3React} from "@web3-react/core";
import {useAlchemyClient} from "../hooks/useAlchemyClient";
import {getHeldTokens} from "../helpers/token";

export interface CollectionHolderProviderProps{
    children:ReactNode
}

export interface TokenInfo{
    contractAddress: string
    name: string
    symbol: string
    image: string
    amount: number
}

export const CollectionHolderProvider:FC<CollectionHolderProviderProps>=(
    {children}
)=>{
    const {account,accounts}=useWeb3React()
    const {collections}=useCollectionList()
    const {alchemy}=useAlchemyClient()
    const holder=useMemo(()=>account,[account])
    const [isHolder,setIsHolder]=useState(false)
    const [tokens,setTokens]=useState<TokenInfo[]>([])
    useEffect(()=>{
        const updateData=async ()=>{
            if (!holder){
                setIsHolder(false)
                return
            }

            const contracts=collections.map(({contract})=>contract)
            const hold=await getHeldTokens(alchemy,holder,contracts)
            console.log(holder)
            console.log(accounts)
            setTokens(hold)
            if (hold.length>0) {
                setIsHolder(true)
            }else {
                setIsHolder(false)
            }
        }
        updateData()
            .then(()=>console.log(`updateIsHolder successfully`))
            .catch((err)=>console.log(`updateIsHolder fail,err:${err}`))
    },[holder])
    return(
        <CollectionHolderContext.Provider value={{holder,isHolder,tokens}}>
            {children}
        </CollectionHolderContext.Provider>
    )
}
