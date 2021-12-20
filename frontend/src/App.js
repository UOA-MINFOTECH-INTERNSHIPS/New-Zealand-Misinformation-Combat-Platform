import {Routes, Route, useSearchParams} from 'react-router-dom';
import ArticlesPage from './components/ArticlePage';
import Profile from './components/Profile/Profile';
import Recommendation from './components/Article/RecommendationPage';
import Login from './components/Login/loginPage';
import Register from  './components/Register/registerPage';
import Article_list from './components/CreateNewArticle/ArticleDisplay';
import Editor from './components/CreateNewArticle/NewArticle';
import AppContext from './AppContextProvider';
import { useState } from 'react';
import PageNotFound from './components/pageNotFound';

//axios.defaults.withCredentials = true;

export default function App() {
  const {loggedIn} = useState(AppContext);

  return (
    <Routes>
      <Route path='/' element ={<ArticlesPage/>}/>
      <Route path='/articles' element ={<ArticlesPage/>}/>
      <Route path='/recommendation' element ={<Recommendation/>}/>
      {!loggedIn ?
      (
        <>
          <Route path="/login" element={<Login />} /> 
          <Route path="/register" element ={<Register />} />
        </>
      ) :
      (
        <>
          <Route path='/profile' element ={<Profile/>}/>
          <Route path='/ArticleDisplay' element ={<Article_list/>}/> 
        </>
      ) }



      <Route path= "/*" element={<PageNotFound/> } />

    </Routes>
  );
}
