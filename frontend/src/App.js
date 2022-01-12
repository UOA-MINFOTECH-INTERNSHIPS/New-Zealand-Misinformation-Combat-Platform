import {Routes, Route, useSearchParams} from 'react-router-dom';
import ArticlesPage from './components/ArticlePage';
import Profile from './components/Profile/Profile';
import Recommendation from './components/Article/RecommendationPage';
import Login from './components/Login/loginPage';
import Register from  './components/Register/registerPage';
import Mission_list from './components/CreateNewArticle/ArticleDisplay';
import Editor from './components/CreateNewArticle/NewMission';
import AppContext from './AppContextProvider';
import { useState } from 'react';
import PageNotFound from './components/pageNotFound';
import Article from './components/Article/article';
import FactChecked from './components/factCheckedArticles/factCheckedContainer';
import FactCheckedArticle from './components/factCheckedArticles/verifiedArticle';
import EditArticle from './components/CreateNewArticle/MissionVerify';


//axios.defaults.withCredentials = true;

export default function App() {
  const {loggedIn} = useState(AppContext);

  return (
    <Routes>
      <Route path='/' element ={<ArticlesPage/>}/>
      <Route path='/articles' element ={<ArticlesPage/>}/>

      <Route path='/articles/:id' element ={<Article/>}/>
      <Route path ='/verified' element = {<FactChecked/>} />

      <Route path ='/verified:id' element = {<FactCheckedArticle/>} />

      <Route path='/recommendation' element ={<Recommendation/>}/>
      <Route path='/profile' element ={<Profile/>}/>
          <Route path='/editor' element ={<Editor/>}/>
          <Route path='/ArticleDisplay' element ={<Mission_list/>}/> 
          <Route path='/ArticleDisplay/:id' element ={<EditArticle/>}/> 

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
          <Route path='/editor' element ={<Editor/>}/>
          <Route path='/ArticleDisplay/:id' element ={<EditArticle/>}/> 
        </>
      ) }


      <Route path= "/*" element={<PageNotFound/> } />
    </Routes>
  );
}
