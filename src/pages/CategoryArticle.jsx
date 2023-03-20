import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  where,
} from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

function CategoryArticle() {
  // grab the parameter in the url
  const { categoryName } = useParams();
  // when page loads only show articles of this category

  // create state to hold articles
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    // make a reference to the articles collection
    const articleRef = collection(db, 'articles');

    // set up query to filter the data
    // need to match this category using where fucntion
    const q = query(articleRef, where('category', '==', categoryName));

    // retrieve documents from this collection
    // getDocs(articleRef)
    getDocs(q, articleRef)
      .then((res) => {
        console.log(res.docs[0].data());
        // this is needed to add the id
        // and create an array that you can use for state
        const articles = res.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));
        console.log(articles);
        // store in state
        setArticles(articles);
      })
      .catch((err) => console.log(err));
    // need category name as a dependency to reload useEffect when url parameter changes
  }, [categoryName]);

  return (
    <div>
      {articles.length === 0 ? (
        <p>no {categoryName} articles</p>
      ) : (
        articles?.map((item) => <p key={item.id}>{item?.title}</p>)
      )}
    </div>
  );
}

export default CategoryArticle;
