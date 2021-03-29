import React, {useState} from 'react'
import {Button, InputNumber, Radio, RadioChangeEvent} from 'antd';
import {countrySetType, runNewGame} from '../redux/gameReducer';
import {useDispatch} from 'react-redux';

export const StartPage = () => {
    const dispatch = useDispatch()

    const [radioCountryValue, setRadioCountryValue] = useState<countrySetType>('Europe');
    const [numberOfQuestions, setNumberOfQuestions] = useState<number>(10);

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
    }

    return (
        <div>
            <div>
                <h2>Select region</h2>
                <Radio.Group onChange={onRegionChange} value={radioCountryValue}>
                    <Radio value='Europe'>Europe</Radio>
                    <Radio value='Asia'>Asia</Radio>
                    <Radio value='Africa'>Africa</Radio>
                    <Radio value='Australia and Oceania'>Australia and Oceania</Radio>
                    <Radio value='North America'>North America</Radio>
                    <Radio value='South America'>South America</Radio>
                </Radio.Group>
                <h2>Select the number of questions</h2>
                <InputNumber min={5} max={maxNumberOfQuestions} value={numberOfQuestions} onChange={onNumberOfQuestionChange} />
            </div>
            <div>
                <Button onClick={onStartClick}>start</Button>
            </div>
        </div>
    )
}