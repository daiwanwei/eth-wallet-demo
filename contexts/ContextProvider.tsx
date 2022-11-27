import {FC, ReactNode, useMemo, useState} from "react";
import {WalletProvider} from "./WalletProvider";
import {WalletModalProvider} from "./WalletModalProvider";
import {AlchemyClientProvider} from "./AlchemyClientProvider";
import {CollectionListProvider} from "./CollectionListProvider";
import {CollectionHolderProvider} from "./CollectionHolderProvider";
export interface ContextProviderProps {
    children: ReactNode;
}

export const ContextProvider: FC<ContextProviderProps> = ({children}) => {


    return (
        <WalletProvider>
            <WalletModalProvider>
                <AlchemyClientProvider apiKey={"-RuO-O9hUDVIRFCIyPh-6mJcbeD13qZ4"}>
                    <CollectionListProvider>
                        <CollectionHolderProvider>
                            {children}
                        </CollectionHolderProvider>
                    </CollectionListProvider>
                </AlchemyClientProvider>
            </WalletModalProvider>
        </WalletProvider>
    );
}
