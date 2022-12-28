import React from 'react'
import {Pai, PaiDetail} from '../pai/pai';

type State = {
    paiList: PaiDetail[];
}

class Hand extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        const pai1: PaiDetail = {
            type: "m",
            index: 1,
            isFolou: false,
            isBonus: false,
        };
        const pai2: PaiDetail = {
            type: "m",
            index: 2,
            isFolou: true,
            isBonus: false,
        };
        const pai3: PaiDetail = {
            type: "m",
            index: 3,
            isFolou: false,
            isBonus: false,
        };
        this.state = { paiList: [pai1, pai2, pai3] };
    }


    render() {
        const pais = this.state.paiList.map((fc, idx) => {
            return (
                <Pai detail={fc} />
            );
        });

        return (
            <>
                {pais}
            </>
        );
    }
}

export default Hand;