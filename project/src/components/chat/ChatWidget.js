import React, { useRef, useState, useEffect, useCallback } from "react";
import "./chat.css";
import { ChatIcon } from "@chakra-ui/icons";
import { ChakraProvider } from '@chakra-ui/react'
import Chat from './chat'
const ChatWidget = (props) => {

  const [showDiv, setShowDiv] = useState(false);
  const handleClickShow = () => {
    setShowDiv(!showDiv);
    console.log(showDiv)
  };

  return (  
    <ChakraProvider>
    <div>
        <Chat isVisible={showDiv} userID={props.userID}/>     
        <div className="button-container">
        <button className="message-button"  onClick={handleClickShow}>
      <ChatIcon/>
        </button>
     </div>
     
    </div>
    </ChakraProvider>
  );
};

export default ChatWidget;