import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { auth } from "@clerk/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import ChatList from "../_component/chatList";

const Conversations = async ({ params } : { params: { id: string } }) => {
    const conversationId = params.id;
    const { userId } = await auth();

    const preloadedMessages = await preloadQuery(api.chat.getMessages, {
        conversationId: conversationId as Id<"conversations">
    }) 

    return (
        <div className="h-screen flex flex-col w-full">
            <div className="flex-1 flex flex-col overflow-hidden">
                <ChatList userId={userId!} preloadedMessages={preloadedMessages} />
                {/* <FormChat userId={userId!} conversationId={conversationId} /> */}
            </div>
        </div>
    )
}

export default Conversations;