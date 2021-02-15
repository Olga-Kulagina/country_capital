import React, {useEffect, useState} from 'react';
import './App.css';
import 'ol/ol.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZSource from 'ol/source/XYZ';
import {fromLonLat} from 'ol/proj';
import {CountryType, Question} from './components/Question';
import {Button} from 'antd';
import {useSelector} from 'react-redux';
import {AppRootStateType} from './redux/redux-store';

function App() {

    useEffect(() => {

        let view = new View({
            center: fromLonLat([37.6178, 55.7517]),
            zoom: 6,
        });


        const map = new Map({
            target: 'map',
            layers: [
                new TileLayer({
                    source: new XYZSource({
                        url: 'https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default//GoogleMapsCompatible_Level8/{z}/{y}/{x}.jpg'
                    })
                })
            ],
            view: view
        });


        const london = fromLonLat([-0.12755, 51.507222]);

        let button = document.getElementById('pan-to-london')
//@ts-ignore
        button.addEventListener('click', () => {
            view.animate({
                center: london,
                duration: 2000,
            });
        });

    }, [])

    let displayCountry = useSelector<AppRootStateType, CountryType>(state => state.game.displayCountry)
    let countryCapitalList = useSelector<AppRootStateType, Array<CountryType>>(state => state.game.countryCapitalList)

    return (
        <div>
            <Question country={displayCountry} countryCapitalList={countryCapitalList}/>
            <div id='map' className='map' style={{height: '500px', width: '1000px'}}>
                <Button id="pan-to-london">Pan to London</Button>
            </div>
        </div>

    );
}

export default App;
