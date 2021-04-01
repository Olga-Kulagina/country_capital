import React from 'react'
import {CountryType, Question} from './Question';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../redux/redux-store';
import {LeafletMap} from './LeafletMap';

type GamePageType = {
    lastRecord: number
    isGameStart: boolean
}

export const GamePage = (props: GamePageType) => {

    let displayCountry = useSelector<AppRootStateType, CountryType>(state => state.game.displayCountry)
    let displayList = useSelector<AppRootStateType, Array<CountryType>>(state => state.game.displayList)

    return (
        <div>
            <Question country={displayCountry} displayList={displayList} lastRecord={props.lastRecord} isGameStart={props.isGameStart}/>
            <LeafletMap country={displayCountry}/>
        </div>
    )
}