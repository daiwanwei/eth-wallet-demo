import type { FC, MouseEventHandler } from 'react';
import React, { useCallback, useMemo } from 'react';
import type { ButtonProps } from './Button';
import { Button } from './Button';
import { WalletIcon } from './WalletIcon';
import {useWeb3React} from "@web3-react/core";
import {getWallet} from "../connection/wallet";
export const WalletConnectButton: FC<ButtonProps> = ({ children, disabled, onClick, ...props }) => {
    const { connector,hooks } = useWeb3React();
    const isActive=hooks.usePriorityIsActive()
    const isActivating=hooks.usePriorityIsActivating()
    const wallet=useMemo(()=>getWallet(connector),[])
    const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
        (event) => {
            if (onClick) onClick(event);
            if (!event.defaultPrevented && connector.activate) {
                connector.activate()?.then(()=>console.log(`connector activate successfully`))
                    .catch((err)=>console.log(`connector activate fail,err:${err}`))
            };
        },
        [onClick, connector]
    );

    const content = useMemo(() => {
        if (children) return children;
        if (isActivating) return 'Connecting ...';
        if (isActive) return 'Connected';
        if (wallet) return 'Connect';
        return 'Connect Wallet';
    }, [children, wallet]);

    return (
        <Button
            className="wallet-adapter-button-trigger"
            disabled={disabled || !wallet }
            startIcon={wallet ? <WalletIcon wallet={wallet} /> : undefined}
            onClick={handleClick}
            {...props}
        >
            {content}
        </Button>
    );
};
