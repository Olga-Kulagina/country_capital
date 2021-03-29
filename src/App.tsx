import React from 'react';
import './App.css';
import {GamePage} from './components/GamePage';
import {StartPage} from './components/StartPage';
import {useSelector} from 'react-redux';
import {AppRootStateType} from './redux/redux-store';
import {Col, Row} from 'antd';

function App() {

    const isGameStart = useSelector<AppRootStateType, boolean>(state => state.game.isGameStart)

    return (
        <div>
            <Row justify='center'>
                <Col span={24} style={{textAlign: 'center'}}>
                    {!isGameStart ?
                        <StartPage />
                        : <GamePage />
                    }
                </Col>
            </Row>

        </div>

    );
}

export default App;
