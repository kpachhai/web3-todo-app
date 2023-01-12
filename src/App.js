import { ConnectButton } from '@rainbow-me/rainbowkit'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import TodoAbi from './artifacts/contracts/Todo.sol/Todo.json'
import TodoContractInfo from './TodoContractInfo'
// import TodoTask from './TodoTask'
import TodoTaskSC from './TodoTaskSC'

function App() {
  const todoContract = {
    address: '0x5fbdb2315678afecb367f032d93f642f64180aa3',
    abi: TodoAbi.abi,
  }

  return (
    <Container>
      <Row>
        <ConnectButton />
      </Row>
      <TodoContractInfo todoContract={todoContract} />
      <br />
      {/* <TodoTask /> */}
      <TodoTaskSC todoContract={todoContract} />
    </Container>
  )
}

export default App
