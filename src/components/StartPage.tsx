import React, {useState} from 'react'
import {Button, InputNumber, Radio, RadioChangeEvent} from 'antd';
import {countrySetType, runNewGame} from '../redux/gameReducer';
import {useDispatch} from 'react-redux';

type StartPageType = {
    record: number
}

export const StartPage = (props: StartPageType) => {
    const dispatch = useDispatch()

    const [radioCountryValue, setRadioCountryValue] = useState<countrySetType>('Europe');
    const [numberOfQuestions, setNumberOfQuestions] = useState<number>(5);

    const onRegionChange = (e: RadioChangeEvent) => {
        setRadioCountryValue(e.target.value);
    };

    const onNumberOfQuestionChange = (value: string | number | null | undefined) => {
        setNumberOfQuestions(Number(value))
    }

    const onStartClick = () => {
        dispatch(runNewGame(radioCountryValue, numberOfQuestions))
    }

    let maxNumberOfQuestions = 0

    switch(radioCountryValue) {
        case 'Europe':
            maxNumberOfQuestions = 44
            break
        case 'Asia':
            maxNumberOfQuestions = 47
            break
        case 'Africa':
            maxNumberOfQuestions = 54
            break
        case 'Australia and Oceania':
            maxNumberOfQuestions = 14
            break
        case 'North America':
            maxNumberOfQuestions = 23
            break
        case 'South America':
            maxNumberOfQuestions = 12
            break
        case 'All':
            maxNumberOfQuestions = 194
            break
    }

    return (
        <div>
            <div>
                <h2>Выберите регион</h2>
                <Radio.Group onChange={onRegionChange} value={radioCountryValue}>
                    <Radio value='Europe'>Европа</Radio>
                    <Radio value='Asia'>Азия</Radio>
                    <Radio value='Africa'>Африка</Radio>
                    <Radio value='Australia and Oceania'>Австралия и Океания</Radio>
                    <Radio value='North America'>Северная Америка</Radio>
                    <Radio value='South America'>Южная Америка</Radio>
                    <Radio value='All'>Весь мир</Radio>
                </Radio.Group>
                <h2>Выберите количество вопросов</h2>
                <InputNumber min={5} max={maxNumberOfQuestions} value={numberOfQuestions} onChange={onNumberOfQuestionChange} />
            </div>
            <div>
                <Button onClick={onStartClick}>Старт!</Button>
            </div>
            <div>
                <h2>Рекорд: {props.record}</h2>
            </div>
        </div>
    )
}