import React from 'react';
import './App.css';
import {GamePage} from './components/GamePage';
import {StartPage} from './components/StartPage';
import {useSelector} from 'react-redux';
import {AppRootStateType} from './redux/redux-store';
import {Col, Row} from 'antd';
import {Redirect, Route, Switch } from 'react-router-dom';
import {RecordsPage} from './components/RecordsPage';

export const PATH = {
    START: "/start",
    GAME: '/game',
    RECORDS: "/records",
}

function App() {

    let lastRecord = useSelector<AppRootStateType, number>(state => state.game.lastRecord)
    const isGameStart = useSelector<AppRootStateType, boolean>(state => state.game.isGameStart)

    return (
        <div>
            <Row justify='center'>
                <Col span={24} style={{textAlign: 'center'}}>
            <Switch>
                <Route path={"/"} exact render={() => <Redirect to={PATH.START}/>}/>


                <Route path={PATH.START} render={() => <StartPage lastRecord={lastRecord} isGameStart={isGameStart}/>}/>
                <Route path={PATH.GAME} render={() => <GamePage lastRecord={lastRecord} isGameStart={isGameStart}/>}/>
                <Route path={PATH.RECORDS} render={() => <RecordsPage />}/>


                {/*<Route render={() => <Error404/>}/>*/}
            </Switch>
                </Col>
            </Row>



        </div>

    );
}

export default App;
