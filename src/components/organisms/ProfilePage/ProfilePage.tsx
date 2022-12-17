import React, { useEffect, useState } from 'react';
import { DocumentReference } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { UserState } from 'features/user/user';
import { useSelector } from 'react-redux';
import MyAccount from './MyAccount';
import OtherUserAccount from './OtherUserAccount';

const ProfilePage: React.FC<{
  uid: string;
  userDocRef: DocumentReference;
  setIsOpenEditWindow: any;
}> = ({ userDocRef, setIsOpenEditWindow, uid }) => {
  const [myAccount, setMyAccount] = useState(false);
  const currentUser = useSelector(
    (state: { user: UserState }) => state.user.user
  );

  const { username } = useParams();

  useEffect(() => {
    if (username && username == currentUser?.username) {
      setMyAccount(true);
    } else {
      setMyAccount(false);
    }
  }, [username, currentUser]);

  return myAccount ? (
    <MyAccount
      uid={uid}
      setIsOpenEditWindow={setIsOpenEditWindow}
      userDocRef={userDocRef}
    />
  ) : (
    <OtherUserAccount uid={uid} />
  );
};

export default ProfilePage;
