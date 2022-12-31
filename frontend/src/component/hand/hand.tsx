import React from 'react'
import {Pai, PaiDetail} from '../pai/pai';
import './hand.css'


export type HandDetail = {
    paiList: PaiDetail[];
}

type HandProps = {
    detail: HandDetail
    onPaiSelected: (selected: PaiDetail) => void;
}

export const Hand: React.FC<HandProps> = props => {
    const pais = props.detail.paiList.map((fc, idx) => {
        return (
            <Pai key={idx} detail={fc} onPaiSelected={selected => props.onPaiSelected(selected)}/>
        );
    });

    return (
        <div className={"hand"}>
            {pais}
        </div>
    );
}
