import PokemonPage from './components/PokemonPage';
import {Routes, Route} from 'react-router-dom';
import ArticlesPage from './components/ArticlePage';
import Profile from './components/Profile/Profile';
import Recommendation from './components/RecommendationPage';
import Login from './components/Login/loginPage';
import Register from  './components/Register/registerForm';
function App() {
  return (
    <Routes>
      <Route path='/' element ={<ArticlesPage/>}/>
      <Route path='/articles' element ={<ArticlesPage/>}/>
      <Route path='/profile' element ={<Profile/>}/>
      <Route path='/recommendation' element ={<Recommendation/>}/>
      
      <Route path='/login' element ={<Login/>}/>
      <Route path='/register' element ={<Register/>}/>
    </Routes>
  );
}

export default App;
