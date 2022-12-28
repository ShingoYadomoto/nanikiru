import React from 'react'
import {Pai, PaiDetail} from '../pai/pai';
import './hand.css'


export type HandDetail = {
    paiList: PaiDetail[];
}

type HandProps = {
    detail: HandDetail
}

export const Hand: React.FC<HandProps> = props => {
    const pais = props.detail.paiList.map((fc, idx) => {
        return (
            <Pai detail={fc} />
        );
    });

    return (
        <div className={"hand"}>
            {pais}
        </div>
    );
}
