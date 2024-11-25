import React from 'react'
import { Button, Card, Modal, Table as TableRewind } from '@rewind-ui/core'
import { Station } from '../interface/ForecastData'
import moment from 'moment'
import { useState } from 'react'
import 'moment/dist/locale/is'

const SingleWeatherStationTable: React.FC<{ selectedStation: Station }> = ({
    selectedStation,
}) => {
    moment.locale('is')

    const [open, setOpen] = useState(false)

    const createTableForDate = () => {
        const nextElevenDays = []
        const nextElevenDaysElems = []
        for (let i = 0; i < 11; i++) {
            const day = moment().add(i, 'days') // Format as desired
            nextElevenDays.push(day)
        }

        for (let i = 0; i < nextElevenDays.length; i++) {
            const selectedDate = nextElevenDays[i]
            const filterDataByDate = selectedStation.forecast.filter(
                (forecast) => {
                    return (
                        moment(forecast.ftime, 'YYYY-MM-DD HH:mm:ss').format(
                            'DDD',
                        ) === selectedDate.format('DDD')
                    )
                },
            )
            nextElevenDaysElems.push(
                <>
                    <div
                        style={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'center',
                            background: 'rgba(133,166,212,0.2',
                            padding: '1rem',
                        }}
                    >
                        <h2 style={{ textTransform: 'capitalize' }}>
                            {selectedDate.locale('is').format('dddd, MMMM DD')}
                        </h2>
                    </div>
                    <TableRewind
                        headerColor="gray"
                        size="md"
                        radius="lg"
                        striped
                        stripePosition="even"
                        hoverable
                        borderStyle="solid"
                        outerBorders
                        headerBorders
                        footerBorders
                        horizontalBorders
                    >
                        <TableRewind.Thead>
                            <TableRewind.Tr>
                                <TableRewind.Th>Tími</TableRewind.Th>
                                <TableRewind.Th>Veðurfar</TableRewind.Th>
                                <TableRewind.Th>Hitastig</TableRewind.Th>
                                <TableRewind.Th>Vindhraði</TableRewind.Th>
                            </TableRewind.Tr>
                        </TableRewind.Thead>
                        <TableRewind.Tbody>
                            {filterDataByDate.map((singleForecast) => (
                                <TableRewind.Tr
                                    key={singleForecast.ftime.toString()}
                                >
                                    <TableRewind.Td
                                        style={{ width: '25%' }}
                                        align="center"
                                    >
                                        {moment(
                                            singleForecast.ftime,
                                            'YYYY-MM-DD HH:mm:ss',
                                        ).format('HH:mm')}
                                    </TableRewind.Td>
                                    <TableRewind.Td
                                        style={{ width: '40%' }}
                                        align="center"
                                    >
                                        {singleForecast.W}
                                    </TableRewind.Td>
                                    <TableRewind.Td align="center">{`${singleForecast.T} °c`}</TableRewind.Td>
                                    <TableRewind.Td align="center">{`${singleForecast.F} m/s`}</TableRewind.Td>
                                </TableRewind.Tr>
                            ))}
                        </TableRewind.Tbody>
                    </TableRewind>
                </>,
            )
        }
        return <>{nextElevenDaysElems}</>
    }

    return (
        <div>
            <Button onClick={() => setOpen(true)}>Sjá næstu daga!</Button>
            <Modal mode="fullscreen" open={open} onClose={() => setOpen(false)}>
                <Card size="lg">
                    <Card.Header
                        style={{
                            background: 'rgba(133,166,212,0.4)',
                            minWidth: '50rem',
                        }}
                    >
                        <h1>{selectedStation.name}</h1>
                        <Button onClick={() => setOpen(false)}>Loka</Button>
                    </Card.Header>
                    <Card.Body>{createTableForDate()}</Card.Body>
                </Card>
            </Modal>
        </div>
    )
}

export default SingleWeatherStationTable
