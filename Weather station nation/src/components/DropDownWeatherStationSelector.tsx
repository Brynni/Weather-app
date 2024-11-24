import { Checkbox, Button, Drawer  } from '@rewind-ui/core';
import { useState } from 'react';
import { ForecastData, Station } from '../interface/ForecastData';
import moment from 'moment';
import xml2js from 'xml2js';


const DropDownWeatherStationSelector: React.FC<{ filterData : (stationsToggle: {
    idOfStation: string;
    open: boolean;
}[]) => void}> = ({ filterData }) => {
    const [open, setOpen] = useState(false);
    const [ReykjavíkOpen, setReykjavíkOpen] = useState(true);
    const [AkureyriOpen, setAkureyriOpen] = useState(true);
    const [ÞingvellirOpen, setÞingvellirOpen] = useState(true);
    const [BláfjöllOpen, setBláfjöllOpen] = useState(true);

    return (
    <>
        <Drawer shadow="none" overlayBlur={"none"} open={open} onClose={() => setOpen(false)}>
            <div style={{display:"flex", flexDirection:"column", gap:"1rem", width : 300, padding: "2rem"}}>
                <Checkbox onClick={() => setAkureyriOpen(!AkureyriOpen)} value={3471} label='Akureyri' checked={AkureyriOpen}/>
                <Checkbox onClick={() => setReykjavíkOpen(!ReykjavíkOpen)} value={1} label='Reykjavík' checked={ReykjavíkOpen}/>
                <Checkbox onClick={() => setÞingvellirOpen(!ÞingvellirOpen)} value={1596} label='Þingvellir' checked={ÞingvellirOpen}/>
                <Checkbox onClick={() => setBláfjöllOpen(!BláfjöllOpen)} value={1486} label='Bláfjöll' checked={BláfjöllOpen}/>
                <Button onClick={() => filterData([{idOfStation: "1", open: ReykjavíkOpen}, {idOfStation: "3471", open: AkureyriOpen}, {idOfStation: "1596", open: ÞingvellirOpen}, {idOfStation: "1486", open: BláfjöllOpen}])}>Sía</Button>
            </div>
        </Drawer>
        <Button onClick={() => setOpen(!open)}>Stilla stöðvar</Button>
    </>
    
  );
}

export const fetchData = async (setError: React.Dispatch<React.SetStateAction<string>>, setStations: React.Dispatch<React.SetStateAction<Station[] | null>>, stationsToggle:{idOfStation: string, open: boolean}[] | []) => {
    try {
        let weatherStationIds = '3471;1;1596;1486';

        if (stationsToggle?.length > 0)
        {
            console.log("Stations toggle ", stationsToggle)
            const stringArray = [];
            for (const item of stationsToggle)
            {
                console.log(item);
                console.log(item.open);
                if (item.open)
                {
                    stringArray.push(item.idOfStation)
                }
                console.log("string array status", stringArray)
            }
            weatherStationIds = stringArray.join(";");

            console.log("weather station ids", weatherStationIds)
        } 

      const response = await fetch('/api/weather', {
          headers: {
              'x-ids': weatherStationIds, // Dynamically specify station IDs
          },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const xmlText = await response.text();
      
     // Convert to JSON-like object
      // Parse the XML string
      const parser = new xml2js.Parser();
      parser.parseString(xmlText, (err: unknown, result: ForecastData) => {
          if (err) {
              console.error();
              setError(`Error parsing XML:${err}`)
          } else {
              console.log("Parsed JSON:", result);

              // The station data is returning outdated data
              // Remove the outdated data
              const currentTime = moment();
              const filteredStations = result.forecasts.station.filter(station => {
                  // Filter the forecasts for the station
                  station.forecast = station.forecast.filter(singleForecast => {
                      return moment(singleForecast.ftime, 'YYYY-MM-DD HH:mm:ss') >= currentTime
                  });
                
                  // Keep the station only if it has any remaining forecasts
                  return station.forecast.length > 0;
                });
              setStations(filteredStations);
          }
      });

      // Set parsed data to state
      // setStations(json);
    } catch (err) {
      console.log("error: ", err)
      // setError(err.message);
    }
  };

export default DropDownWeatherStationSelector;