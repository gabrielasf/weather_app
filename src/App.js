import React from 'react'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      location: "",
      municipios: [],
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
        
      </div>
    );
  }
}

export default App;

