import React, { useState, useRef, useEffect } from 'react'
import { FiMessageCircle } from "react-icons/fi";
import MessageContainer from './MessageContainer';
import ChatHeader from './ChatHeader';
import { useDispatch } from 'react-redux';
import { getMessages, sendMessage } from '../redux/slices/messageSlice';
import { getSocket } from '../socket';
import SendMessage from './SendMessage';

const ChatBox=({
  currentUser, currentGroup, setFriendList, setGroupList
}) => {
  const [inputValue, setInputValue] = useState('')
  const [image, setImage] = useState("")
  const [messages, setMessages] = useState([])
  const [replyTo, setReplyTo] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  const handleEmojiSelect = (emoji) => {
    setInputValue((prev) => prev + emoji.native);
  };

    const dispatch = useDispatch();

  useEffect(()=>{
    if(currentUser){
      const id=currentUser._id
    dispatch(getMessages({id, type:"friend"}))
    .then((res)=>{
      if (res.payload) {
        setMessages(res.payload.messages);
      }
    })
    }
    if(currentGroup){
      const id=currentGroup._id
    dispatch(getMessages({id, type:"group"}))
    .then((res)=>{
      if (res.payload) {
        setMessages(res.payload.messages);
      }
    })
  }},[currentUser, currentGroup])

  useEffect(() => {
  const socket = getSocket();
  if (!socket || !currentUser) return;

  const handleNewMessage = (newMsg) => {
        
    if (
      newMsg.senderId._id === currentUser._id || 
      newMsg.recieverId === currentUser._id
    ) {
      
      setMessages((prev) => [...prev, newMsg]);
    }
  };
  socket.on("newMessage", handleNewMessage);
  return () => {
    socket.off("newMessage", handleNewMessage);
  };
}, [currentUser]);

useEffect(() => {
  const socket = getSocket();
  if (!socket || !currentGroup) return;

  const handleNewMessage = (newMsg) => {
        
    if (newMsg.groupId === currentGroup._id) {
      setMessages((prev) => [...prev, newMsg.message]);
    }
  }

  socket.on("newGroupMessage", handleNewMessage);
  return () => {
    socket.off("newGroupMessage", handleNewMessage);
  };
}, [currentGroup]);

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
  if (inputValue.trim()) {
    const payload = {
      text: inputValue,
      image,
      replyId: replyTo ? replyTo._id : null,
    };

    let type, id;

    if (currentUser) {
      type = "friend";
      id = currentUser._id;
    } else if (currentGroup) {
      type = "group";
      id = currentGroup._id;
    }

    dispatch(sendMessage({ type, id, ...payload }))
      .then((res) => {
        if (res.payload && res.payload.message) {
          setMessages((prev) => [...prev, res.payload.message]);
        }
      });

    setShowPicker(false);
    setInputValue('');
    setReplyTo(null);
  }
};

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const onReply=(message)=>{
    setReplyTo(message)
  }

  return (  
    <div className="flex flex-col bg-white w-full h-full transition-all duration-300 overflow-hidden">
      <ChatHeader currentUser={currentUser} currentGroup={currentGroup} setFriendList={setFriendList} setGroupList={setGroupList}/>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50 to-white">
        {Array.isArray(messages) && messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <div className="w-16 h-16 bg-teal-100 text-teal-500 rounded-full flex items-center justify-center mb-4">
              <FiMessageCircle size={"1.8rem"}/>
            </div>
            <p className="text-center text-sm">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          (Array.isArray(messages) ? messages : []).map((message) => (
            <MessageContainer message={message} onReply={onReply}/>
          ))
        )}
        
        <div ref={messagesEndRef} />
      </div>
      <SendMessage replyTo={replyTo} setReplyTo={setReplyTo} handleKeyPress={handleKeyPress} handleSend={handleSend} 
      inputValue={inputValue} setInputValue={setInputValue} setShowPicker={setShowPicker} showPicker={showPicker} handleEmojiSelect={handleEmojiSelect}/>
    </div>
  )
}

export default ChatBox