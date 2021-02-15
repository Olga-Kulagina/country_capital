type initialStateType = typeof initialState

const initialState = {
    mapCenterX: 53.562004,
    mapCenterY: 23.788890,
    baseUrl: ''
}
//'https://stamen-tiles-c.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg'
//'https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default//GoogleMapsCompatible_Level8/{z}/{y}/{x}.jpg'

type ActionTypes = SetMapCenterType | SetBaseUrlType

export const mapReducer = (state: initialStateType = initialState, action: ActionTypes): initialStateType => {
    switch (action.type) {
        case 'SET_MAP_CENTER': {
            return {...state, mapCenterX: action.newMapCenterX, mapCenterY: action.newMapCenterY}
        }
        case 'SET_BASE_URL': {
            return {...state, baseUrl: action.newUrl}
        }
        default: {
            return state
        }
    }
}

export const setMapCenter = (newMapCenterX: number, newMapCenterY: number) => ({
    type: 'SET_MAP_CENTER',
    newMapCenterX,
    newMapCenterY
} as const)

export const setBaseUrl = (newUrl: string) => ({
    type: 'SET_BASE_URL',
    newUrl
} as const)

type SetMapCenterType = ReturnType<typeof setMapCenter>
type SetBaseUrlType = ReturnType<typeof setBaseUrl>

