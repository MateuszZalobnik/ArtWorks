import { setAllPosts, setPosts, setSpinner } from 'store/actions/actions';
import { db } from 'firabase-config';
import {
  Timestamp,
  collection,
  addDoc,
  updateDoc,
  DocumentData,
} from 'firebase/firestore';
import useFirestore from 'hooks/useFirestore/useFirestore';
import useStorage from 'hooks/useStorage/useStorage';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  Button,
  ErrorMessage,
  Textarea,
  UploadStyled,
  Wrapper,
} from './AddNewPost.style';

const AddNewPost: React.FC<{ uid: string }> = ({ uid }) => {
  const [newPost, setNewPost] = useState<{
    description: string;
    tags: string[];
  }>({
    description: '',
    tags: [],
  });
  const [btn, setBtn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileUploaded, setFileUploaded] = useState<HTMLInputElement | null>(
    null
  );
  const hiddenFileInput = useRef<any>(null);
  const { uploadFile, storageLoading } = useStorage();
  const navigate = useNavigate();
  const { getQueryCollection, getAllCollection } = useFirestore();
  const dispatch = useDispatch();

  const handleChange = (event: any) => {
    const file = event.target.files[0];
    if (file == null) return;
    if (file.size < 200000) {
      setFileUploaded(file);
      setError('');
    } else {
      setError('maksymalny rozmiar pliku to 200kB');
      return;
    }
  };

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    let addPost = true;

    const addNewPost = async () => {
      const timeStamp = Timestamp.now();

      const docRef = await addDoc(collection(db, 'posts'), {
        ...newPost,
        userId: uid,
        timeStamp: timeStamp,
      });

      await updateDoc(docRef, {
        id: docRef.id,
      });

      if (fileUploaded) {
        const filePath = `artworks/posts/${docRef.id}/${fileUploaded.name}`;
        uploadFile(filePath, fileUploaded, docRef, 'mediaUrl');
      }
    };

    if (newPost.description == '') {
      addPost = false;
    }
    if (addPost) {
      setBtn(true);
      setError(null);
      addNewPost().then(() => {
        const posts: DocumentData[] = [];
        const allPosts: DocumentData[] = [];
        getQueryCollection('posts', 'userId', '==', uid)
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              posts.push(doc.data());
            });
          })
          .then(() => {
            dispatch(setPosts(posts));
          })
          .then(() => {
            getAllCollection('posts')
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  allPosts.push(doc.data());
                });
              })
              .then(() => {
                dispatch(setAllPosts(allPosts));
              })
              .then(() => navigate('/auth'));
          });
      });
    } else {
      setError('Dodaj opis');
    }
  };

  const handleInput = (e: React.FormEvent) => {
    const id = (e.target as HTMLInputElement).id;
    if (id == 'tags') {
      const value = (e.target as HTMLInputElement).value;
      const tags = value.split(',');
      setNewPost({ ...newPost, [id]: tags });
    } else {
      const value = (e.target as HTMLInputElement).value;
      setNewPost({ ...newPost, [id]: value });
    }
  };

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  return (
    <Wrapper>
      <Form onSubmit={handlePost}>
        <label>
          Opis:
          <Textarea
            style={{ height: '100px' }}
            id="description"
            onChange={handleInput}
          />
        </label>
        <label>
          Tagi:
          <Textarea
            placeholder='oddziel tagi używając ","'
            id="tags"
            onChange={handleInput}
          />
        </label>
        <UploadStyled onClick={handleClick} />
        <input
          type="file"
          accept="image/*"
          ref={hiddenFileInput}
          onChange={handleChange}
          style={{ display: 'none' }}
        />
        {fileUploaded ? fileUploaded.name : null}
        {error ? <ErrorMessage>{error}</ErrorMessage> : null}

        <Button type="submit" disabled={btn}>
          dodaj
        </Button>
      </Form>
    </Wrapper>
  );
};

export default AddNewPost;
