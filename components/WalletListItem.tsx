import type { FC, MouseEventHandler } from 'react';
import React from 'react';
import { Button } from './Button';
import { WalletIcon } from './WalletIcon';
import {Wallet, WalletReadyState} from "../connection/wallet";

export interface WalletListItemProps {
    handleClick: MouseEventHandler<HTMLButtonElement>;
    tabIndex?: number;
    wallet: Wallet;
}

export const WalletListItem: FC<WalletListItemProps> = ({ handleClick, tabIndex, wallet }) => {
    return (
        <li>
            <Button onClick={handleClick} startIcon={<WalletIcon wallet={wallet} />} tabIndex={tabIndex}>
                {wallet.name}
                {wallet.readyState === WalletReadyState.Installed && <span>Detected</span>}
            </Button>
        </li>
    );
};
