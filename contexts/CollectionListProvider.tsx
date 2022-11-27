import {FC, ReactNode, useMemo} from "react";
import {CollectionListContext} from "../hooks/useWhitelist";
import WHITELIST from "../whitelist.json";

export interface CollectionListProviderProps {
    children: ReactNode
}

export const CollectionListProvider: FC<CollectionListProviderProps> = (
    {children}
) => {
    const collections = useMemo(() => {
        let l: {
            contract: string
            name: string
            symbol: string
        }[] = []
        for (let i of WHITELIST) {
            l.push({
                contract: i.contract,
                name: i.name,
                symbol: i.symbol,
            })
        }
        return l
    }, [])
    return (
        <CollectionListContext.Provider value={{collections}}>
            {children}
        </CollectionListContext.Provider>
    )
}
