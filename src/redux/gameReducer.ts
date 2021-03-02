import {countryCapitalList} from '../data';
import {CountryType} from '../components/Question';

type initialStateType = typeof initialState
type countrySetType = 'Europe' | 'Asia' | 'Africa' | 'Australia and Oceania' | 'North America' | 'South America'

const initialState = {
    countryCapitalList: countryCapitalList,
    displayList: [] as Array<CountryType>,
    countrySet: 'Europe',
    countryNumber: 0,
    displayCountry: {name: 'Англии', capital: 'Лондон', x: 51.507351, y: -0.127660},
    score: 0,
    isGameStart: false
}


type ActionTypes = GetCountryType | RunNewGameType | IncreaseScoreType
//Тасование Фишера — Йетса
function shuffle(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


export const gameReducer = (state: initialStateType = initialState, action: ActionTypes): initialStateType => {
    switch (action.type) {
        case 'GET_COUNTRY': {
            let newDisplayCountry = {...state}.displayList[action.nextCountryNumber]
            return {...state, countryNumber: action.nextCountryNumber, displayCountry: newDisplayCountry}
        }
        case 'RUN_NEW_GAME': {
            let shuffleArray = state.countryCapitalList[action.countrySet]
            shuffle(shuffleArray)
            console.log(shuffleArray)
            return {...state, displayList: shuffleArray, displayCountry: shuffleArray[0], isGameStart: true}
        }
        case 'INCREASE_SCORE': {
            return {...state, score: state.score + 1}
        }
        default: {
            return state
        }
    }
}

export const getCountry = (countryNumber: number) => ({
    type: 'GET_COUNTRY',
    nextCountryNumber: countryNumber + 1
} as const)

export const runNewGame = (countrySet: countrySetType) => ({
    type: 'RUN_NEW_GAME',
    countrySet
} as const)

export const increaseScore = () => ({
    type: 'INCREASE_SCORE',
} as const)


type GetCountryType = ReturnType<typeof getCountry>
type RunNewGameType = ReturnType<typeof runNewGame>
type IncreaseScoreType = ReturnType<typeof increaseScore>

