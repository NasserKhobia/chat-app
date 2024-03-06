import React from 'react'
import Conversation from './Conversation'
import useGetConversation from '../../../../hooks/useGetConversation.js'
import { getRandomEmoji } from '../../../utils/emoji.js';

const Conversations = () => {
    const{loading,conversation} = useGetConversation();
    return (
    <div className='py-2 flex flex-col overflow-auto'>
        {conversation.map((conversation,Idx)=>(
            <Conversation
                key={conversation._id}
                conversation = {conversation}
                emoji={getRandomEmoji()}
                lastIdx={Idx === conversation.lenght - 1}
            />
        ))}
    </div>
    )
}

export default Conversations





// import React from 'react'
// import Conversation from './Conversation'

// const Conversations = () => {
//     return (
//     <div className='py-2 flex flex-col overflow-auto'>
//         <Conversation/>
//     </div>
//     )
// }

// export default Conversations
