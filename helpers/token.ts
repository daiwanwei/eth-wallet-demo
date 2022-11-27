import {Alchemy} from "alchemy-sdk";

export interface TokenInfo {
    contractAddress: string
    name: string
    symbol: string
    image: string
    amount: number
}

export async function getHeldTokens(
    client:Alchemy,user: string, whitelistContracts: string[]
): Promise<TokenInfo[]> {
    const results = await client.nft.getNftsForOwner(
        user,
        {contractAddresses:whitelistContracts}
    )
    const {ownedNfts} =results
    const data=ownedNfts.map(({contract,rawMetadata,balance})=>{
        const {address,name,symbol }=contract
        return {
            contractAddress:address,
            name:name || "",
            symbol:symbol || "",
            image:rawMetadata?.image || "",
            amount:balance
        }
    })
    return data
}
