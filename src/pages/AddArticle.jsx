import { useState } from 'react';
import './AddArticle.css';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { db, storage, auth } from '../config/firebaseConfig';

function AddArticle() {
  // activate navigate
  const navigate = useNavigate();
  // get user data
  const [user] = useAuthState(auth);

  // get blog categories
  const categories = ['Health', 'Food', 'Travel', 'Technology'];

  // create state to hold all the user form data
  // make a object for all the data
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    paragraphOne: '',
    paragraphTwo: '',
    paragraphThree: '',
    category: '',
    image: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit');
    // create a reference for the image
    const imageRef = ref(storage, `images/${formData.image.name + v4()}`);
    // now upload the image to storage bucket
    uploadBytes(imageRef, formData.image)
      .then((res) => {
        // uploading the image
        console.log(res.ref);
        // now get url from this reference
        getDownloadURL(res.ref).then((url) => {
          console.log(url);
          // now I have all data and image url
          // create article reference
          const articleRef = collection(db, 'articles');
          // use addDoc to add a document
          addDoc(articleRef, {
            title: formData.title,
            summary: formData.summary,
            paragraphOne: formData.paragraphOne,
            paragraphTwo: formData.paragraphTwo,
            paragraphThree: formData.paragraphThree,
            category: formData.category,
            imageUrl: url,
            createdBy: user.displayName,
            userId: user.uid,
            createdAt: Timestamp.now().toDate(),
          });
        });
      })
      .then((res) => {
        alert('article saved');
        toast('Article saved successfully!', {
          type: 'success',
          autoClose: 1500,
        });
        // pause before
        setTimeout(() => {
          // navigate to home after save
          navigate('/');
        }, 3000);
      })
      .catch((err) => {
        alert('error');
      });
  };

  return (
    <div className="add-article-container">
      <form className="add-article-form">
        <h2>Create Article</h2>
        <div className="input-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Maximum 100 characters"
            maxLength="100"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>
        <div className="input-group">
          <label htmlFor="summary">Summary</label>
          <textarea
            id="summary"
            placeholder="Maximum 120 characters"
            maxLength="120"
            onChange={(e) =>
              setFormData({ ...formData, summary: e.target.value })
            }
          />
        </div>
        <div className="input-group">
          <label htmlFor="paragraphOne">Paragraph One</label>
          <textarea
            name="paragraphOne"
            placeholder="Maximum 650 characters"
            maxLength="650"
            onChange={(e) =>
              setFormData({ ...formData, paragraphOne: e.target.value })
            }
          />
        </div>
        <div className="input-group">
          <label htmlFor="paragraphTwo">Paragraph Two</label>
          <textarea
            id="paragraphTwo"
            placeholder="Maximum 650 characters"
            maxLength="650"
            onChange={(e) =>
              setFormData({ ...formData, paragraphTwo: e.target.value })
            }
          />
        </div>
        <div className="input-group">
          <label htmlFor="paragraphThree">Paragraph Three</label>
          <textarea
            id="paragraphThree"
            placeholder="Maximum 650 characters"
            maxLength="650"
            onChange={(e) =>
              setFormData({ ...formData, paragraphThree: e.target.value })
            }
          />
        </div>
        <div className="input-group">
          <label htmlFor="category">Category</label>
          <select
            name="category"
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="">Select category</option>
            {categories.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.files[0] })
            }
          />
        </div>
        <button type="submit" onSubmit={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddArticle;
