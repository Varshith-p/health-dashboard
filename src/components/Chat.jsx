import { useState, useEffect } from "react";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import { IoChatboxOutline } from "react-icons/io5";

const Chat = () => {
  const [isChatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          "https://6789c49add587da7ac279548.mockapi.io/api/chat"
        );
        setMessages(response.data);
        setLoading(false);
      } catch (err) {
        alert(err.message);
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  // Send a new message
  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    console.log(newMessage);

    const message = {
      sender: "user",
      content: newMessage,
      id: messages.length + 1,
    };

    const response = await axios.post(
      "https://6789c49add587da7ac279548.mockapi.io/api/chat",
      message
    );
    console.log(response);
    setMessages([...messages, message]);
    setNewMessage("");
  };

  return (
    <section>
      <div
        onClick={() => setChatOpen(!isChatOpen)}
        className="fixed bottom-4 right-4 mb-4 mr-4"
      >
        <button
          id="open-chat"
          className="bg-blue-500 text-white p-4 rounded-full hover:bg-blue-600 transition duration-300 flex items-center"
        >
          <IoChatboxOutline size={24} />
        </button>
      </div>
      <div
        id="chat-container"
        className={`${
          !isChatOpen && "hidden"
        } fixed bottom-24 right-8 w-80 xxl:w-96 z-[900] lg:h-[70%] xxl:h-auto`}
      >
        <div className="bg-white shadow-md rounded-lg max-w-lg w-full">
          <div className="px-4 py-2 xxl:py-4 border-b bg-blue-500 text-white rounded-t-lg flex justify-between items-center">
            <p className="xxl:text-lg font-semibold">Support</p>
            <div
              onClick={() => setChatOpen(false)}
              className="cursor-pointer hover:bg-blue-600 transition-all duration-300 rounded-md p-1"
            >
              <IoMdClose size={24} />
            </div>
          </div>
          <div
            id="chatbox"
            className="p-4 h-80 lg:h-64 xxl:h-80 overflow-y-auto"
          >
            {!loading &&
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-2 ${message.sender == "user" && "text-right"}`}
                >
                  <p
                    className={`${
                      message.sender == "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    } rounded-lg py-2 px-4 inline-block text-sm xxl:text-base`}
                  >
                    {message.content}
                  </p>
                </div>
              ))}
          </div>
          <div className="p-4 border-t flex">
            <input
              id="user-input"
              type="text"
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
              placeholder="Type a message"
              className="w-full px-3 py-2 border rounded-l-md focus:outline-none text-sm xxl:text-base"
            />
            <button
              id="send-button"
              onClick={sendMessage}
              className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300 text-sm xxl:text-base"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chat;
