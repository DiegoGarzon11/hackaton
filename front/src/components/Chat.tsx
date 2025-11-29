import React, { useEffect, useRef, useState } from 'react';
import '../App.css';
import { ArrowLeft, Minimize, SendHorizontal, UserStar } from 'lucide-react';

interface Route {
	id: number;
	colegio: string;
	recorrido: string;
}
function Chat() {
	const [message, setMessage] = useState('');
	const [closeChat, setCloseChat] = useState(false);
	const [almacen, setAlmacen] = useState<{ user: string; system: string }[]>([]);
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const [option, setOption] = useState(false);
	const [ubicacion, setUbication] = useState('');
	const [manualResponse, setManualResponse] = useState<string[]>([]);
	const [routes, setRoutes] = useState<Route[]>([]);
	const [isColegio, setIsColegio] = useState(false);
	const [isRoute, setIsRoute] = useState(false);
	const [isBeneficiaries, setIsBeneficiaries] = useState(false);
	const [beneficiaries, setBeneficiaries] = useState('');
	const [id, setId] = useState('');
	const [showTextRoute, setShowTextRoute] = useState(false);
	const [showChat, setShowChat] = useState(false);
	const [valueRoute, setValueRoute] = useState('');
	const [valueBeneficiaries, setValueBeneficiaries] = useState('');
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
	useEffect(() => {
		setCloseChat(true);
	}, []);
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
	const getColegios = async () => {
		setRoutes([]);
		setIsBeneficiaries(false);
		setIsRoute(false);
		setShowTextRoute(false);
		setBeneficiaries('');

		const response = await fetch('http://localhost:4000/api/colegios');
		const data = await response.json();
		setIsColegio(true);
		setManualResponse(data.schools);
		setId('');
	};
	const handleUbication = (ubicacion: React.ChangeEvent<HTMLTextAreaElement>) => {
		setUbication(ubicacion.target.value);
	};
	const getRoute = async (ubicacion: string) => {
		setManualResponse([]);
		setIsBeneficiaries(false);
		setIsColegio(false);
		setId('');

		const response = await fetch(`http://localhost:4000/api/colegios/ubicacion/${ubicacion}`);
		const data = await response.json();
		setIsRoute(true);
		setRoutes(data.resultados);
		setUbication('');
		setValueRoute(ubicacion);
	};
	const getBeneficiaries = async (id: string) => {
		setManualResponse([]);
		setIsRoute(false);
		setIsColegio(false);
		const response = await fetch(`http://localhost:4000/api/colegios/beneficiarios?id=${id}`);
		const data = await response.json();
		setIsRoute(true);
		setBeneficiaries(data.response);
		setUbication('');
		setIsBeneficiaries(true);
		setValueBeneficiaries(id);
		setId('');
	};
	return (
		<section>
			<div className='h-full   '>
				<div
					id='padre'
					className={`  bg-linear-to-r from-blue-900/80 to-violet-500/70 w-sm ${
						closeChat ? 'h-10 overflow-hidden' : 'h-1/5 '
					} pb-2 mb-3 rounded-md  `}>
					<div className='flex justify-between items-center '>
						<button
							onClick={() => {
								setShowChat(false);
								setAlmacen([]);
							}}
							className={`${showChat ? 'visible' : 'invisible'} text-white font-semibold  w-auto my-2 cursor-pointer ml-2    `}>
							<ArrowLeft className='text-white  ' />
						</button>
						<button
							onClick={() => setCloseChat((prev) => !prev)}
							className='text-white font-semibold  w-auto my-2 cursor-pointer mr-2 '>
							<Minimize className='text-white  ' />
						</button>
					</div>
					<div
						id='contenedor'
						style={{ height: '400px', overflowY: 'auto' }}
						className=' h-96 w-full pt-3  overflow-auto'>
						<div className='flex flex-col'>
							<div className='flex'>
								<UserStar className='text-white' />
								<p className=' ml-1.5 bg-white text-start self-start max-w-2/3 wrap-break-word whitespace-normal py-1 px-3 text-black rounded-md '>
									Como puedo ayudarte hoy?
								</p>
							</div>
							<div className={`${almacen?.length === 0 ? 'flex' : 'hidden'}`}>
								<div className={`${showChat ? 'hidden' : 'flex'} flex-col gap-3 pt-3 w-full text-start mt-5 mx-2`}>
									{!option && (
										<>
											<button
												onClick={downloadReport}
												className='border border-blue-500 rounded-md bg-white w-full cursor-pointer text-start pl-3 '>
												Descargar Reportes
											</button>
											<button
												onClick={openModal}
												className='border border-blue-500 rounded-md bg-white w-full cursor-pointer text-start pl-3 '>
												Descargar Certificado
											</button>
										</>
									)}

									<div className='flex flex-col w-full'>
										<div className='flex items-center gap-3'>
											{option ? (
												<>
													<button
														className='cursor-pointer'
														onClick={() => {
															setOption(false);
															setShowTextRoute(false);
															setRoutes([]);
															setManualResponse([]);
															setBeneficiaries('');
															setIsBeneficiaries(false);
														}}>
														<ArrowLeft className='text-white' />
													</button>
												</>
											) : (
												''
											)}
											<button
												onClick={() => setOption(true)}
												className='border border-blue-500 rounded-md bg-white w-full cursor-pointer text-start pl-3 '>
												Rutas
											</button>
										</div>
										{!option ? (
											<button
												onClick={() => setShowChat(true)}
												className='border border-blue-500 rounded-md bg-white w-full cursor-pointer text-start pl-3 mt-3 '>
												Hablar con el agente
											</button>
										) : (
											''
										)}

										{option && (
											<>
												<div className='flex flex-col gap-3 items-end mt-3'>
													<button
														onClick={getColegios}
														className='border border-blue-500 rounded-md bg-white w-3/4 cursor-pointer text-start pl-3 '>
														Colegios
													</button>
													<button
														onClick={() => {
															setShowTextRoute(true);
															setRoutes([]);
															setManualResponse([]);
															setBeneficiaries('');
															setIsBeneficiaries(false);
														}}
														className='border border-blue-500 rounded-md bg-white w-3/4 cursor-pointer text-start pl-3 '>
														Rutas / Trayectos
													</button>
													<button
														onClick={() => {
															setIsBeneficiaries(true);
															setRoutes([]);
															setManualResponse([]);
															setBeneficiaries('');
															setIsRoute(false);
															setShowTextRoute(false);
														}}
														className='border border-blue-500 rounded-md bg-white w-3/4 cursor-pointer text-start pl-3 '>
														Beneficiarios
													</button>
												</div>
											</>
										)}
									</div>
								</div>
							</div>
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
					{option && isRoute && routes.length > 0 ? (
						<div>
							<div className='flex justify-end w-full'>
								<p className='mr-1.5 bg-green-500 text-start self-end max-w-2/3 wrap-break-word whitespace-normal b-3 py-1 px-3 text-white rounded-md my-5  min-w-32 '>
									{valueRoute}
								</p>
								<span
									id='indicator'
									className='mt-5 relative  bottom-0 right-2.5  h-2  '></span>
							</div>
							<div className='flex w-10/12'>
								<UserStar className='size-30 -top-10 relative text-white' />
								<div className='bg-white rounded-md mx-2 text-start p-3 h-60 overflow-auto'>
									{routes.map((a, i) => (
										<div key={i}>
											<p>
												La ruta numero <b>{a.id}</b> del colegio <b>{a.colegio}</b> hace los siguientes recorridos: <b>{a.recorrido}</b>
											</p>
											<br />
										</div>
									))}
								</div>
							</div>
						</div>
					) : (
						''
					)}
					{option && beneficiaries != '' ? (
						<>
							<div className='flex justify-end w-full'>
								<p className='mr-1.5 bg-green-500 text-start self-end max-w-2/3 wrap-break-word whitespace-normal b-3 py-1 px-3 text-white rounded-md my-5  min-w-32 '>
									Ruta numero {valueBeneficiaries}
								</p>
								<span
									id='indicator'
									className='mt-5 relative  bottom-0 right-2.5  h-2  '></span>
							</div>
							<div className='flex  gap-3'>
								<UserStar className='size-16 -top-5 relative text-white' />
								<div className='bg-white rounded-md mr-2 text-start p-3 h-auto overflow-auto'>
									<p>{beneficiaries}</p>
								</div>
							</div>
						</>
					) : (
						''
					)}
					{isBeneficiaries && (
						<>
							<div className='flex items-center m-2 bg-white rounded-4xl px-3 '>
								<textarea
									placeholder='Escribe el numero de ruta'
									maxLength={200}
									onChange={(e) => setId(e.target.value)}
									value={id}
									className='h-11 self-center  w-full resize-none content-center  '
									onKeyDown={(e) => {
										if (e.key === 'Enter') {
											getBeneficiaries(id);
										}
									}}
								/>
								<SendHorizontal
									onClick={() => getBeneficiaries(id)}
									className=''
								/>
							</div>
						</>
					)}

					{showTextRoute && (
						<>
							<div className='flex items-center m-2 bg-white rounded-4xl px-3 '>
								<textarea
									placeholder='Escribe tu direccion'
									maxLength={200}
									onChange={handleUbication}
									value={ubicacion}
									className='h-11 self-center  w-full resize-none content-center  '
									onKeyDown={(e) => {
										if (e.key === 'Enter') {
											getRoute(ubicacion);
										}
									}}
								/>
								<SendHorizontal
									onClick={() => getRoute(ubicacion)}
									className=''
								/>
							</div>
						</>
					)}

					{option && isColegio && manualResponse.length > 0 ? (
						<div className='flex'>
							<UserStar className='size-8 top-0 relative text-white' />
							<div className='bg-white rounded-md mx-2 text-start p-3 h-60 overflow-auto'>
								<p className='font-semibold'>Los colegios que cumplen con la ubicación son:</p>
								<ul>
									{manualResponse.map((a, i) => (
										<li key={i}>• {a}</li>
									))}
								</ul>
							</div>
						</div>
					) : (
						''
					)}

					{showChat && (
						<div className='flex items-center m-2 bg-white rounded-4xl px-3 '>
							<textarea
								placeholder='Escribe lo que quieras'
								maxLength={200}
								onChange={handleMessage}
								value={message}
								className='h-11 self-center  w-full  content-center  '
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
										sendMessage();
									}
								}}
							/>
							<SendHorizontal
								onClick={sendMessage}
								className=''
							/>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}

export default Chat;
