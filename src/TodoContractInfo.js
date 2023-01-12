import { useState } from 'react'

import { useBalance } from 'wagmi'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

function TodoContractInfo(props) {
  const [contractBalance, setContractBalance] = useState(0)

  // Get the current balance of the Todo smart contract wallet
  useBalance({
    address: props.todoContract.address,
    formatUnits: 'ether',
    watch: true,
    onSuccess(data) {
      setContractBalance(data.formatted)
    },
    onError(error) {
      console.log(
        'Error while fetching balance of Todo Smart Contract: ',
        error
      )
    },
  })

  return (
    <>
      <Row>
        <h3 className='text-5xl font-bold mb-20'>{'Tiktok Contract Info'}</h3>
      </Row>
      <Row>
        <Col md='auto'>Todo Contract Address:</Col>
        <Col>{props.todoContract.address}</Col>
      </Row>
      <Row>
        <Col md='auto'>Balance:</Col>
        <Col>{contractBalance} ETH</Col>
      </Row>
    </>
  )
}

export default TodoContractInfo
