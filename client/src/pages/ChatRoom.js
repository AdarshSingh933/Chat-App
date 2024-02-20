import React,{useState,useEffect} from "react";
import "../styles/ChatRoomStyles.css";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import {showLoading,hideLoading} from '../redux/features/alertSlice';
import {message} from 'antd';
import {Link,useNavigate} from 'react-router-dom'
import io from "socket.io-client"; // Import Socket.IO client library
    
const ChatRoom = ()=>{
    const dispatch = useDispatch();
    const [chat,setChat]=useState([]);
    const [messageText, setMessageText] = useState("");
    const {user} = useSelector((state)=>state.user);
    const navigate = useNavigate();
    const socket = io("http://localhost:8000"); // Initialize Socket.IO

  // Socket.IO event listeners
  useEffect(() => {
    socket.on("message", (newMessage) => {
      setChat([...chat, newMessage]);
    });
  }, [chat]);

    // logout funtion
    const handleLogout = () => {
        localStorage.clear();
        message.success("Logout Successfully");
        navigate("/login");
    };

    //getChat function
    const getChat = async () => {
        try {
            console.log("Fetching chat messages...");
            dispatch(showLoading());
            const res = await axios.post(
                'http://localhost:8000/api/v1/chatRoom/getChatMessage',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            dispatch(hideLoading());
            if (res.data.success) {
                console.log("Chat messages loaded successfully.");
                setChat([...res.data.data.messages]);
                console.log("chat",chat);
            } else {
                console.log("Error loading chat messages:", res.data.message);
                message.error(res.data.message);
            }
        } catch (error) {
            console.log("Error fetching chat messages:", error);
            message.error("Something went wrong");
        }
    };

    useEffect(()=>{
        if(!chat){
           getChat();
        }   
    },[chat]);

   //handle Submit function
    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     console.log("Submitting message...");
    //     try {
    //         const res = await axios.post(
    //             'http://localhost:8000/api/v1/chatRoom/sendMessage',
    //             {
    //                 userId: user._id,
    //                 value: messageText
    //             },
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${localStorage.getItem('token')}`
    //                 }
    //             }
    //         );
    //         if (res.data.success) {
    //             console.log("Message sent successfully.");
    //             setChat([...res.data.data.messages]);
    //         }
    //     } catch (error) {
    //         console.log("Error sending message:", error);
    //     }
    // };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitting message...");
        socket.emit("message", {
          userId: user._id,
          value: messageText,
        });
        setMessageText(""); // Clear input field after sending message
      };

      
      useEffect(() => {
        return () => {
          socket.disconnect();
        };
      }, []);
        

    const handleChange = (event) => {
      setMessageText(event.target.value);
    };

    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        handleSubmit(event);
      }
    };
     
    return (
        <> 
          <div className="chatRoom">
          <div className="heading">
            <span>Chat Room</span>
            <div className="logout" onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="/login">Logout</Link>
              </div>
          </div>
         {chat?.map((obj)=>{
              return(
                <div className={obj.sender.email===user.email?"rightSide":"leftSide"}>
                <span>{obj.text}</span>
                </div>
              )
         })
         } 
           <div className="footer">
           <form className="form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Type a message"
                            value={messageText}
                            onChange={handleChange}
                            onKeyDown={handleKeyPress}
                        />
                        <button type="submit">Submit</button>
           </form>
          </div>
          </div>
        </>
    )
}

export default ChatRoom;