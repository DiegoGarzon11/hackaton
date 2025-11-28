import { useState } from 'react'
import '../App.css'
import type { ApiResponse } from '../interface/Api'


function Chat() {
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
			<section className='flex flex-col bg-blue-200 justify-between h-2/3 mb-10 border rounded-2xl w-sm justify-self-end self-end'>
				<div className=' p-3 rounded-t-2xl '>
					<h1 className='text-red-500 text-start pl-3'>Chatbot</h1>
				</div>
				<div className='messages overflow-auto h-full bg-blue-100 '>

					<p className='w-fit max-w-3/5 wrap-break-word whitespace-normal my-3 justify-self-end p-4 rounded-3xl mr-2 bg-blue-200'>{response?.question}fsadfasdffdsafadsfasdfasdfasdfadsfdasfsafadsfsdafsadsfgdfgdfsgsdfgdasd</p>
					<p className='border w-fit max-w-3/5 wrap-break-word justify-self-start p-2 rounded-3xl ml-2'>{response?.response}fewafsdsafasdfsadfasdsdfsadfasdfasdfasdfasdfasadfadsfasdfasdgdfsfdsafvsg</p>
					<p className='border w-fit max-w-3/5 wrap-break-word whitespace-normal my-3 justify-self-end p-2 rounded-3xl mr-2'>{response?.question}fsadfasdffdsafadsfasdfasdfasdfadsfdasfsafadsfsdafsadsfgdfgdfsgsdfgdasd</p>
					<p className='border w-fit max-w-3/5 wrap-break-word whitespace-normal my-3 justify-self-end p-2 rounded-3xl mr-2'>{response?.question}fsadfasdffdsafadsfasdfasdfasdfadsfdasfsafadsfsdafsadsfgdfgdfsgsdfgdasd</p>
					<p className='border w-fit max-w-3/5 wrap-break-word whitespace-normal my-3 justify-self-end p-2 rounded-3xl mr-2'>{response?.question}fsadfasdffdsafadsfasdfasdfasdfadsfdasfsafadsfsdafsadsfgdfgdfsgsdfgdasd</p>
				</div>
				<div className='justify-self-end h-1/5'>
					<textarea placeholder='En que te puedo ayudar?' maxLength={200} onChange={handleMessage} className='bg-white rounded-b-2xl resize-none  h-full py-2 px-5  w-full' />
					<button disabled={!message} onClick={sendMessage}>enviar</button>
				</div>
			</section>
		</main>
	)
}

export default Chat