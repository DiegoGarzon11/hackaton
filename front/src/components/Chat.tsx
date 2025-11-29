import { useState } from 'react'
import '../App.css'
import type { ApiResponse } from '../interface/Api'
import { SendHorizontal } from 'lucide-react'


function Chat() {
	const [message, setMessage] = useState('')
	const [response, setResponse] = useState<ApiResponse | null>(null)
	const [button, setButton] = useState(false)
	const [buttonText, setButtonText] = useState('')
	const [messages, setMessages] = useState([])

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

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		setButton(true)
		setButtonText(e.currentTarget.textContent)
		setMessages(prev => [...prev])
	}



	return (
		<main className='grid h-full'>
			<section className='fixed flex flex-col bg-linear-to-r from-blue-900/80 to-violet-500/70 justify-between h-2/3 mb-10 border rounded-2xl w-sm justify-self-end self-end'>
				<div className='p-3 rounded-t-2xl'>
					<h1 className='text-white font-semibold text-start pl-3'>Chatbot</h1>
				</div>
				<div className='messages flex flex-col overflow-auto pt-2 h-full bg-linear-to-tr from-white to-violet-100 gap-2'>
					<div className='w-full flex flex-col gap-2 h-full'>
						<p className='w-fit max-w-3/5 wrap-break-word whitespace-normal b-3 py-2 px-4 rounded-3xl mr-2 bg-blue-200 self-end'>{response?.question || buttonText}</p>
						<p className='w-fit max-w-3/5 wrap-break-word whitespace-normal b-3 py-2 px-4 rounded-3xl ml-2 bg-blue-500 self-start'>{response?.response}</p>
						<p className='w-fit max-w-3/5 wrap-break-word whitespace-normal b-3 py-2 px-4 rounded-3xl mr-2 bg-blue-200 self-end'>{response?.question || buttonText}</p>
						<p className='w-fit max-w-3/5 wrap-break-word whitespace-normal b-3 py-2 px-4 rounded-3xl mr-2 bg-blue-200 self-end'>{response?.question || buttonText}</p>
						<p className='w-fit max-w-3/5 wrap-break-word whitespace-normal b-3 py-2 px-4 rounded-3xl mr-2 bg-blue-200 self-end'>{response?.question || buttonText}fadsadgsdgsdfhoooooooooooooooooooooooooooooooooooooooo</p>
						<p className='w-fit max-w-3/5 wrap-break-word whitespace-normal b-3 py-2 px-4 rounded-3xl mr-2 bg-blue-200 self-end'>{response?.question || buttonText}fadsadgsdgsdfhoooooooooooooooooooooooooooooooooooooooo</p>
						<p className='w-fit max-w-3/5 wrap-break-word whitespace-normal b-3 py-2 px-4 rounded-3xl mr-2 bg-blue-200 self-end'>{response?.question || buttonText}fadsadgsdgsdfhoooooooooooooooooooooooooooooooooooooooo</p>
						<p className='w-fit max-w-3/5 wrap-break-word whitespace-normal b-3 py-2 px-4 rounded-3xl mr-2 bg-blue-200 self-end'>{response?.question || buttonText}fadsadgsdgsdfhoooooooooooooooooooooooooooooooooooooooo</p>
						<p className='w-fit max-w-3/5 wrap-break-word whitespace-normal b-3 py-2 px-4 rounded-3xl mr-2 bg-blue-200 self-end'>{response?.question || buttonText}fadsadgsdgsdfhoooooooooooooooooooooooooooooooooooooooo</p>
						<p className='w-fit max-w-3/5 wrap-break-word whitespace-normal b-3 py-2 px-4 rounded-3xl mr-2 bg-blue-200 self-end'>{response?.question || buttonText}fadsadgsdgsdfhoooooooooooooooooooooooooooooooooooooooo</p>
					</div>
				</div>
				<div className='flex justify-end items-center bg-linear-to-tr from-white to-violet-100 w-full '>
					{!button ?
						<button onClick={handleClick} className={`border mr-2 mb-2 p-2 rounded-2xl text-violet-800`}>Reportes</button>
						:
						<div className='flex mr-2 mb-2 gap-2'>
							<button onClick={handleClick} className='border p-2 rounded-2xl text-violet-800'>Certificados</button>
							<button onClick={handleClick} className='border p-2 rounded-2xl text-violet-800'>Entregas pendientes</button>
							<button onClick={handleClick} className='border p-2 rounded-2xl text-violet-800'>Fallas</button>
						</div>
					}
				</div>
				<div className='flex items-center m-2 bg-white rounded-4xl px-3 gap-4'>
					<textarea placeholder='Escribe lo que quieras' maxLength={200} onChange={handleMessage} className='h-11 self-center  w-full resize-none content-center  ' />
					<SendHorizontal onClick={sendMessage} className='' />
				</div>
			</section >
		</main >
	)
}

export default Chat