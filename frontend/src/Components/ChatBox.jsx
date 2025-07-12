import React, { useState, useRef, useEffect } from 'react'
import { BsSend } from "react-icons/bs";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { FiMessageCircle } from "react-icons/fi";
import MessageContainer from './MessageContainer';
import ChatHeader from './ChatHeader';
import { useDispatch } from 'react-redux';
import { getMessages, sendMessage } from '../redux/slices/messageSlice';

const ChatBox=({
  currentUser
}) => {
  const [inputValue, setInputValue] = useState('')
  const [image, setImage] = useState("")
    const [messages, setMessages] = useState([])

    const dispatch = useDispatch();

  useEffect(()=>{
    if(currentUser){
      const friendId=currentUser._id
    dispatch(getMessages({friendId}))
    .then((res)=>{
      if (res.payload) {
        setMessages(res.payload.messages);
      }
    })

  }},[currentUser])

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (inputValue.trim()) {
        const friendId=currentUser._id
        dispatch(sendMessage({friendId, text:inputValue, image}))
        .then((res)=>{
          if(res.payload && res.payload.message){            
            setMessages(prev => [...prev, res.payload.message])
          }
        })
      setInputValue('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (  
    <div className="flex flex-col bg-white w-full h-full transition-all duration-300 overflow-hidden">
      <ChatHeader currentUser={currentUser}/>

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
            <MessageContainer message={message} currentUser={currentUser}/>
          ))
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="px-6 py-4 bg-gradient-to-r from-teal-50 to-white border-t border-teal-100">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Type your message..."
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <MdOutlineEmojiEmotions size={"1.5rem"}/>
            </div>
           </div>
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 font-medium hover:shadow-xl hover:scale-105"
          >
            <BsSend/>
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatBox

    // setMessages([{
    //   id: '1',
    //   text: 'Hi there! 👋 Welcome to Chatify!',
    //   sender: { id: 0, name: 'Alice' },
    //   timestamp: new Date(Date.now() - 300000).toISOString(),
    //   type: 'text'
    // },
    // {
    //   id: '2',
    //   text: 'Hello! Thanks for the warm welcome. This looks amazing!',
    //   sender: { id: currentUser.id, name: 'You' },
    //   timestamp: new Date(Date.now() - 240000).toISOString(),
    //   type: 'text'
    // },
    // {
    //   id: '3',
    //   text: 'I\'m so glad you like it! The new design really captures the modern chat experience we were going for.',
    //   sender: { id: 0, name: 'Alice' },
    //   timestamp: new Date(Date.now() - 180000).toISOString(),
    //   type: 'text'
    // },
    // {
    //   id: '4',
    //   text: 'Absolutely! The teal color scheme is perfect, and the animations make it feel so responsive.',
    //   sender: { id: currentUser.id, name: 'You' },
    //   timestamp: new Date(Date.now() - 120000).toISOString(),
    //   type: 'text'
    // }])