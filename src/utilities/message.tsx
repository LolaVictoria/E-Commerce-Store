import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RiErrorWarningLine } from "react-icons/ri";

type MessageType = {
   
    message: string;
    type: 'success' | 'error'
};

const Message: React.FC<MessageType> = ({ message, type }) => {
    return (
        <div className={`p-4 mb-4 w-auto  text-sm rounded flex items-center ${type === 'error' ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
            <span className={`mr-1.5 ${type === "error" ? "text-red-800" : " text-green-800"}`}>
                {type === "error" ? <RiErrorWarningLine size={15} /> : <IoMdCheckmarkCircleOutline size={15} />}
            </span>
            {message}
        </div>
    );
};

export default Message;