import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../config/firebaseConfig';
// need some functions from firestore

// this component will show the 5 most recent articles

function Banner() {
  // create state
  const [mainArticle, setMainArticle] = useState('');
  const [otherArticles, setOtherArticles] = useState([]);

  // get data when the page loads
  useEffect(() => {
    // make a reference to the articles collection
    const articleRef = collection(db, 'articles');

    // set up query to filter the data
    const q = query(articleRef, orderBy('createdAt', 'desc'), limit(5));

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
        setMainArticle(articles[0]);
        console.log(setMainArticle);
        // put the rest in the otherArticles
        setOtherArticles(articles.splice(1));
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="my-5 mx-auto grid h-[50vh] w-11/12 grid-cols-5">
      <div
        className="col-span-3 flex flex-col justify-end bg-cover bg-center bg-no-repeat pl-5 pb-5 text-white "
        style={{ backgroundImage: `url(${mainArticle.imageUrl})` }}
      >
        <div className="bg-gray-500 px-2 pb-1.5">
          <h2>{mainArticle?.title}</h2>
          <p>{mainArticle?.createdAt?.toDate().toDateString()}</p>
        </div>
      </div>
      <div className="col-span-2 grid grid-cols-2 gap-2.5 px-2.5">
        {otherArticles.map((item) => (
          <div
            className="flex flex-col justify-end bg-center bg-no-repeat pl-2.5 pb-2.5 text-white"
            style={{ backgroundImage: `url(${item.imageUrl})` }}
            key={item.id}
          >
            <div className="bg-gray-500 px-2 pb-1.5">
              <h3>{item.title}</h3>
              <small>{item.createdAt?.toDate().toDateString()}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Banner;
