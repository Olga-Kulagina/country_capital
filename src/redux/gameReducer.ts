import {CountryType} from '../components/Question';

type initialStateType = typeof initialState

// @ts-ignore
const initialState = {
    countryCapitalList: [
        {name: 'Англии', capital: 'Лондон', x: 51.507351, y: -0.127660},
        {name: 'Германии', capital: 'Берлин', x: 52.519881, y: 13.407338},
        {name: 'Росcии', capital: 'Москва', x: 55.753215, y: 37.622504},
        {name: 'Франции', capital: 'Париж', x: 48.856663, y: 2.351556},
        {name: 'Испании', capital: 'Мадрид', x: 40.419348, y: -3.700897},
        {name: 'Белоруссии', capital: 'Минск', x: 53.902496, y: 27.561481},
        {name: 'Украины', capital: 'Киев', x: 50.450458, y: 30.523460},
        {name: 'Австрии', capital: 'Вена', x: 48.206481, y: 16.363451},
    ],
    countryNumber: 0,
    displayCountry: {name: 'Англии', capital: 'Лондон', x: 51.507351, y: -0.127660},
    score: 0
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
            let newDisplayCountry = {...state}.countryCapitalList[action.nextCountryNumber]
            return {...state, countryNumber: action.nextCountryNumber, displayCountry: newDisplayCountry}
        }
        case 'RUN_NEW_GAME': {
            let shuffleArray = state.countryCapitalList
            shuffle(shuffleArray)
            console.log(shuffleArray)
            return {...state, countryCapitalList: shuffleArray, displayCountry: shuffleArray[0]}
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

export const runNewGame = () => ({
    type: 'RUN_NEW_GAME',
} as const)

export const increaseScore = () => ({
    type: 'INCREASE_SCORE',
} as const)


type GetCountryType = ReturnType<typeof getCountry>
type RunNewGameType = ReturnType<typeof runNewGame>
type IncreaseScoreType = ReturnType<typeof increaseScore>

