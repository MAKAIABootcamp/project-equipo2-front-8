import { useRef, useEffect } from "react";
import PropTypes from "prop-types";

const ChatHistory = ({ chatHistory, hasStarted, startInterview, isTyping }) => {
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div
      ref={chatContainerRef}
      className="h-64 overflow-y-auto p-4 space-y-4 bg-white rounded-lg shadow-inner"
    >
      {!hasStarted ? (
        <>
          <div className="flex justify-start">
            <div className="bg-purple-300 text-black p-2 rounded-lg my-2 max-w-xs relative before:content-[''] before:absolute before:top-2 before:left-[-10px] before:w-0 before:h-0 before:border-r-8 before:border-r-purple-300 before:border-t-8 before:border-t-transparent before:border-b-8 before:border-b-transparent">
              {'¿Estás listo? Presiona "Iniciar Entrevista" para comenzar.'}
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className="px-6 py-2 rounded-lg mt-4 mb-4 border border-color-1 text-color-3 hover:bg-[#ece1ff] hover:text-color-3 transition font-dosis"
              onClick={startInterview}
              disabled={hasStarted}
            >
              Iniciar Entrevista
            </button>
          </div>
        </>
      ) : (
        chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`flex ${
              chat.type === "bot" ? "justify-start" : "justify-end"
            } animate__animated animate__fadeInUp`}
          >
            <div
              className={`relative p-2 rounded-lg my-2 max-w-xs shadow-md ${
                chat.type === "bot"
                  ? 'bg-purple-300 text-black before:content-[""] before:absolute before:top-2 before:left-[-10px] before:w-0 before:h-0 before:border-r-8 before:border-r-purple-300 before:border-t-8 before:border-t-transparent before:border-b-8 before:border-b-transparent'
                  : 'bg-purple-500 text-white before:content-[""] before:absolute before:top-2 before:right-[-10px] before:w-0 before:h-0 before:border-l-8 before:border-l-purple-500 before:border-t-8 before:border-t-transparent before:border-b-8 before:border-b-transparent'
              }`}
            >
              {chat.message}
            </div>
          </div>
        ))
      )}
      {isTyping && hasStarted && (
  <div className="flex justify-start mt-2 space-x-2">
    <span className="w-3 h-3 bg-purple-500 rounded-full animate-[fadeInOut_1.5s_ease-in-out_infinite]"></span>
    <span className="w-3 h-3 bg-purple-500 rounded-full animate-[fadeInOut_1.5s_ease-in-out_infinite] delay-150"></span>
    <span className="w-3 h-3 bg-purple-500 rounded-full animate-[fadeInOut_1.5s_ease-in-out_infinite] delay-300"></span>
  </div>
)}
    </div>
  );
};

ChatHistory.propTypes = {
  chatHistory: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["bot", "user"]).isRequired,
    })
  ).isRequired,
  hasStarted: PropTypes.bool.isRequired,
  startInterview: PropTypes.func.isRequired,
  isTyping: PropTypes.bool.isRequired,
};

export default ChatHistory;
