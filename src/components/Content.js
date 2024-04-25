import React, {useState, useEffect} from 'react'
import {
    VStack,
    Flex,
    Box,
    Text,
    Divider,
    Image,
    Textarea
} from '@chakra-ui/react'
import { AiOutlineMore } from "react-icons/ai";
import { IoIosImages } from "react-icons/io";
import Message from './Message';
import {
    MessageInput,
    TypingIndicator,
} from '@chatscope/chat-ui-kit-react';

export default function Content(props) {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const [isTyping, setIsTyping] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [messages, setMessages] = useState([
        {
            message: `Hello! Ask me anything!`,
            sentTime: new Date().toLocaleTimeString(),
            sentDate: new Date().toLocaleDateString(),
            sender: "ChatGPT",
        },
    ]);

    useEffect(() => {
        if (props.model !== '')
            setMessages((prevMessages) => [...prevMessages, {
                message: `Hello, I am ${props.model}! Ask me anything!`,
                sentTime: new Date().toLocaleTimeString(),
                sentDate: new Date().toLocaleDateString(),
                sender: "ChatGPT",
            }])
    }, [props.model]);

    useEffect(() => {
        const element = document.getElementById('messages');
        element.scrollTop = element.scrollHeight;
    }, [messages]);

    const handleSendRequest = async (message) => {
        const newMessage = {
            message,
            direction: 'outgoing',
            sender: "user",
            sentTime: new Date().toLocaleTimeString(),
            sentDate: new Date().toLocaleDateString(),
        };
    
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setIsTyping(true);
        
        try {
          const response = await processMessageToChatGPT([...messages, newMessage]);
          const content = response.choices[0]?.message?.content;
          if (content) {
            const chatGPTResponse = {
                message: content,
                sender: "ChatGPT",
                sentTime: new Date().toLocaleTimeString(),
                sentDate: new Date().toLocaleDateString(),
            };
            setMessages((prevMessages) => [...prevMessages, chatGPTResponse]);
          }
        } catch (error) {
          console.error("Error processing message:", error);
        } finally {
          setIsTyping(false);
        }
    };
    async function processMessageToChatGPT(chatMessages) {
        const apiMessages = chatMessages.map((messageObject) => {
        const role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
        return { role, content: messageObject.message };
        });

        const apiRequestBody = {
        "model": "gpt-3.5-turbo",
        "messages": [
            { role: "system", content: "I'm a Student using ChatGPT for learning" },
            ...apiMessages,
        ],
        };
        
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + API_KEY,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(apiRequestBody),
        });

        return response.json();
    }

    return (
        <VStack w={"100%"} h={"100%"} px={10} pt={6}>
            <VStack w={"100%"} h={"45vh"} maxH={"45vh"} backgroundColor={"#15151C"} borderRadius={"20px"} px={10} py={6}>
                <Flex w={'100%'} justifyContent={'space-between'}>
                    <Flex alignItems={'center'}>
                        <Box w={"61px"} h={"61px"} border={"1px solid #5DD8BE"} borderRadius={"50px"} />
                        <Text pl={5} color={'white'} fontSize={"24px"}>MindAI {props.model}</Text>
                    </Flex>
                    <AiOutlineMore fontSize={30} color='white' style={{marginRight: -15}}/>
                </Flex>
                <Divider color={"#5D5D5D"} />
                <VStack id='messages' w={"100%"} h={"32vh"} maxH={"32vh"} overflow={'auto'} overflowX={'hidden'} pr={2}>
                    {
                        messages.map((message, index) => {
                            return <Message
                                        key={'msg_'+index}
                                        id={'msg_'+index}
                                        time={message.sentTime}
                                        date={message.sentDate}
                                        mine={message.sender === 'user' ? true : false}
                                        text={message.message}
                                    />
                        })
                    }
                </VStack>
                <VStack w={'100%'} position={'relative'}>
                    {isTyping && <TypingIndicator className='typing' content={'AI is typing...'} />}
                    <MessageInput className='msg' sendButton={false} attachButton={false} placeholder="Send a Message" onSend={handleSendRequest}/>
                </VStack>
            </VStack>
            <Flex w={"100%"} h={'inherit'} justifyContent={'space-between'}>
                <Box className='prompt' w={"45%"} color={'white'} position={'relative'}>
                    <Textarea placeholder='Enter your prompt...' h={'100%'} resize={'none'} onChange={(e) => setPrompt(e.target.value)} value={prompt} />
                    <Flex className='prompt-img'>
                        <IoIosImages />
                        <Text pl={2}>GENERATE</Text>
                    </Flex>
                </Box>
                <VStack w={"28%"} margin={'auto'}>
                    <Flex w={'100%'} alignItems={'center'} justifyContent={'space-between'}>
                        <Text fontSize={'11px'} color={'white'} opacity={0.3}>Your Gallery</Text>
                        <Text fontSize={'12px'} color={'white'} opacity={0.89}>Explore</Text>
                    </Flex>
                    <Flex w={'100%'} justifyContent={'space-between'}>
                        <Image src='./img/1.png' h={'76px'} borderRadius={'13px'}/>
                        <Image src='./img/2.png' h={'76px'} borderRadius={'13px'}/>
                        <Image src='./img/3.png' h={'76px'} borderRadius={'13px'}/>
                    </Flex>
                </VStack>
                <VStack w={"20%"} color={'white'} margin={'auto'}>
                    <Text fontSize={'19px'} mb={4}>ChatGPT-4</Text>
                    <Text fontSize={'19px'} lineHeight={1} mt={4} textAlign={'right'} style={{lineHeight: 0.7}}>
                        ChatGPT-4
                        <br />
                        <span style={{fontSize: '10px'}}>Turbo</span>
                    </Text>
                </VStack>
            </Flex>
        </VStack>
    )
}
