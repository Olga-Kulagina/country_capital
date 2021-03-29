import {countryCapitalList, countryCapitalListAll} from '../data';
import {CountryType} from '../components/Question';

type initialStateType = typeof initialState
export type countrySetType =
    'Europe'
    | 'Asia'
    | 'Africa'
    | 'Australia and Oceania'
    | 'North America'
    | 'South America'
    | 'All'

const initialState = {
    countryCapitalList: countryCapitalList,
    countryCapitalListAll: countryCapitalListAll,
    displayList: [] as Array<CountryType>,
    countrySet: 'Europe',
    countryNumber: 0,
    displayCountry: {} as CountryType,
    score: 0,
    record: Number(localStorage.getItem('record')) | 0,
    isGameStart: false
}


type ActionTypes = GetCountryType | RunNewGameType | IncreaseScoreType | SetGameOverType

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
            let shuffleArray = [] as Array<CountryType>
            if (action.countrySet === 'All') {
                shuffleArray = state.countryCapitalListAll.slice()
                console.log(shuffleArray)
            } else {
                shuffleArray = state.countryCapitalList[action.countrySet].slice()
                console.log(shuffleArray)
            }
            shuffle(shuffleArray)
            shuffleArray.splice(action.numberOfQuestions)
            console.log(shuffleArray)
            return {...state, displayList: shuffleArray, displayCountry: shuffleArray[0], isGameStart: true}
        }
        case 'INCREASE_SCORE': {
            return {...state, score: state.score + 1}
        }
        case 'SET_GAME_OVER': {
            localStorage.setItem('record', action.score > state.record ? action.score.toString() : state.record.toString())
            return {
                ...state,
                isGameStart: false,
                score: 0,
                countryNumber: 0,
                record: action.score > state.record ? action.score : state.record
            }
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

export const runNewGame = (countrySet: countrySetType, numberOfQuestions: number) => ({
    type: 'RUN_NEW_GAME',
    countrySet,
    numberOfQuestions
} as const)

export const increaseScore = () => ({
    type: 'INCREASE_SCORE'
} as const)

export const setGameOver = (score: number) => ({
    type: 'SET_GAME_OVER',
    score
} as const)


type GetCountryType = ReturnType<typeof getCountry>
type RunNewGameType = ReturnType<typeof runNewGame>
type IncreaseScoreType = ReturnType<typeof increaseScore>
type SetGameOverType = ReturnType<typeof setGameOver>

