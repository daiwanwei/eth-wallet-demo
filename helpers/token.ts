import {Alchemy} from "alchemy-sdk";

export interface TokenInfo {
    contractAddress: string
    tokenId:string
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
    const data=ownedNfts.map(({contract,tokenId,media,balance})=>{
        const {address,name,symbol }=contract
        const image=media.length>=0? media[0].gateway: ""
        return {
            contractAddress:address,
            name:name || "",
            symbol:symbol || "",
            image,
            tokenId,
            amount:balance
        }
    })
    return data
}
