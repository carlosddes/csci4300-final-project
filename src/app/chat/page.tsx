import ChatView from "@/components/ui/ChatView";

const Chat = () => {
    return (
        <div className="flex items-center justify-center">
            <div className="h-[85vh] w-[50vw] bg-opacity-0 overflow-hidden rounded-xl border border-[#ECEFF2] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
                <ChatView></ChatView>
            </div>
        </div>
    );
};

export default Chat;