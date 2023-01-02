import React from 'react'

export enum PaiType {
    Manzu = "m",
    Pinzu = "p",
    Sozu  = "s",
    Zi    = "z",
}

export type PaiDetail = {
    type: PaiType;
    index: number;
    isFolou: boolean;
    isBonus: boolean;
}

export type PaiProps = {
    detail: PaiDetail
    onPaiSelected: (selected: PaiDetail) => void;
}

export const Pai: React.FC<PaiProps> = props => {
    const getPaiImgTypeDir = (pai: PaiProps) => {
        switch(pai.detail.type){
            case PaiType.Manzu: return "manzu";
            case PaiType.Pinzu: return "pinzu";
            case PaiType.Sozu:  return "sozu";
            case PaiType.Zi:    return "zi";
            default:            return "";
        }
    }

    const getPaiImgDirectionDir = (pai: PaiProps) => {
        if (pai.detail.isFolou) {
            return "horizontal";
        }
        return "vertical";
    }

    const getPaiImgFileName = (pai: PaiProps) => {
        const b = pai.detail.isBonus ? "-b" : ""
        return `${pai.detail.index}${b}.png`;
    }

    const getPaiImgPath = (pai: PaiProps) : string => {
        return `${process.env.PUBLIC_URL}/img/pai/${getPaiImgTypeDir(pai)}/${getPaiImgDirectionDir(pai)}/${getPaiImgFileName(pai)}`;
    }

    const onPaiSelected = () => {
        props.onPaiSelected(props.detail);
    }

    return (
        <img className={"pai"} src={getPaiImgPath(props)} alt="牌" onClick={e => onPaiSelected()}></img>
    );
}
