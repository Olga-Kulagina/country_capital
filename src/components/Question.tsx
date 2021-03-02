import React, {ChangeEvent, useState} from 'react'
import {Button, Input} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../redux/redux-store';
import {getCountry, increaseScore} from '../redux/gameReducer';

export type CountryType = {
    name: string,
    capital: string,
    x: number,
    y: number
}

type QuestionPropsType = {
    country: CountryType
    displayList: Array<CountryType>
}

export const Question = (props: QuestionPropsType) => {
    const dispatch = useDispatch()

    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [userAnswer, setUserAnswer] = useState<string>('');
    const [right, setRight] = useState<boolean>(false);

    let countryNumber = useSelector<AppRootStateType, number>(state => state.game.countryNumber)
    let score = useSelector<AppRootStateType, number>(state => state.game.score)


    const onCheckClick = () => {
        if (userAnswer.toLowerCase() === props.country.capital.toLowerCase()) {
            setRight(true)
            dispatch(increaseScore())
        } else {
            setRight(false)
        }
        setIsChecked(true)
    }

    const onNextClick = () => {
        setIsChecked(false)
        if(countryNumber + 1 < props.displayList.length) {
            dispatch(getCountry(countryNumber))
            setUserAnswer('')
        } else {
            alert('Game Over')
        }

    }

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserAnswer(e.currentTarget.value)
    }

    return (
        <div>
            <div>
                Score: {score}
            </div>
            <div>
                Столица {props.country.name}?
            </div>
            <div>
                <Input value={userAnswer} onChange={onInputChange} onPressEnter={onCheckClick}></Input>
            </div>
            <div>
                <Button onClick={onCheckClick}>Check</Button>
            </div>
            {isChecked ?
                <div>
                    {right ? 'Правильно!' : 'Неверно!'} Ответ: {props.country.capital}
                    <Button onClick={onNextClick}>Next</Button>
                </div>
                : ''
            }
        </div>
    )
}