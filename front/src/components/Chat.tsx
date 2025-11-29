import React, { useEffect, useRef, useState } from 'react';
import '../App.css';
import { Minimize, SendHorizontal, UserStar } from 'lucide-react';

function Chat() {
	const [message, setMessage] = useState('');
	const [closeChat, setCloseChat] = useState(false);
	const [almacen, setAlmacen] = useState<{ user: string; system: string }[]>([]);
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
	};
	const handleMessage = (message: React.ChangeEvent<HTMLTextAreaElement>) => {
		setMessage(message.target.value);
	};

	const sendMessage = async () => {
		const API = await fetch('http://localhost:4000/api/chat', {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify({ message }),
		});
		const res = await API.json();
		setAlmacen([...almacen, { user: res.question, system: res.response }]);
		setMessage('');
	};
	useEffect(() => {
		scrollToBottom();
	}, [almacen]);
	const downloadReport = async () => {
		const response = await fetch('http://localhost:4000/api/reports/downloadReport');
		const blob = await response.blob();
		const url = window.URL.createObjectURL(blob);

		const link = document.createElement('a');
		link.href = url;
		link.download = 'reporte.xlsx';
		link.click();
		window.URL.revokeObjectURL(url);
	};
	const downloadCertificate = async (nombre: string) => {
		const response = await fetch(`http://localhost:4000/api/reports/downloadCertificate/${nombre}`, {});
		const blob = await response.blob();
		const url = window.URL.createObjectURL(blob);

		const link = document.createElement('a');
		link.href = url;
		link.download = 'certificado.pdf';
		link.click();
		window.URL.revokeObjectURL(url);
	};
	const openModal = () => {
		const nombre = window.prompt('ingresa el nombre') || '';
		downloadCertificate(nombre);
	};
	return (
		<section>
			<div className='h-full   '>
				<div
					id='padre'
<<<<<<< HEAD
					className={` bg-linear-to-r from-blue-900/80 to-violet-500/70 w-sm ${
						closeChat ? 'h-10 overflow-hidden' : 'h-1/5'
					} pb-2 mb-3 rounded-md  `}>
=======
					className={` bg-linear-to-r from-blue-900/80 to-violet-500/70 w-sm ${closeChat ? 'h-10 overflow-hidden' : 'h-1/5'
						} pb-2 mb-3 rounded-md  `}>
>>>>>>> 5b82538b2c5a4c7de3e8cb0afcb7df55e81276b9
					<div className='flex justify-end items-center '>
						<button
							onClick={() => setCloseChat((prev) => !prev)}
							className='text-white font-semibold  w-auto my-2 cursor-pointer mr-2    '>
							<Minimize className='text-white  ' />
						</button>
					</div>
					<div
						id='contenedor'
						style={{ height: '400px', overflowY: 'auto' }}
						className=' h-96 w-full pt-3  overflow-auto'>
						<div className={`${almacen?.length === 0 ? 'flex' : 'hidden'}`}>
							<UserStar className='text-white' />
							<p className=' ml-1.5 bg-white text-start self-start max-w-2/3 wrap-break-word whitespace-normal py-1 px-3 text-black rounded-md '>
								Como puedo ayudarte hoy?
							</p>
						</div>
						{almacen.map((a, i) => (
							<div key={i}>
								<div className='flex '>
									<div className='flex justify-end w-full'>
										<p className='mr-1.5 bg-green-500 text-start self-end max-w-2/3 wrap-break-word whitespace-normal b-3 py-1 px-3 text-white rounded-md my-5  min-w-32 '>
											{a.user}
										</p>
										<span
											id='indicator'
											className='mt-5 relative  bottom-0 right-2.5  h-2  '></span>
									</div>
								</div>
								<div className='flex '>
									<UserStar className='text-white' />

									<p className=' ml-1.5 bg-white text-start self-start max-w-2/3 wrap-break-word whitespace-normal py-1 px-3 text-black rounded-md '>
										{a?.system}
									</p>
								</div>
							</div>
						))}
						<div ref={messagesEndRef} />
					</div>
					<div className='  mt-1 border-t border-white '>
						<div className='flex justify-evenly gap-3 pt-3'>
								<button
								onClick={downloadReport}
								className='border border-blue-500 rounded-md bg-white w-24 cursor-pointer'>
								Estadisticas
							</button>
							<button
								onClick={downloadReport}
								className='border border-blue-500 rounded-md bg-white w-24 cursor-pointer'>
								Reportes
							</button>
							<button
								onClick={openModal}
								className='border border-blue-500 rounded-md bg-white w-24 cursor-pointer'>
								Certificado
							</button>
						</div>
					</div>
					<div className='flex items-center m-2 bg-white rounded-4xl px-3 '>
						<textarea
							placeholder='Escribe lo que quieras'
							maxLength={200}
							onChange={handleMessage}
							value={message}
							className='h-11 self-center  w-full resize-none content-center  '
						/>
						<SendHorizontal
							onClick={sendMessage}
							className=''
						/>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Chat;
