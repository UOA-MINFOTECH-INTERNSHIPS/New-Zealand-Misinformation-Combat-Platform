import {Routes, Route} from 'react-router-dom';
import ArticlesPage from './components/ArticlePage';
import Profile from './components/Profile/Profile';
import Recommendation from './components/Article/RecommendationPage';
import Login from './components/Login/loginPage';
import Register from  './components/Register/registerForm';
import Editor from './components/CreateNewArticle/NewArticle';
 import Article_list from './components/CreateNewArticle/ArticleDisplay';
 




function App() {
  return (
    <Routes>
      <Route path='/' element ={<ArticlesPage/>}/>
      <Route path='/articles' element ={<ArticlesPage/>}/>
      <Route path='/profile' element ={<Profile/>}/>
      <Route path='/recommendation' element ={<Recommendation/>}/>
      <Route path='/login' element ={<Login/>}/>
      <Route path='/register' element ={<Register/>}/>
      <Route path='/editor' element ={<Editor/>}/>
     <Route path='/ArticleDisplay' element ={<Article_list/>}/> 
    </Routes>
  );
}

export default App;
