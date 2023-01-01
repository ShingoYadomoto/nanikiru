import React from 'react'
import {PaiDetail, PaiType} from '../pai/pai';
import './acceptLink.css'

type AcceptLinkProps = {
    paiList: PaiDetail[];
}

export const AcceptLink: React.FC<AcceptLinkProps> = props => {
    const paiHash = new Map<PaiType, PaiDetail[]>();
    for(let pai of props.paiList){
        const l = paiHash.get(pai.type);
        if (l === undefined) {
            paiHash.set(pai.type, [pai]);
            continue
        }
        l.push(pai)
        paiHash.set(pai.type, l);
    }

    let url = "https://tenhou.net/2/?qd="
    for(let paiType of [PaiType.Manzu, PaiType.Pinzu, PaiType.Sozu, PaiType.Zi]) {
        const l = paiHash.get(paiType)
        if (l === undefined) {
            continue
        }

        for(let pai of l) {
            let n = pai.index
            if (pai.isBonus) {
                n = 0
            }
            url += n
        }
        url += paiType
    }

    return (
        <button className={"acceptLink"}>
            <a href={url} target="_blank" rel="noreferrer">受け入れ枚数 ➡️</a>
        </button>
    );
}