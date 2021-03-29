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
    const [focus, setFocus] = useState<boolean>(true)

    let countryNumber = useSelector<AppRootStateType, number>(state => state.game.countryNumber)
    let score = useSelector<AppRootStateType, number>(state => state.game.score)


    const onCheckClick = () => {
        if (userAnswer.toLowerCase() === props.country.capital.toLowerCase()) {
            setRight(true)
            dispatch(increaseScore())
        } else {
            setRight(false)
        }
        setTimeout(setIsChecked, 10, true)
    }

    const onNextClick = () => {

        if(countryNumber + 1 < props.displayList.length) {
            dispatch(getCountry(countryNumber))
            setUserAnswer('')
        } else {
            alert('Game Over')
        }
        setIsChecked(false)

    }

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserAnswer(e.currentTarget.value)
    }

    return (
        <div>
            <div>
                Score: {score}
            </div>

            {!isChecked ?
                <div>
                    <div>
                        Столица {props.country.name}?
                    </div>
                    <Input style={{width: '200px'}} autoFocus={true}
                           value={userAnswer} onChange={onInputChange} onPressEnter={onCheckClick}></Input>
                    <Button onClick={onCheckClick}>Check</Button>
                </div>
                : <div style={{height: '50px'}}>
                    {right ? 'Правильно!' : 'Неверно!'} Ответ: {props.country.capital}
                    <Button onClick={onNextClick} autoFocus={true}>Next</Button>
                </div>
            }
        </div>
    )
}