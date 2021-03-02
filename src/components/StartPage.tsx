import React from 'react'
import {Button} from 'antd';
import {runNewGame} from '../redux/gameReducer';
import {useDispatch} from 'react-redux';

export const StartPage = () => {
    const dispatch = useDispatch()

    const onStartClick = () => {
        dispatch(runNewGame('South America'))
    }

    return (
        <div>
            <Button onClick={onStartClick}>start</Button>
        </div>
    )
}