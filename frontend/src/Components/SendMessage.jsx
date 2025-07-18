import React from 'react'
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { BsSend } from "react-icons/bs";
import { MdOutlineEmojiEmotions } from "react-icons/md";

function SendMessage({replyTo, setReplyTo, handleKeyPress, handleSend, inputValue, setInputValue, setShowPicker, showPicker, handleEmojiSelect}) {
    
  return (
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
  )
}

export default SendMessage
