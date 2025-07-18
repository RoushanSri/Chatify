import React, { useState, useRef, useEffect } from 'react'
import { BsSend } from "react-icons/bs";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { FiMessageCircle } from "react-icons/fi";
import MessageContainer from './MessageContainer';
import ChatHeader from './ChatHeader';
import { useDispatch } from 'react-redux';
import { getMessages, sendMessage } from '../redux/slices/messageSlice';
import { getSocket } from '../socket';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

const ChatBox=({
  currentUser
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
      const friendId=currentUser._id
    dispatch(getMessages({friendId}))
    .then((res)=>{
      if (res.payload) {
        setMessages(res.payload.messages);
      }
    })

  }},[currentUser])

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
        dispatch(sendMessage({friendId, text:inputValue, image, replyId:replyTo?replyTo._id:null}))
        .then((res)=>{
          if(res.payload && res.payload.message){            
            setMessages(prev => [...prev, res.payload.message])
          }
        })
      setShowPicker(false)
      setInputValue('')
      setReplyTo(null)
    }
  }

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
            <MessageContainer message={message} currentUser={currentUser} onReply={onReply}/>
          ))
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="px-6 py-4 bg-gradient-to-r from-teal-50 to-white border-t border-teal-100">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative flex flex-col gap-1">
            {replyTo && (
                <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-teal-50 border-l-4 border-teal-500 text-sm 
                text-gray-800">
                  <div className="overflow-hidden">
                    <p className="text-xs font-semibold text-teal-700">
                      Replying to {replyTo.senderId?.auth?.username || "Unknown"}
                    </p>
                    <p className="truncate max-w-[250px] text-xs italic">
                      {replyTo.text || "[Image]"}
                    </p>
                  </div>
                  <button
                    onClick={() => setReplyTo(null)}
                    className="ml-2 text-gray-400 hover:text-red-500"
                    title="Cancel reply"
                  >
                    ✕
                  </button>
                </div>
              )}
              <div className="relative w-full">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 
                  focus:ring-teal-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Type your message..."
                />
                <button onClick={()=>setShowPicker(!showPicker)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer">
                  <MdOutlineEmojiEmotions size={"1.5rem"} />
                </button>
                {showPicker && (
                  <div className='absolute z-40 bottom-15 right-0'>
                    <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                  </div>
                )}
              </div>
            </div>

          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white 
            rounded-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 
            font-medium hover:shadow-xl hover:scale-105 cursor-pointer"
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