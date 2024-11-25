export interface ForecastData {
    forecasts: {
        station: Station[]
    }
}

export interface Station {
    $: {
        id: string
        valid: string
    }
    name: string[] // Array because the XML uses arrays for single elements
    atime: string[]
    err: string[]
    link: string[]
    forecast: Forecast[]
}

export interface Forecast {
    ftime: string[] // Time of forecast
    F: string[] // Wind speed
    D: string[] // Wind direction
    T: string[] // Temperature
    W: string[] // Weather description
}
