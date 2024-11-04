type MessageType = {
    bgColor: string;
    message: string;
};

const Message: React.FC<MessageType> = ({ bgColor, message }) => {
    return (
        <div className={`${bgColor} bg-green-800 text-white p-2 rounded-lg md:w-auto mx-auto text-center`}>
            {message}
        </div>
    );
};

export default Message;
