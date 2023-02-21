import MessageForm from "./MessageForm";
import SentMessage from "./SentMessage";
import ReceiveMessage from "./ReceiveMessage";

const ChatFeed = (props) => {
    // console.log(props);

    const { chats, activechat, username, messages } = props;
    //if chats exits, then find chats and active chats 
    const chat = chats && chats[activechat];

    console.log(chat, username, messages);

    const renderReadReceipts = (message, isMyMessage) =>
        // the person reads the msg
        chat.people.map((person, index) => person.last_read === message.id && (
            < div key={`read_${index}`
            }
                className="read-receipt"
                style={{
                    float: isMyMessage ? 'right' : 'left',
                    backgroundImage: person.person.avatar && `url(${person.person.avatar})`
                }
                } />
        ));


    //for generating msgs
    const renderMessages = () => {
        //fetch msgs
        const keys = Object.keys(messages);
        //keys are just IDs of specific messages
        console.log(keys);
        //return messages
        return keys.map((key, index) => {
            const message = messages[key];
            const lastMessageKey = index === 0 ? null : keys[index - 1];
            //finding last message
            const isMyMessage = username === message.sender.username;
            return (
                <div key={`msg_${index}`} style={{ width: '100%' }
                }>
                    <div className="message-block">
                        {
                            isMyMessage ? <SentMessage message={message} /> : <ReceiveMessage message={message} lastMessage={messages[lastMessageKey]} />
                        }
                    </div>
                    <div className="read-receipts" style={{ marginRight: isMyMessage ? '18px' : '0px', marginLeft: isMyMessage ? '0px' : '68px' }}>
                        {renderReadReceipts(message, isMyMessage)};
                    </div>

                </div >
            );
        });
    }



    if (!chat) return <div />;

    return (
        <div className="chat-feed">
            <div className="chat-title-container">
                {/* in this div we render our title */}
                <div className="chat-title">
                    {chat.title}
                </div>
                <div className="chat-subtitle">
                    {chat.people.map((person) => `${person.person.username}`)}
                </div>
            </div>
            {renderMessages()}
            <div style={{ height: '100px' }}></div>
            <div className="message-form-container">
                <MessageForm {...props} chatId={activechat} />

            </div>
        </div>
    );
}
export default ChatFeed;
