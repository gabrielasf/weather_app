import React, { Component } from 'react';
import { EuiComboBox, EuiCard } from '@elastic/eui';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      municipios: [],
      chosenMunicipios: [],
      weather: null,
      error: false
    };
    this.municipioFromList = this.municipioFromList.bind(this);
  
  }

    componentDidMount() {
    fetch("https://www.el-tiempo.net/api/json/v2/provincias/08/municipios")
    .then((response) => response.json())
    .then((data) => {
      const collectionMunicipios = data.municipios.map((municipio) => {
        return {
          id_rel: municipio.ID_REL,
          codigoine: municipio.CODIGOINE.substring(0,5),
          label: municipio.NOMBRE,
          codgeo: municipio.COD_GEO
        };
      });
      this.setState({
        municipios: collectionMunicipios
      })
    });  
  }

  municipioFromList(item){
    fetch(`https://www.el-tiempo.net/api/json/v2/provincias/08/municipios/${item[0].codigoine}`)
      .then((response) => response.json())
      .then((data) => {
        
        this.setState({
          loading: false,
          weather: {
            municipio: data.municipio.NOMBRE,
            tempActual: data.temperatura_actual,
            probLluvia: data.lluvia,
          },
        })
        
      });
    };

  render() {
    return (
      <div>
           <EuiComboBox
            placeholder="Seleccione un municipio de la provincia de Barcelona"
            singleSelection={{ asPlainText: true }}
            options={this.state.municipios}
            selectedOptions={this.state.chosenMunicipios}
            onChange={this.municipioFromList}
            isClearable={true}
            />
           
           <div className="result">
          {this.state.loading && <div>Loading...</div>}
          {this.state.weather && (
            <EuiCard
              textAlign="left"
              title={this.state.weather.municipio}
              description={`Temperatura actual ${this.state.weather.tempActual}\u00b0 - Probabilidad Lluvia ${this.state.weather.probLluvia}%`}
            />
          )}
        </div>
        
      </div>
    );
  }
}

export default App;

