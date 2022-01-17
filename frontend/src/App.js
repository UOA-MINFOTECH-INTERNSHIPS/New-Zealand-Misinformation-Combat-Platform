import {Routes, Route, useSearchParams} from 'react-router-dom';
import ArticlesPage from './components/ArticlePage';
import Profile from './components/Profile/Profile';
import Recommendation from './components/Article/RecommendationPage';
import Login from './components/Login/loginPage';
import Register from  './components/Register/registerPage';
import Mission_list from './components/Create/Create/Edit/Delete/Delete/MissionDisplay';
import MissionCheck from './components/Create/Create/Edit/Delete/Delete/MissionCheck';
import FactCheckerVerify from './components/Create/Create/Edit/Delete/Delete/FactCheckerVerify';
import Editor from './components/Create/Create/Edit/Delete/Delete/NewMission';
import AppContext from './AppContextProvider';
import { useState } from 'react';
import PageNotFound from './components/pageNotFound';
import EditMission from './components/Create/Create/Edit/Delete/Delete/MissionModify';
import Article from './components/Article/article';
import FactChecked from './components/factCheckedArticles/factCheckedContainer';



//axios.defaults.withCredentials = true;

export default function App() {
  const {loggedIn} = useState(AppContext);

  return (
    <Routes>
      <Route path='/' element ={<ArticlesPage/>}/>
      <Route path='/articles' element ={<ArticlesPage/>}/>

      <Route path='/articles/:id' element ={<Article/>}/>
      <Route path ='/verified' element = {<FactChecked/>} />

      <Route path='/recommendation' element ={<Recommendation/>}/>
      <Route path='/profile' element ={<Profile/>}/>
          <Route path='/editor' element ={<Editor/>}/>
          <Route path='/MissionDisplay' element ={<Mission_list/>}/> 
          <Route path='/MissionDisplay/:_id' element ={<EditMission/>}/> 
          <Route path='/MissionCheck' element ={<MissionCheck/>}/> 
          <Route path='/MissionCheck/:_id' element ={<FactCheckerVerify />}/> 


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
          <Route path='/MissionDisplay/:_id' element ={<EditMission/>}/> 
        </>
      ) }


      <Route path= "/*" element={<PageNotFound/> } />
    </Routes>
  );
}
