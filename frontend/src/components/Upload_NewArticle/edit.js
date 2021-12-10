import React, { useState, useEffect } from 'react';
import './App.css';
import ArticleList from './articleList';
import Editor from './Input/Input_article_v1';

function Edit() {
  const [loadedArticle, setLoadedArticle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true);
      const response = await fetch('http://localhost:3001/api');

      const responseData = await response.json();

      setLoadedArticle(responseData.Article);
      setIsLoading(false);
    };

    fetchArticle();
  }, []);

  const addArticleHandler = async (title) => {
    try {
      const newArticle = {
        title: title
     //   price: +productPrice // "+" to convert string to number
      };
      let hasError = false;
      const response = await fetch('http://localhost:3001/api', {
        method: 'POST',
        body: JSON.stringify(newArticle),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        hasError = true;
      }

      const responseData = await response.json();

      if (hasError) {
        throw new Error(responseData.message);
      }

      setLoadedArticle(prevArticle => {
        return prevArticle.concat({
          ...newArticle,
          id: responseData.Article.id
        });
      });
    } catch (error) {
      alert(error.message || 'Something went wrong!');
    }
  };
  return (
    <React.Fragment>
      <Header />
      <main>
        <Editor onAddArticle={addArticleHandler} />
        {isLoading && <p className="loader">Loading...</p>}
        {!isLoading && < ArticleList items={loadedArticle} />}
      </main>
    </React.Fragment>
  );
}

export default Edit;
