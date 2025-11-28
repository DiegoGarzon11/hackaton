import { useState } from 'react'
import './App.css'
import type { ApiResponse } from './interface/Api'

function App() {

  const [message, setMessage] = useState('')
  const [response, setResponse] = useState<ApiResponse | null>(null)

  const handleMessage = (message: any): any => {
    console.log(message.target.value);
    setMessage(message.target.value)
  }

  const sendMessage = async () => {
    const API = await fetch('http://localhost:4000/api/chat', {
      headers: {

        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ message })
    })
    const res = await API.json()
    setResponse(res)


  }


  return (
    <main className='grid h-full'>
      <section className='grid-rows-auto h-2/3 mb-10 border rounded-2xl w-sm justify-self-end self-end'>
        <div className='border-b p-3 mb-3'>
          <h1 className='text-red-500 text-start pl-3'>Chatbot</h1>
        </div>
        <div className='grid-rows-1'>
          <p className='border w-fit max-w-3/5  justify-self-end p-2 rounded-3xl mr-2'>{response?.question}</p>
          <p className='border w-fit max-w-3/5  justify-self-start p-2 rounded-3xl mr-2'>{response?.response}</p>
        </div>
        <div className='grid-rows-auto'>
          <input type="text" placeholder='En que te puedo ayudar?' onChange={handleMessage} className='border py-2 px-5 rounded-3xl w-8/9 mb-2' />
        </div>
        <button disabled={!message} onClick={sendMessage}>enviar</button>
      </section>
    </main>
  )
}

export default App
