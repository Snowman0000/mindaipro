import {useState} from 'react'
import './App.css';
import {
    VStack
} from "@chakra-ui/react"
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Content from './components/Content';

function App() {
    const [model, setModel] = useState('');
    const handleChangeModel = value => {
        setModel(value);
    }
    return (
        <div className="App">
            <div className='Container'>
                <Sidebar setModel={handleChangeModel} />
                <VStack w={"100%"} padding={8}>
                    <Header />
                    <Content model={model} />
                </VStack>
            </div>
        </div>
    );
}

export default App;
