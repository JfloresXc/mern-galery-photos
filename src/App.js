import { Route } from 'wouter'

import Images from './pages/Images'
import ImageAdd from './pages/ImageAdd'
import PublicationView from './pages/PublicationView'

import Nav from './components/Nav'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import '.'

function App() {
  return (
    <div className="App">
      <Nav />

      <Route path="/" component={Images} exact/>
      <Route path="/load" component={ImageAdd} exact/>
      <Route path="/publication/:id" component={PublicationView} />
    </div>
  );
}

export default App;
