import React from 'react';
import ReactDOM from 'react-dom';
import Login from '../src/Pages/Login/Login';
import Menu from '../src/Pages/Menu/Menu';
import Patio_8_9 from '../src/Pages/Quadro_8_9/Quadro_8_9';
import Patio_7_10 from '../src/Pages/Quadro_7_10/Quadro_7_10';
import Patio_11_12 from '../src/Pages/Quadro_11_12/Quadro_11_12';
import PainelAdm from '../src/Pages/Admin/Admin';
import Visualizar89 from '../src/Pages/View/Visualizar89'
import Visualizar1112 from './Pages/View/Visualizar1112';
import Visualizar710 from './Pages/View/Visualizar710';
import MenuView from './Pages/View/MenuView'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom';





const routing = (
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={Patio_8_9} />
        <Route path="/Menu" component={Menu} />
        <Route path="/Patio_7_10" component={Patio_7_10} />
        <Route path="/Patio_8_9" component={Patio_8_9} />
        <Route path="/Patio_11_12" component={Patio_11_12} />
        <Route path="/PainelAdm" component={PainelAdm} />
        <Route path="/Visualizar89" component={Visualizar89}/>
        <Route path="/Visualizar710" component={Visualizar710}/>
        <Route path="/Visualizar1112" component={Visualizar1112}/>
        <Route path="/MenuView" component={MenuView}/>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>
)


ReactDOM.render(routing, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
