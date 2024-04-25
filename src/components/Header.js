import React from 'react'
import {
    Flex,
    Text,
    Image,
    IconButton
} from '@chakra-ui/react'
import {
    VscBellDot
} from 'react-icons/vsc'
import {
    CiSettings,
    CiWallet
} from 'react-icons/ci'
import {
    HiOutlineSquares2X2 
} from 'react-icons/hi2'

export default function Header() {
    return (
        <div className='header'>
            <Flex color={'white'} w={'35%'} pl={10} alignItems={'center'} justifyContent={'space-between'}>
                <IconButton colorScheme={'white'} icon={<HiOutlineSquares2X2 fontSize={20} />} variant={'ghost'} data-slot="value"/>
                <IconButton colorScheme={'white'} icon={<VscBellDot fontSize={20} />} variant={'ghost'} />
                <IconButton colorScheme={'white'} icon={<CiWallet fontSize={20} />} variant={'ghost'} />
                <IconButton colorScheme={'white'} icon={<CiSettings fontSize={20} />} variant={'ghost'} />
            </Flex>
            <Flex alignItems={'center'}>
                <Text color={'#5D5D5D'}>Hello,</Text>
                <Text color={'white'} px={2}>Mister Punky</Text>
                <Image src='./img/avatar.png' borderRadius={"50px"} w={'40px'} h={'40px'} />
            </Flex>
        </div>
    )
}
