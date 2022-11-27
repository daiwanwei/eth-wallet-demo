
import type { DetailedHTMLProps, FC, ImgHTMLAttributes } from 'react';
import React from 'react';
import {Wallet} from "../connection/wallet";
export interface WalletIconProps extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
    wallet: Wallet | null;
}

export const WalletIcon: FC<WalletIconProps> = ({ wallet, ...props }) => {
    return wallet && <img src={wallet.icon} alt={`${wallet.name} icon`} {...props} />;
};
