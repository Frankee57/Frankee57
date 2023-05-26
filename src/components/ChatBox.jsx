import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  Page,
  Navbar,
  Messagebar,
  Link,
  MessagebarAttachments,
  MessagebarAttachment,
  MessagebarSheet,
  MessagebarSheetImage,
  Messages,
  MessagesTitle,
  Message,
  f7,
  f7ready,
  Icon,
} from 'framework7-react';
import MyContext from '../../contextes/appContext';
import { push, ref , onValue, set, get } from 'firebase/database';
import { db } from './backend';
let userId ;

if (localStorage.getItem('user')!=null) {
  const user = JSON.parse(localStorage.getItem('user')).email
 userId = user.replace(/[^\w\s]/gi, "");
}
const ChatBox= ({onCloseChat}) => {
  const [messages, setMessages] = useState([]);
  const [type, setType]= useState('')
  const [writting , setWritting] = useState(false)
  let displayTime;
   let time;
   let date;

  const images = [
    'https://cdn.framework7.io/placeholder/cats-300x300-1.jpg',
    'https://cdn.framework7.io/placeholder/cats-200x300-2.jpg',
    'https://cdn.framework7.io/placeholder/cats-400x300-3.jpg',
    'https://cdn.framework7.io/placeholder/cats-300x150-4.jpg',
    'https://cdn.framework7.io/placeholder/cats-150x300-5.jpg',
    'https://cdn.framework7.io/placeholder/cats-300x300-6.jpg',
    'https://cdn.framework7.io/placeholder/cats-300x300-7.jpg',
    'https://cdn.framework7.io/placeholder/cats-200x300-8.jpg',
    'https://cdn.framework7.io/placeholder/cats-400x300-9.jpg',
    'https://cdn.framework7.io/placeholder/cats-300x150-10.jpg',
  ];
  const people = [
    {
      name: 'Kate Johnson',
      avatar: 'https://cdn.framework7.io/placeholder/people-100x100-9.jpg',
    },
    {
      name: 'Blue Ninja',
      avatar: 'https://cdn.framework7.io/placeholder/people-100x100-7.jpg',
    },
  ];
  
  const [attachments, setAttachments] = useState([]);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [typingMessage, setTypingMessage] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [messagesData, setMessagesData] = useState([
   
  ]);
  useEffect(() => {
   

    const messagesRef = ref(db, 'messages/'+userId+'/list');
   
    // Abonnez-vous aux modifications de la base de données Firebase Realtime
    onValue(messagesRef, (snapshot) => {
      const messsagesData = snapshot.val();
      
      if (messsagesData) {
        // Convertir les données de la base de données en tableau
        const messagesArray = Object.entries(messsagesData).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setMessages(messagesArray);
         
          setMessagesData(messagesData.concat(messagesArray)
          )
      }
    });

    // Désabonnez-vous de la base de données Firebase Realtime lorsque le composant est démonté
    return () => {
      onValue(messagesRef, null);
    };
  }, []);
  const responseInProgress = useRef(false);
  const messagebar = useRef(null);

  const attachmentsVisible = () => {
    return attachments.length > 0;
  };
  const placeholder = () => {
    return attachments.length > 0 ? 'Add comment or Send' : 'Envoyer un message à Oxygène';
  };
  useEffect(() => {
    f7ready(() => {
      messagebar.current = f7.messagebar.get('.messagebar');
    });
  });
  const isFirstMessage = (message, index) => {
    const previousMessage = messagesData[index - 1];
    if (message.isTitle) return false;
    if (
      !previousMessage ||
      previousMessage.type !== message.type ||
      previousMessage.name !== message.name
    )
      return true;
    return false;
  };
  const isLastMessage = (message, index) => {
    const nextMessage = messagesData[index + 1];
    if (message.isTitle) return false;
    if (!nextMessage || nextMessage.type !== message.type || nextMessage.name !== message.name)
    return true;
    return false;
  };
  const isTailMessage = (message, index) => {
    const nextMessage = messagesData[index + 1];
    if (message.isTitle) return false;
    if (!nextMessage || nextMessage.type !== message.type || nextMessage.name !== message.name)
      return true;
    return false;
  };
  const deleteAttachment = (image) => {
    const index = attachments.indexOf(image);
    attachments.splice(index, 1);
    setAttachments([...attachments]);
  };
  const handleAttachment = (e) => {
    const index = f7.$(e.target).parents('label.checkbox').index();
    const image = images[index];
    if (e.target.checked) {
      // Add to attachments
      attachments.unshift(image);
    } else {
      // Remove from attachments
      attachments.splice(attachments.indexOf(image), 1);
    }
    setAttachments([...attachments]);
  };
  const sendMessage = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const text = messageText.replace(/\n/g, '<br>').trim();
    const messagesToSend = [];
    attachments.forEach((attachment) => {
      messagesToSend.push({
        image: attachment,
      });
    });

    if (text.length) {
      messagesToSend.push({
        text,
         sender:{
          email: user.email
         },
      });
      const sender = JSON.parse(localStorage.getItem('user'))
      sender.pic = localStorage.getItem('userProfile')
      const userId = sender.email.replace(/[^\w\s]/gi, "");
        const dataToSend= {
          sender:sender,
          type:'sent',
          IamWorker: false,

          text: text,
          date: (new Date()).toISOString(),
          receiver: {
            firsName: 'Oxygene',
        lastName: 'Darsaf',
        email:'oxygene@gmail.com',
          }

        }
      set(ref(db, 'chat/'+userId),dataToSend)
      push(ref(db, 'messages/'+userId+'/list'),dataToSend).then(
        
      ).catch(
    ()=>{
          f7.dialog.alert("L'envoie du message échoué")
        }
      )
    }
    if (messagesToSend.length === 0) {
      return;
    }
    setAttachments([]);
    setSheetVisible(false);
    setMessagesData([...messagesData, ...messagesToSend]);
    setMessageText('');

    // Focus area
    if (text.length) messagebar.current.focus();

    // Mock response
    if (responseInProgress.current) return;

    responseInProgress.current = true;

   
  };

  return (
    
      
    <Page>
      <Navbar color='blue' bgColor='blue'>
        <Link onClick={onCloseChat}>
        <Icon material="arrow_back" slot="media"/>
        </Link>
        <h4 style={{textAlign: 'center'}}>Message</h4>
      </Navbar>

    <Messagebar
        placeholder={placeholder()}
        attachmentsVisible={attachmentsVisible()}
        sheetVisible={sheetVisible}
        value={messageText}
        onInput={(e) => {

          setMessageText(e.target.value)
        }}
      >
        <Link
          iconIos="f7:camera_fill"
          iconAurora="f7:camera_fill"
          iconMd="material:camera_alt"
          slot="inner-start"
          onClick={() => {
            setSheetVisible(!sheetVisible);
          }}
        />
        <Link
          iconIos="f7:arrow_up_circle_fill"
          iconAurora="f7:arrow_up_circle_fill"
          iconMd="material:send"
          slot="inner-end"
          onClick={sendMessage}
        />
        <MessagebarAttachments>
          {attachments.map((image, index) => (
            <MessagebarAttachment
              key={index}
              image={image}
              onAttachmentDelete={() => deleteAttachment(image)}
            />
          ))}
        </MessagebarAttachments>
        <MessagebarSheet>
          {images.map((image, index) => (
            <MessagebarSheetImage
              key={index}
              image={image}
              checked={attachments.indexOf(image) >= 0}
              onChange={handleAttachment}
            />
          ))}
        </MessagebarSheet>
      </Messagebar>

      <Messages>
        <MessagesTitle>
          <b>Sunday, Feb 9,</b> 12:58
        </MessagesTitle>

        {messagesData.map((message, index) =>
        {
            const messageTime = new Date(message.date);
            const now = new Date();
            const isSameDay = messageTime.getDate() === now.getDate() && messageTime.getMonth() === now.getMonth() && messageTime.getFullYear() === now.getFullYear();
             time = messageTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
             date = messageTime.toLocaleDateString();
            if (now - messageTime < 24 * 60 * 60 * 1000) {
              if (isSameDay) {
                const timeString = messageTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                displayTime = timeString
              } else {
                displayTime= 'Hier'
                            }
            } else {
              const dateString = messageTime.toLocaleDateString();
              displayTime= dateString
              if (messageTime=='Invalid Date') {
                displayTime= "à l'instant"

              }
            }
         


           let type ;
           const user =localStorage.getItem('connected')

          if (message.sender.email==user) {
            type='sent'
          }else{
            type = 'received'
          }
       if (message.sender.email==user||message.receiver.email==user) {
        return(
            
          <Message
            key={index}
            type={type}
            image={message.image}
            name={message.name}
            avatar={message.avatar}
            first={isFirstMessage(message, index)}
            last={isLastMessage(message, index)}
            tail={isTailMessage(message, index)}
            onClick = {
              ()=>{
                f7.dialog.alert(
                 
                  'Ce message a été envoyé le '+'\t' + date
                  +'    '+ 'à'+'   ' +time
                )

              }
            }
          >
            {
              <div style={{opacity:0.9, color: '#ccc',marginTop: '5px'}}>
               
            {displayTime}
              </div>
            }
            {message.text && (
              <span slot="text" dangerouslySetInnerHTML={{ __html: message.text }} />
            )}
          </Message>
        
      )
       }
        }
        )}
        {typingMessage && (
          <Message
            type="received"
            typing={true}
            first={true}
            last={true}
            tail={true}
            header={`${typingMessage.name} is typing`}
            avatar={typingMessage.avatar}
          />
        )}
      </Messages>
    </Page>
      
    
  );
};


export default ChatBox;