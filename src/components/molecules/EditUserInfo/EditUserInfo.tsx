import { DocumentData, DocumentReference } from 'firebase/firestore';
import useFirestore from 'hooks/useFirestore/useFirestore';
import React, { useState } from 'react';
import { Button, ErrorMessage, Form, Wrapper } from './EditUserInfo.style';

interface EditUserInfoProps {
  userDocRef: DocumentReference;
  username: string;
  description: string;
  category: string;
}

const EditUserInfo: React.FC<EditUserInfoProps> = ({
  userDocRef,
  username,
  description,
  category,
}) => {
  const [currentUsername, setCurrentUsername] = useState(username);
  const [currentDescription, setCurrentDescription] = useState(description);
  const [currentCategory, setCurrentCategory] = useState(category);
  const [error, setError] = useState('');

  const { updateDocument, getQueryCollection } = useFirestore();

  const handleSubmit = async (e: React.FormEvent) => {
    setError('');
    let validate = true;

    if (currentUsername.length < 3 || currentUsername.length >= 20) {
      validate = false;
      setError('Nazwa użytkownika powinna mieć od 3 do 20 znaków');
    }
    if (currentDescription.length > 150) {
      validate = false;
      setError('Opis może mieć maksymalnie 150 znkaów');
    }

    if (validate) {
      try {
        const querySnapshotUsername = await getQueryCollection(
          'users',
          'username',
          '==',
          currentUsername
        );
        querySnapshotUsername.forEach((doc: DocumentData) => {
          if (doc.id) {
            e.preventDefault();
            validate = false;
            setError('Istnieje już konto z taką nazwą użytkownika');
          }
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      e.preventDefault();
    }

    if (validate) {
      updateDocument(userDocRef, {
        username: currentUsername,
        description: currentDescription,
        category: currentCategory,
      });
    } else {
      e.preventDefault();
    }
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            id="username"
            value={currentUsername}
            onChange={(e) => setCurrentUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            id="description"
            value={currentDescription}
            onChange={(e) => setCurrentDescription(e.target.value)}
          />
        </label>
        <label>
          Category:
          <select
            value={currentCategory}
            onChange={(e) => setCurrentCategory(e.target.value)}
          >
            <option value="music">Music</option>
            <option value="photo">Photo</option>
            <option value="movie">Movie</option>
            <option value="painting">Painting</option>
            <option value="other">Other</option>
            <option value="">None</option>
          </select>
        </label>
        {error != '' ? <ErrorMessage>{error}</ErrorMessage> : null}
        <Button
          type="submit"
          disabled={
            username == currentUsername &&
            description == currentDescription &&
            category == currentCategory
          }
        >
          Zmień
        </Button>
      </Form>
    </Wrapper>
  );
};

export default EditUserInfo;
