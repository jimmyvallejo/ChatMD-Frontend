import { Comment } from "react-loader-spinner";
import { useEffect,} from "react";


const ChatScreen = ({divRef, displayedConversation, authUser, loading, conversation, setMessage}) => {
    


  const scrollToBottom = () => {
    if (divRef.current) {
      divRef.current.scrollTo({
        top: divRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };
      useEffect(() => {
        scrollToBottom();
      }, [conversation, loading]);

  
  return (
      <div
        ref={divRef}
        className="convoContain flex flex-col bg-gray-200 bg-opacity-20 w-full  "
      >
        
        {displayedConversation.map((elem, index) => {
          return (
            <div
              key={index}
              className="text-left flex flex-col items-center lg:mt-5 mb-4 "
            >
              <div className="w-4/5 lg:w-3/5 flex flex-col lg:ml-2">
                {elem.User && (
                  <div className="bg-slate-200 bg-opacity-50 p-4 border-slate-200 rounded-xl">
                    <p className=" leading-8">
                      <span className="text-blue-500">{authUser.name}</span>
                      {` : ${elem.User}`}
                    </p>
                  </div>
                )}
                <div className="bg-red-200 bg-opacity-50 mt-10 mb-3 p-5 border-red-200 rounded-xl">
                  <p className=" leading-8">
                    <span className="text-red-500">ChatMD</span>
                    {` : ${elem.ChatMD}`}
                  </p>
                </div>
              </div>
              {loading && index === conversation.length - 1 && (
                <div className="mt-5 mb-20 mr-10">
                  <Comment
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="comment-loading"
                    wrapperStyle={{}}
                    wrapperClass="comment-wrapper"
                    color="#fff"
                    backgroundColor="#AEE2FF"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
}

export default ChatScreen