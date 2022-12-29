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
}

export const Pai: React.FC<PaiProps> = props => {
    const getPaiImgTypeDir = (pai: PaiProps) => {
        switch(pai.detail.type){
            case "m": return "manzu";
            case "p": return "pinzu";
            case "s": return "sozu";
            case "z": return "zi";
            default:  return "";
        }
    }

    const getPaiImgDirectionDir = (pai: PaiProps) => {
        if (pai.detail.isFolou) {
            return "horizontal";
        }
        return "vertical";
    }

    const getPaiImgFileName = (pai: PaiProps) => {
        return `${pai.detail.index}.gif`;
    }

    const getPaiImgPath = (pai: PaiProps) : string => {
        return `${process.env.PUBLIC_URL}/img/pai/${getPaiImgTypeDir(pai)}/${getPaiImgDirectionDir(pai)}/${getPaiImgFileName(pai)}`;
    }

    return (
        <img className={"pai"} src={getPaiImgPath(props)} alt="牌"></img>
    );
}
