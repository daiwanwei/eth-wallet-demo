import React, {FC} from "react";
import {useCollectionHolder} from "../hooks/useCollectionHolder";

export const CollectionHolderProfile: FC = ({  }) => {
    const {isHolder,holder,tokens}=useCollectionHolder();
    return (
        <ul >
            <li >
                holder : {holder ? holder : 'not found'}
            </li>
            <li >
                is holder : {isHolder ? "yes" : 'no'}
            </li>
            <div>
                {tokens.map((token,i)=>{
                    return(
                        <div key={`token-data-${i}`}>
                            <h3>
                                {`${token.contractAddress}: ${token.name}`}
                            </h3>
                            <img src={token.image} alt={`${token.name}`}/>
                        </div>
                    )
                })}
            </div>
        </ul>
    );
};
