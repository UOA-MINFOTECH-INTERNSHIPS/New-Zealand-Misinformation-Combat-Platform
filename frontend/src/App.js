import {Routes, Route, useSearchParams} from 'react-router-dom';
import ArticlesPage from './components/ArticlePage';
import Profile from './components/Profile/Profile';
import Recommendation from './components/Article/RecommendationPage';
import Login from './components/Auth/signin';
import Register from  './components/Auth/signup';
import Mission_list from './components/CreateNewArticle/ArticleDisplay';
import Editor from './components/CreateNewArticle/NewMission';
import AppContext from './AppContextProvider';
import { useState } from 'react';
import PageNotFound from './components/pageNotFound';
import Article from './components/Article/article';
import Results from './components/Results/resultsContainer';
import Mission from './components/Mission/missionsContainer'
import EditArticle from './components/CreateNewArticle/MissionVerify';
import Home from './components/Home/home'
import UserContext, { UserContextProvider } from './UserContextProvider';




export default function App() {
  const {loggedIn} = useState(AppContext);
  const {user, setUser} = useState(UserContext);

  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element ={<Home/>}/>
        <Route path='/articles' element ={<ArticlesPage/>}/>
        <Route path='/articles/:id' element ={<Article/>}/>
        <Route path ='/result' element = {<Results/>} />
        <Route path='/mission' element ={<Mission/>}/>

        <Route path='/recommendation' element ={<Recommendation/>}/>

        <Route path='/profile' element ={<Profile/>}/>
        <Route path='/editor' element ={<Editor/>}/>
        <Route path='/ArticleDisplay' element ={<Mission_list/>}/> 
        <Route path='/ArticleDisplay/:id' element ={<EditArticle/>}/> 
    


        <Route path="/signin" element={<Login />} /> 


        <Route path="/signup" element ={<Register />} />

        <Route path='/profile' element ={<Profile/>}/>
        <Route path='/editor' element ={<Editor/>}/>
        <Route path='/ArticleDisplay/:id' element ={<EditArticle/>}/> 


        <Route path= "/*" element={<PageNotFound/> } />
      </Routes>
      </UserContextProvider>

  );

}
