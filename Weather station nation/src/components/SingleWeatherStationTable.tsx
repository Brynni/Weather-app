import {Table as TableRewind } from '@rewind-ui/core';
import { ForecastData } from '../interface/ForecastData';
import moment from 'moment';

const SingleWeatherStationTable: React.FC<{ selectedStationForecast: ForecastData }> = ({ selectedStationForecast }) => {
    return (
        <div>
            <TableRewind headerColor='gray' size='md' radius='lg' striped stripePosition='even' hoverable borderStyle='solid' outerBorders headerBorders footerBorders horizontalBorders>
                <TableRewind.Tr>    
                    <TableRewind.Th>Time</TableRewind.Th>
                    <TableRewind.Th>Forecast</TableRewind.Th>
                    <TableRewind.Th>Temperature</TableRewind.Th>
                    <TableRewind.Th>Windspeed</TableRewind.Th>
                </TableRewind.Tr>    
                {selectedStationForecast.forecasts.station[0].forecast.map((weatherData) => (
                    <>
                        <TableRewind.Tbody>
                            <TableRewind.Td>{moment(weatherData.ftime, 'YYYY-MM-DD HH:mm:ss').format('MMM Do YYYY, HH:mm')}</TableRewind.Td>
                            <TableRewind.Td>{weatherData.W}</TableRewind.Td>
                            <TableRewind.Td>{weatherData.T}</TableRewind.Td>
                            <TableRewind.Td>{weatherData.F}</TableRewind.Td>        
                        </TableRewind.Tbody>
                    </>
                ))}
            </TableRewind>
        </div>
        );
    }; 

export default SingleWeatherStationTable;