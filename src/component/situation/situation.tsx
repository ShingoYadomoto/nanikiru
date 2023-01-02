import React from 'react'
import {Pai, PaiDetail} from '../pai/pai';
import './situation.css'

enum FanType {
    None = 0,
    Ton  = 1,
    Nan  = 2,
    Sha  = 3,
    Pei  = 4,
}

type SituationField = {
    fan: FanType;
    inning: number;
    stack: number;
    deposit: number;
}

export type SituationDetail = {
    bonus: PaiDetail[];
    field: SituationField;
    playerFan: FanType;
    other: string;
}

type SituationProps = {
    detail: SituationDetail
}

export const Situation: React.FC<SituationProps> = props => {
    const getFanText = (fan: FanType) => {
        switch(fan){
            case FanType.Ton: return "東";
            case FanType.Nan: return "西";
            case FanType.Sha: return "南";
            case FanType.Pei: return "北";
            default:          return "";
        }
    }

    const getFieldText = (situation: SituationDetail) => {
        if (
            situation.field.fan === FanType.None ||
            situation.field.inning === 0 ||
            situation.field.stack === 0 ||
            situation.playerFan === FanType.None ||
            situation.field.deposit === 0
        ) {
            return ""
        }

        return getFanText(situation.field.fan) + situation.field.inning + "局"
            + situation.field.stack + "本場"
            + " "
            + getFanText(situation.playerFan) + "家"
            + " "
            + "供託" + situation.field.deposit + "本"
    }

    const getOtherText = (other: string) => {
        return other !== "" ? "（" + other + "）" : ""
    }

    const getSituationText = (situation: SituationDetail) => {
        return getFieldText(situation) + getOtherText(situation.other)
    }

    const getBonus = (doraList: PaiDetail[]) => {
        if (doraList.length === 0) {
            return
        }

        const images = doraList.map((fc, idx) => {
            return (
                <Pai detail={fc} onPaiSelected={selected => {}} key={idx}/>
            );
        });

        return <>ドラ: {images}</>
    }

    return (
        <div className={"situation"}>
            <span>{getSituationText(props.detail)}</span>
            <span>{getBonus(props.detail.bonus)}</span>
        </div>
    );
}
