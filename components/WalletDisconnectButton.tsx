import type { FC, MouseEventHandler } from 'react';
import React, { useCallback, useMemo } from 'react';
import { Button,ButtonProps } from './Button';
import { WalletIcon } from './WalletIcon';
import {useWeb3React} from "@web3-react/core";
import {getWallet} from "../connection/wallet";

export const WalletDisconnectButton: FC<ButtonProps> = ({ children, disabled, onClick, ...props }) => {
    const { account, connector,hooks } = useWeb3React();
    const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
        (event) => {
            if (onClick) onClick(event);
            if (!event.defaultPrevented && connector.deactivate) connector.deactivate();
        },
        [onClick, connector]
    );

    const content = useMemo(() => {
        if (children) return children;
        if (account) return 'Disconnect';
        return 'Disconnect Wallet';
    }, [children, account]);

    return (
        <Button
            className="wallet-adapter-button-trigger"
            disabled={disabled || !account}
            startIcon={account ? <WalletIcon wallet={getWallet(connector)} /> : undefined}
            onClick={handleClick}
            {...props}
        >
            {content}
        </Button>
    );
};
