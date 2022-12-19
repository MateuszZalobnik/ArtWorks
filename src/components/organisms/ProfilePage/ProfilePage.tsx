import React, { useEffect, useState } from 'react';
import { DocumentReference } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { UserState } from 'store/user/user';
import { useSelector } from 'react-redux';
import MyAccount from './MyAccount';
import OtherUserAccount from './OtherUserAccount';

const ProfilePage: React.FC<{
  uid: string|null;
  userDocRef: DocumentReference|null;
  setIsOpenEditWindow: any|null;
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

  return (myAccount && uid && userDocRef && setIsOpenEditWindow) ? (
    <MyAccount
      uid={uid}
      setIsOpenEditWindow={setIsOpenEditWindow}
      userDocRef={userDocRef}
    />
  ) : (
    <OtherUserAccount />
  );
};

export default ProfilePage;
