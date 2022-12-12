import { AuthContext } from 'context/AuthContext/AuthContext';
import { db } from 'firabase-config';
import { Timestamp, collection, addDoc, updateDoc } from 'firebase/firestore';
import useStorage from 'hooks/useStorage/useStorage';
import React, { useEffect, useState, useRef, useContext } from 'react';
import { BsUpload } from 'react-icons/bs';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  margin-top: 100px;
  width: 80%;
  position: relative;
  padding: 40px 10px;
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.darkBlue};
  font-size: ${({ theme }) => theme.fontSize.l};
  border-radius: ${({ theme }) => theme.borderRadius.s};

  label {
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSize.l};
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const Button = styled.button`
  margin-top: 40px;
  font-size: ${({ theme }) => theme.fontSize.l};
  color: ${({ theme }) => theme.colors.grey};
  background-color: ${({ theme }) => theme.colors.darkBlue};
  border-radius: ${({ theme }) => theme.borderRadius.s};
  font-weight: bold;
  border: none;
  padding: 10px;
  cursor: pointer;
`;

const Textarea = styled.textarea`
  resize: none;
  margin: 10px 0px;
  height: 50px;
  color: ${({ theme }) => theme.colors.darkBlue};
  font-size: ${({ theme }) => theme.fontSize.s};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.s};
  border: none;
  :focus {
    outline: ${({ theme }) => theme.colors.darkBlue} solid 2px;
  }
`;

const UploadStyled = styled(BsUpload)`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  width: 100%;
  margin-top: 20px;
  text-align: center;
`;

const ErrorMessage = styled.div`
  margin-top: 20px;
  text-align: center;
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSize.m};
  color: ${({ theme }) => theme.colors.red};
`;

const AddNewPost: React.FC = () => {
  const [newPost, setNewPost] = useState<{
    description: string;
    tags: string[];
  }>({
    description: '',
    tags: [],
  });
  const [error, setError] = useState<string | null>(null);
  const [fileUploaded, setFileUploaded] = useState<any>(null);
  const hiddenFileInput = useRef<any>(null);
  const {
    state: { uid },
  } = useContext(AuthContext);
  const { uploadFile } = useStorage();
  const navigate = useNavigate();

  const handleChange = (event: any) => {
    const file = event.target.files[0];
    if (file == null) return;
    setFileUploaded(file);
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
      console.log('Document written with ID: ', docRef.id);

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
      setError(null);
      addNewPost();
      navigate('/auth');
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
          ref={hiddenFileInput}
          onChange={handleChange}
          style={{ display: 'none' }}
        />
        {fileUploaded ? fileUploaded.name : null}
        {error ? <ErrorMessage>{error}</ErrorMessage> : null}

        <Button type="submit">dodaj</Button>
      </Form>
    </Wrapper>
  );
};

export default AddNewPost;
