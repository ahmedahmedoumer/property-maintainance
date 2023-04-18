import React, { useState } from 'react'
import Spinner from '../components/UI/Spinner';
import Table from '../components/UI/Table'
import Toast from '../components/UI/Toast';

const PaymentsPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const rows = [
      {
        number: 1,
        customerName: "AAA",
        clientName: "BBB",
        clientAddress: "232",
        serviceCategory: "232",
        serviceProvider: "232",
        price: "232",
        transactionMethod: "232",
        date: "232",
      },
      {
        number: 2,
        customerName: "AAA",
        clientName: "BBB",
        clientAddress: "232",
        serviceCategory: "232",
        serviceProvider: "232",
        price: "232",
        transactionMethod: "232",
        date: "232",
      },
      {
        number: 3,
        customerName: "AAA",
        clientName: "BBB",
        clientAddress: "232",
        serviceCategory: "232",
        serviceProvider: "232",
        price: "232",
        transactionMethod: "232",
        date: "232",
      },
      {
        number: 4,
        customerName: "AAA",
        clientName: "BBB",
        clientAddress: "232",
        serviceCategory: "232",
        serviceProvider: "232",
        price: "232",
        transactionMethod: "232",
        date: "232",
      },
      {
        number: 5,
        customerName: "AAA",
        clientName: "BBB",
        clientAddress: "232",
        serviceCategory: "232",
        serviceProvider: "232",
        price: "232",
        transactionMethod: "232",
        date: "232",
      },
    ]
  
    return (
      <div className='mt-10'>
        <h1 className='font-bold text-4xl'>Transactions</h1>
        {isLoading && <Spinner className="absolute left-0 right-0" type='main'/>}
        {(!error && !rows.length && !isLoading) && <p className="text-center text-sm font-semibold absolute left-0 right-0">No transactions found</p>}
        {(error && !isLoading) && <p className="text-center text-sm font-semibold absolute left-0 right-0">{error}</p>}
        {(!isLoading && !error) && <Table headers={["Number",  "Client name", "Client address", "Service category", "Service provider", "Price", "Transaction method", "Date"]} rows={rows}/>}
        {error && <Toast type='error' show={true} setState={setError} message={error}/>}
        {success && <Toast type='success' show={true} setState={setSuccess} message={success}/>}
      </div>
    )
}

export default PaymentsPage