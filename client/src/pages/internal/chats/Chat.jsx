import { useCallback } from 'react';
import Talk from 'talkjs';
import { Session, Chatbox } from '@talkjs/react';

function Chat() {


  const id = localStorage.getItem("id")
  const name = localStorage.getItem("firstname") + ' ' + localStorage.getItem("lastname")
  const email = localStorage.getItem("email")

  const syncUser = useCallback(
    () =>
      new Talk.User({
        id: id,
        name: name,
        email: email,
        photoUrl: 'https://cdn-icons-png.flaticon.com/128/15991/15991767.png',
  
      }),
    []
  );

  const syncConversation = useCallback((session) => {
    // JavaScript SDK code here
    const conversation = session.getOrCreateConversation('welcome');
    return conversation;
  }, []);

  return (
    <Session appId="taOm7Ghv" syncUser={syncUser}>
      <Chatbox
        syncConversation={syncConversation}
        style={{ width: '100%', height: '500px' }}
        asGuest={true}
      ></Chatbox>
    </Session>
  );
}

export default Chat;