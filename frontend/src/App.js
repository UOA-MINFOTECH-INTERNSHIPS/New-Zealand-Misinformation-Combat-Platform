import {Routes, Route} from 'react-router-dom';
import ArticlesPage from './components/ArticlePage';
import Profile from './components/Profile/Profile';
import Recommendation from './components/Article/RecommendationPage';
import Login from './components/Login/loginPage';
import Register from  './components/Register/registerForm';
import Editor from './components/Upload_NewArticle/editor';

export default function App() {
  return (
    <Routes>
      <Route path='/' element ={<ArticlesPage/>}/>
      <Route path='/articles' element ={<ArticlesPage/>}/>
      <Route path='/profile' element ={<Profile/>}/>
      <Route path='/recommendation' element ={<Recommendation/>}/>
      <Route path='/login' element ={<Login/>}/>
      <Route path='/register' element ={<Register/>}/>
      <Route path='/editor' element ={<Editor/>}/>
    </Routes>
  );
}
