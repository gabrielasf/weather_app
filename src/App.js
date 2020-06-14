import React from 'react';
import { EuiComboBox, EuiCard } from '@elastic/eui';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      location: "",
      municipios: [],
      weather: null,
      error: false
    };
  }

  handleInput = event => {
    this.setState({
      location: event.target.value
    });
  }

  getWeather = () => {
   this.setState({
     loading: true,
     weather: null,
     error: false
    });

     fetch("https://www.el-tiempo.net/api/json/v2/provincias/08/municipios")
      .then((res) => res.json())
      .then(data => {
        return {
          id: municipio.COD_GEO,
          codprov: municipio.CODPROV,
          label: municipio.NOMBRE
        }

      })
       
          this.setState({
            municipios: data.municipios,
            loading: false
          });
       console.log(data.municipios)
      });
  };


  render() {
    return (
      <div>
        <input
          type="text"
          name="location"
          value={this.state.location}
          onChange={this.handleInput}
        />
        
        {this.state.loading && <div>Loading...</div>}
        {this.state.error && <div>{this.state.error}</div>}
        
          {municipios.map(municipio => (
            <li key={municipio.ID_REL}>  
              <h3>{municipio.NOMBRE}</h3>
              <h4>{municipio.COD_GEO}</h4>
          <h4>{this.state.location}</h4>
            </li>
          ))}

            <EuiComboBox
            placeholder="Seleccionar un municipio"
            singleSelection={{ asPlainText: true }}
            options={this.state.municipios}
            selectedOptions={}
            onChange={}
            isClearable={true}
            />

            <EuiCard
            textAlign="left"
            title={this.state.weather.municipio}
            description={`Temperatura actual ${this.state.weather.tempActual}\u00b0 - Probabilidad Lluvia ${this.state.weather.probLluvia}%`}
            />
        
      </div>
    );
  }
}

export default App;

