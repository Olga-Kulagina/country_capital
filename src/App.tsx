import React from 'react';
import './App.css';
import {GamePage} from './components/GamePage';
import {StartPage} from './components/StartPage';
import {useSelector} from 'react-redux';
import {AppRootStateType} from './redux/redux-store';

function App() {

    const isGameStart = useSelector<AppRootStateType, boolean>(state => state.game.isGameStart)

    return (
        <div>
            {!isGameStart ?
                <StartPage />
                : <GamePage />
            }
        </div>

    );
}

export default App;
