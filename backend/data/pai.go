package data

import (
	"fmt"
	"strconv"
)

type PaiType string

const (
	PaiTypeManzu PaiType = "m"
	PaiTypePinzu PaiType = "p"
	PaiTypeSozu  PaiType = "s"
	PaiTypeZi    PaiType = "z"
)

func (pt PaiType) ToString() (string, error) {
	if pt != PaiTypeManzu &&
		pt != PaiTypePinzu &&
		pt != PaiTypeSozu &&
		pt != PaiTypeZi {
		return "", fmt.Errorf("unexpected pai type: %s", pt)
	}

	return string(pt), nil
}

type PaiIndex string

const (
	PaiIndex1 PaiIndex = "1"
	PaiIndex2 PaiIndex = "2"
	PaiIndex3 PaiIndex = "3"
	PaiIndex4 PaiIndex = "4"
	PaiIndex5 PaiIndex = "5"
	PaiIndex6 PaiIndex = "6"
	PaiIndex7 PaiIndex = "7"
	PaiIndex8 PaiIndex = "8"
	PaiIndex9 PaiIndex = "9"
)

func (pi PaiIndex) ToUint8() (uint8, error) {
	i, err := strconv.Atoi(string(pi))
	if err != nil {
		return 0, err
	}

	return uint8(i), nil
}

var zihai2Index = map[string]PaiIndex{
	"東": PaiIndex1,
	"西": PaiIndex2,
	"南": PaiIndex3,
	"北": PaiIndex4,
	"白": PaiIndex5,
	"發": PaiIndex6,
	"中": PaiIndex7,
}

type Pai struct {
	Type    PaiType
	Index   PaiIndex
	IsFolou bool
	IsBonus bool
}

func NewPai(s string, t PaiType, isFolou, isBonus bool) (*Pai, error) {
	if idx, isZi := zihai2Index[s]; isZi {
		if t != PaiTypeZi {
			return nil, fmt.Errorf("unexpected pai type. got: %s, want: %s", t, PaiTypeZi)
		}

		return &Pai{
			Type:    PaiTypeZi,
			Index:   idx,
			IsFolou: isFolou,
			IsBonus: isBonus,
		}, nil
	}

	idxInt, err := strconv.Atoi(s)
	if err != nil {
		return nil, err
	}

	if idxInt < 1 || 9 < idxInt {
		return nil, fmt.Errorf("unexpected index: %s", s)
	}

	return &Pai{
		Type:    t,
		Index:   PaiIndex(s),
		IsFolou: isFolou,
		IsBonus: isBonus,
	}, nil
}
