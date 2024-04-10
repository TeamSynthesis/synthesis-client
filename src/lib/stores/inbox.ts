import { writable } from "svelte/store";

export type Message = {
    id: string;
    content: string;
    sender:  string;
    timestamp: string;
};

type Inbox = {
    loading:boolean,
    chats: 
    {
        messages: Message[];
        chatId: string;
    }[]
};

const inbox = (()=> {
    const { subscribe, set, update } = writable<Inbox>({
        loading:false,
        chats:[]
    });
    

    const addMessage = (chatId: string, message: Message) => {
        update((inbox) => {
         const chat = inbox.chats?.find((c)=>c.chatId === chatId);
         if(!chat){ 
            inbox.chats.push({
                chatId,
                messages:[message]
            }); 
            return inbox;
         }
         if(chat.messages?.find(ms => ms.id === message.id)) return inbox;
         chat.messages.push(message);
      
        return inbox;
        });
    
    }
    const localSync = () => {

    }

    return {
        subscribe,
        set,
        update,
        addMessage
    };
  })()

export default inbox;