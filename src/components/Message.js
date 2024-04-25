import React, { useEffect } from 'react'
import {
    Flex,
    Text,
} from '@chakra-ui/react'

export default function Message(props) {
    useEffect(() => {
        if (props.text !== '') {
            const element = document.getElementById(props.id);
            element.innerHTML = props.text;
        }
    // eslint-disable-next-line
    }, []);
    return (
        <Flex w={'100%'} justifyContent={props.mine ? 'end' : 'start'}>
            {props.mine && <Text fontSize={'13px'} color={'white'} opacity={0.3} mr={2}>{props.date === new Date().toLocaleDateString() ? props.time : props.date}</Text>}
            <Text
                id={props.id}
                maxW={'50%'}
                textAlign={'left'}
                fontSize={'13px'}
                color={'white'}
                p={2}
                borderRadius={'12px'}
                background={props.mine ? 'linear-gradient(106deg, #5DD8BE 0%, #B776FF 100%)' : '#6A6A88'}
            >
            </Text>
            {!props.mine && <Text fontSize={'13px'} color={'white'} opacity={0.3} ml={2}>{props.time}</Text>}
        </Flex>
    )
}
