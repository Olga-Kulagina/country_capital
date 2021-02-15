import React, {ChangeEvent, useState} from 'react'
import {Button, Input} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../redux/redux-store';
import {getCountry} from '../redux/gameReducer';

export type CountryType = {
    name: string,
    capital: string,
    x: number,
    y: number
}

type QuestionPropsType = {
    country: CountryType
    countryCapitalList: Array<CountryType>
}

export const Question = (props: QuestionPropsType) => {
    const dispatch = useDispatch()

    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [userAnswer, setUserAnswer] = useState<string>('');
    const [right, setRight] = useState<boolean>(false);

    let countryNumber = useSelector<AppRootStateType, number>(state => state.game.countryNumber)


    const onCheckClick = () => {
        if (userAnswer === props.country.capital) {
            setRight(true)
        } else {
            setRight(false)
        }
        setIsChecked(true)
    }

    const onNextClick = () => {
        setIsChecked(false)
        if(countryNumber + 1 < props.countryCapitalList.length) {
            dispatch(getCountry(countryNumber))
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
                Столица {props.country.name}?
            </div>
            <div>
                <Input value={userAnswer} onChange={onInputChange}></Input>
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