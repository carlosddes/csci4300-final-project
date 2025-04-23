interface MessageBubbleProps {
    message: {
        sender: string,
        content: string
    }
}

const MessageBubble = ( { message } : MessageBubbleProps) => {
    return (
        <div className="flex flex-col">
            {
                message.sender === "user" ? <div className="ml-auto bg-blue-300 rounded-lg wrap w-[40%] p-2 m-3">{message.content}</div> : <div className="mr-auto bg-gray-300 rounded-lg wrap w-[40%] p-2 m-3 float-right">{message.content}</div>
            }
        </div>
    );
}

export default MessageBubble;