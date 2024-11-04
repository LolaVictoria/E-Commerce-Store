type MessageType = {
   
    message: string;
    type: 'success' | 'error'
};

const Message: React.FC<MessageType> = ({ message, type }) => {
    return (
        <div className={`p-4 mb-4 w-auto  text-sm rounded ${type === 'error' ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
            {message}
        </div>
    );
};

export default Message;