import {Routes, Route} from 'react-router-dom';
import ArticlesPage from './components/ArticlePage';
import Profile from './components/Profile/Profile';
import Recommendation from './components/Article/RecommendationPage';
import Login from './components/Login/loginPage';
import Register from  './components/Register/registerPage';
import Article_list from './components/CreateNewArticle/ArticleDisplay';
import Editor from './components/CreateNewArticle/NewArticle';
import EditArticle from './components/CreateNewArticle/EditArticle';
import axios from 'axios';

//axios.defaults.withCredentials = true;

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
     <Route path='/ArticleDisplay' element ={<Article_list/>}/> 
     <Route path='/ArticleDisplay/:id' element ={<EditArticle/>}/> 
     <Route
      path="*"
      element={
        <main style={{ padding: "1rem" }}>
          <p>There's nothing here!</p>
        </main>
      }
    />
    </Routes>
  );
}
