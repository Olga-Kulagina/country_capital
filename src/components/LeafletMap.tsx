import React, {useRef} from 'react';
import {MapContainer, TileLayer, Marker, useMapEvent, useMap, MapConsumer} from 'react-leaflet'
import {CountryType} from './Question';


type LeafletMapPropsType = {
    country: CountryType
}

export const LeafletMap = (props: LeafletMapPropsType) => {

    return (
        <MapContainer style={{height: '500px'}} center={[48.206481, 16.363451]} zoom={4} scrollWheelZoom={false}>
            <TileLayer
                // attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default//GoogleMapsCompatible_Level8/{z}/{y}/{x}.jpg"
            />
            <Marker position={[props.country.x, props.country.y]}>
            </Marker>
            <MapConsumer>
                {(map) => {
                    map.flyTo([props.country.x, props.country.y], 4)
                    return null
                }}
            </MapConsumer>
        </MapContainer>
    )
}