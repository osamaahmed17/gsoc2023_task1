import { ReactWidget } from '@jupyterlab/apputils';
import React, { useState } from 'react';
import { Card, Elevation, FormGroup, InputGroup } from "@blueprintjs/core";
import '@blueprintjs/core/lib/css/blueprint.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";



/**
 * React component for a weather.
 *
 * @returns The React component
 */


let sideBarStyle = {
    width: 220,
    left: 70
}

interface Weather {
    weather: (WeatherEntity)[]
    main: Main;

}

interface WeatherEntity {
    main: string;
    description: string;
}
interface Main {
    temp: number;

}


const WeatherComponent = (): JSX.Element => {
    const [currentCity, setCity] = useState('');

    const [apiResult, setResult] = useState<Weather>({
        weather: [{ main: '', description: '' }],
        main: {
            temp: 0
        }

    });
    const [errorResult, setError] = useState('');
    async function getWeather(this: any) {

        var getCity = currentCity
        var firstCharacter = getCity.substring(0, 1);
        if (firstCharacter == firstCharacter.toLowerCase() && firstCharacter != firstCharacter.toUpperCase()) {
            getCity = getCity[0].toUpperCase() + getCity.slice(1).toLowerCase();
        }
        if (getCity !== '') {
            let response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + getCity + '&APPID=dbf00d7a4d89a57ebdfde37bc29c465b&units=metric');
            console.log(response.ok)
            if (response.ok === true) {
                const data = await response.json() as Weather;
                setResult(data);
                setError('')

            }
            else if (response.ok === false) {
                let error = "Enter Correct City Name"
                setError(error)
                const data = {
                    weather: [{ main: '', description: '' }],
                    main: {
                        temp: 0
                    }
                }
                setResult(data);
            }
        }

    }

    function handleChangeFullName(event: React.ChangeEvent<HTMLInputElement>) {
        setCity(event.target.value)
    }

    let tableView;
    if (apiResult.weather[0].main !== '') {
        tableView =
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">Temp</th>
                        <th scope="col">Weather</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">{apiResult.main.temp}</th>
                        <td >{apiResult.weather[0].description}</td>
                    </tr>
                </tbody>
            </table>
    }
    else if (errorResult !== '') {
        tableView = <table className="table table-dark">
            <tbody>
                <tr>
                    <th scope="row">{errorResult}</th>
                </tr>
            </tbody>
        </table>
    }
    return (
        <div style={sideBarStyle}>
            <Card interactive={true} elevation={Elevation.TWO}>
                <h4>Query Weather</h4>
                <FormGroup
                    label="City Name"
                    labelFor="text-input"
                    labelInfo="(required)">
                    <InputGroup id="text-input" placeholder="Enter City Name" onChange={handleChangeFullName} />
                </FormGroup>
                <button type="button" className="btn btn-success" onClick={() => getWeather()}>Submit</button>
            </Card>
            {tableView}
        </div>
    );
};


export class WeatherWidget extends ReactWidget {
    constructor() {
        super();
        this.addClass('jp-ReactWidget');
    }

    render(): React.ReactElement<any> {
        return <WeatherComponent />;
    }
}