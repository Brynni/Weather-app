import React, { useState } from 'react'
import moment from 'moment'
import xml2js from 'xml2js'
import { Checkbox, Button, Drawer } from '@rewind-ui/core'
import { allWeatherStations } from '../data/weatherStationData'
import { ForecastData, Station } from '../interface/ForecastData'

const DropDownWeatherStationSelector: React.FC<{
    filterData: (
        stationsToggle: {
            id: number
            name: string
            checked: boolean
        }[],
    ) => void
}> = ({ filterData }) => {
    // Attribuation for the checkbox implementation goes to https://www.codingdeft.com/posts/react-checkbox/

    const [open, setOpen] = useState(false)
    const [allWeatherStationCheckboxes, setAllWeatherStationCheckboxes] =
        useState(allWeatherStations)

    const updateCheckStatus = (index: number) => {
        setAllWeatherStationCheckboxes(
            allWeatherStationCheckboxes.map(
                (weatherStationCheckbox, currentIndex) =>
                    currentIndex === index
                        ? {
                              ...weatherStationCheckbox,
                              checked: !weatherStationCheckbox.checked,
                          }
                        : weatherStationCheckbox,
            ),
        )
    }

    return (
        <>
            <Drawer
                shadow="none"
                overlayBlur={'none'}
                open={open}
                onClose={() => setOpen(false)}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        width: 400,
                        padding: '2rem',
                    }}
                >
                    <h1>Veðurstöðvar</h1>
                    {allWeatherStationCheckboxes.map(
                        (weatherStationCheckbox, index) => (
                            <Checkbox
                                key={weatherStationCheckbox.name}
                                checked={weatherStationCheckbox.checked}
                                onClick={() => updateCheckStatus(index)}
                                label={weatherStationCheckbox.name}
                            />
                        ),
                    )}

                    <Button
                        onClick={() => filterData(allWeatherStationCheckboxes)}
                    >
                        Sía
                    </Button>
                </div>
            </Drawer>
            <div style={{ padding: '1rem' }}>
                <Button size="lg" onClick={() => setOpen(!open)}>
                    Stilla stöðvar
                </Button>
            </div>
        </>
    )
}

export const fetchData = async (
    setError: React.Dispatch<React.SetStateAction<string>>,
    setStations: React.Dispatch<React.SetStateAction<Station[] | null>>,
    stationsToggle: { id: number; name: string; checked: boolean }[] | [],
) => {
    try {
        let weatherStationIds = allWeatherStations
            .map((station) => station.id)
            .join(';')

        if (stationsToggle?.length > 0) {
            const stringArray = []
            for (const item of stationsToggle) {
                if (item.checked) {
                    stringArray.push(item.id)
                }
            }
            weatherStationIds = stringArray.join(';')
        }

        const response = await fetch('/api/weather', {
            headers: {
                'x-ids': weatherStationIds, // Dynamically specify station IDs
            },
        })
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const xmlText = await response.text()

        // Convert to JSON-like object
        // Parse the XML string
        const parser = new xml2js.Parser()
        parser.parseString(xmlText, (err: unknown, result: ForecastData) => {
            if (err) {
                console.error()
                setError(`Error parsing XML:${err}`)
            } else {
                // The station data is returning outdated data
                // Remove the outdated data
                const currentTime = moment().format("YYYY-MM-DD HH")
                const filteredStations = result.forecasts.station.filter(
                    (station) => {
                        // Filter the forecasts for the station
                        station.forecast = station.forecast.filter(
                            (singleForecast) => {
                                return (
                                    moment(
                                        singleForecast.ftime,
                                        'YYYY-MM-DD HH:mm:ss',
                                    ).format("YYYY-MM-DD HH") >= currentTime
                                )
                            },
                        )

                        // Keep the station only if it has any remaining forecasts
                        return station.forecast.length > 0
                    },
                )
                setStations(filteredStations)
            }
        })
    } catch (err) {
        console.log('error: ', err)
        // setError(err.message);
    }
}

export default DropDownWeatherStationSelector
