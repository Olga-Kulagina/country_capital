import {CountryType} from '../components/Question';

type initialStateType = typeof initialState

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
    displayCountry: {name: 'Англии', capital: 'Лондон', x: 51.507351, y: -0.127660}
}


type ActionTypes = GetCountryType

export const gameReducer = (state: initialStateType = initialState, action: ActionTypes): initialStateType => {
    switch (action.type) {
        case 'GET_COUNTRY': {
            return {...state, countryNumber: action.nextCountryNumber, displayCountry: action.countryCapitalList[action.nextCountryNumber]}
        }
        default: {
            return state
        }
    }
}

export const getCountry = (countryNumber: number, countryCapitalList: Array<CountryType>) => ({
    type: 'GET_COUNTRY',
    nextCountryNumber: countryNumber + 1,
    countryCapitalList
} as const)


type GetCountryType = ReturnType<typeof getCountry>

