import { useEffect, useState } from 'react'
import {Table as TableRewind } from '@rewind-ui/core';
import './App.css'
import { Station } from './interface/ForecastData';
import DropDownWeatherStationSelector, { fetchData } from './components/DropDownWeatherStationSelector';

function App() {

  const [stations, setStations] = useState<Station[]|null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch XML data
    fetchData(setError, setStations, []);
  }, []);


  const filterData = (stationsToggle: {idOfStation: string, open: boolean}[]) => {
    fetchData(setError, setStations, stationsToggle);
  }

  return (
    <div>
      <h1>Núverandi veður</h1>
      {error && <p>Error: {error}</p>}
      {!stations && !error && <p>Loading...</p>}
      {stations && (
        <div>
            <TableRewind headerColor='gray' size='md' radius='lg' striped stripePosition='even' hoverable borderStyle='solid' outerBorders headerBorders footerBorders horizontalBorders>
                    <TableRewind.Thead>
                        <TableRewind.Tr>
                            <TableRewind.Th>Staðsetning</TableRewind.Th>
                            <TableRewind.Th>Veðurfar</TableRewind.Th>
                            <TableRewind.Th>Hitastig</TableRewind.Th>
                            <TableRewind.Th>Vindhraði</TableRewind.Th>
                        </TableRewind.Tr>
                    </TableRewind.Thead>
                    <TableRewind.Tbody>
                        {stations.map((station) => (
                            <TableRewind.Tr key={station.$.id}>
                                    <TableRewind.Td>{station.name}</TableRewind.Td>
                                    <TableRewind.Td>{station.forecast[0].W}</TableRewind.Td>
                                    <TableRewind.Td>{`${station.forecast[0].T} °c`}</TableRewind.Td>
                                    <TableRewind.Td>{`${station.forecast[0].F} m/s`}</TableRewind.Td>
                            </TableRewind.Tr>
                        ))}
                    </TableRewind.Tbody>
            </TableRewind>
            <DropDownWeatherStationSelector filterData={filterData}/>

        </div>
      )}

      
    </div>
    
  );
};


export default App

