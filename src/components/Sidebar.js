import React from 'react'
import {
    VStack,
    Flex,
    Divider,
    Image,
    Text,
    Button,
    Box,
    Link
} from '@chakra-ui/react';
import { ChatType } from '../util/constant';

export default function Sidebar(props) {
    const handleChangleModel = e => {
        props.setModel(e.target.textContent);
    }
    return (
        <div className='Sidebar'>
            <VStack>
                <Flex width={"100%"} alignItems={'center'} pl={"10px"}>
                    <Image src='./logo.jpg' width={{'2xl': "5em", xl: "4.5em", lg: "4em", md: "3.5em"}} height={{'2xl': "5em", xl: "4.5em", lg: "4em", md: "3.5em"}} borderRadius={23} />
                    <Text className='logo-text'>Mind AI</Text>
                </Flex>
                <Divider />
                <VStack w={"100%"} pl={"10px"} alignItems={'start'}>
                    <Text fontSize={"12px"} py={2}>(73 models available)</Text>
                    <Box w={"100%"} h={"28vh"} maxH={"28vh"} mb={2} pl={"15px"} overflow={'scroll'} overflowX={'hidden'}>
                        {
                            ChatType.map((item, index) => (
                                <Link key={item+' '+index}>
                                    <Text
                                        textOverflow={'ellipsis'}
                                        overflow={'hidden'}
                                        whiteSpace={'nowrap'}
                                        w={'95%'}
                                        align={'start'}
                                        fontSize={"14px"}
                                        py={1}
                                        onClick={handleChangleModel}
                                    >
                                        {item}
                                    </Text>
                                </Link>
                            ))
                        }
                    </Box>
                </VStack>
                <Divider />
                <VStack w={"100%"} alignItems={'start'} pl={"10px"}>
                    <Text fontSize={'16px'}>About</Text>
                    <Text fontSize={'16px'}>Privacy & Policy</Text>
                    <Text fontSize={'16px'}>Contact</Text>
                    <Button colorScheme={'white'} variant={'outline'} borderRadius={10} fontSize={'12px'}>EXPLORE MORE</Button>
                    <Text fontSize={"12px"}>© 2024 MindAI. All Rights Reserved</Text>
                    <Flex pt={6}>
                        <Image color={'white'} src='./logo.webp' w={'31px'} h={"31px"} />
                        <Text pl={2} fontWeight={'bold'}>Powered by OPENAI</Text>
                    </Flex>
                </VStack>
            </VStack>
        </div>
    )
}
