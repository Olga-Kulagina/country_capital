import React from 'react'
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../redux/redux-store';
import {format} from 'date-fns'

export type recordType = {
    count: number
    date: number
}


export const RecordsPage = () => {

    let records = useSelector<AppRootStateType, Array<recordType>>(state => state.game.records)

    return (
        <div>
            <h2>Рекорды</h2>
            <div>
                {records.map(r => <div key={r.date}>{`${r.count} ${format(r.date, 'HH:mm dd.MM.yyyy')}`}</div>)}
            </div>

        </div>
    )
}