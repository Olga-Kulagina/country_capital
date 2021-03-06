import React, {ChangeEvent, useState} from 'react'
import {Button, Input, Modal} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../redux/redux-store';
import {getCountry, increaseScore, setGameOver} from '../redux/gameReducer';
import {EnvironmentOutlined, RightOutlined} from '@ant-design/icons';
import {Redirect} from 'react-router-dom';
import {PATH} from '../App';

export type CountryType = {
    name: string,
    capital: string,
    x: number,
    y: number
}

type QuestionPropsType = {
    country: CountryType
    displayList: Array<CountryType>
    lastRecord: number
    isGameStart: boolean
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
        setTimeout(setIsChecked, 10, true)
    }

    function gameOver() {
        Modal.info({
            title: 'Вопросов больше нет!',
            content: (
                <div>
                    <p>Правильных ответов: {score}</p>
                    <p>Рекорд: {props.lastRecord > score ? props.lastRecord : score}</p>
                </div>
            ),
            icon: <EnvironmentOutlined  />,
            onOk() {
                dispatch(setGameOver(score))
            },
        })
    }
    function gameFinish() {
        Modal.info({
            title: 'Выход из игры',
            content: (
                <div>
                    <p>Правильных ответов: {score}</p>
                    <p>Рекорд: {props.lastRecord > score ? props.lastRecord : score}</p>
                </div>
            ),
            icon: <EnvironmentOutlined />,
            onOk() {
                dispatch(setGameOver(score))
            },
        })
    }

    const onNextClick = () => {

        if(countryNumber + 1 < props.displayList.length) {
            dispatch(getCountry(countryNumber))
            setUserAnswer('')
        } else {
            gameOver()
        }
        setIsChecked(false)
    }

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserAnswer(e.currentTarget.value)
    }

    if(!props.isGameStart) {
        return <Redirect to={PATH.START}/>
    }

    return (
        <div>
            <div>
                Счет: {score}
            </div>

            {!isChecked ?
                <div>
                    <div>
                        Столица {props.country.name}?
                    </div>
                    <Input style={{width: '200px'}} autoFocus={true}
                           value={userAnswer} onChange={onInputChange} onPressEnter={onCheckClick}></Input>
                    <Button onClick={onCheckClick}>Проверить</Button>
                </div>
                : <div style={{height: '50px'}}>
                    {right ? 'Правильно!' : 'Неверно!'} Ответ: {props.country.capital}
                    <Button onClick={onNextClick} autoFocus={true}><RightOutlined /></Button>
                </div>
            }
            <div>
                <Button onClick={gameFinish}>Завершить</Button>
            </div>
        </div>
    )
}