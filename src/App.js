import React from 'react'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      municipios: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    fetch('https://www.el-tiempo.net/api/json/v2/provincias/08/municipios')
      .then(res => res.json())
      .then(result => {
        this.setState({
          isLoaded: true,
          municipios: result.municipios
        });
        console.log(result);
      });
  }

  render() {
    const { municipios, isLoaded } = this.state;
    if (!isLoaded) {
      return <div>Loading ... </div>;
    } else {
      return (
        <ul>
          {municipios.map(municipio => (
            <li key={municipio.id_rel}>  
              <h3>{municipio.NOMBRE} </h3>
              
            </li>
          ))}
        </ul>
      );
    }
  }
}

export default App;




