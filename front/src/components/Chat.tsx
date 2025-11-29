import { useState } from 'react';
import '../App.css';
import type { ApiResponse } from '../interface/Api';
import { Minimize, SendHorizontal, UserStar } from 'lucide-react';

function Chat() {
	const [message, setMessage] = useState('');
	const [response, setResponse] = useState<ApiResponse | null>(null);
	const [button, setButton] = useState(false);
	const [buttonText, setButtonText] = useState('');
	const [messages, setMessages] = useState([]);
	const [closeChat, setCloseChat] = useState(false);

	const handleMessage = (message: any) => {
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
		setResponse(res);
	};

	return (
		<section >
			<div className='h-full   '>
				<div
				id='padre'
					className={` bg-linear-to-r from-blue-900/80 to-violet-500/70 w-sm ${
						closeChat ? 'h-10 overflow-hidden' : 'h-1/5'
					} pb-2 mb-3 rounded-md  `}>
					<div className='flex justify-end items-center '>
						<button
							onClick={() => setCloseChat((prev) => !prev)}
							className='text-white font-semibold  w-auto my-2 cursor-pointer mr-2    '>
							<Minimize className='text-white  ' />
						</button>
					</div>
					<div id='contenedor' className=' h-96 w-full py-3  overflow-auto'>
						<div className='flex '>
							<UserStar className='text-white' />

							<p className=' ml-1.5 bg-white text-start self-start max-w-2/3 wrap-break-word whitespace-normal py-1 px-3 text-black rounded-md '>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, dolor. Quibusdam aliquid expedita eum ratione rem odio,
								beatae accusantium laudantium quo asperiores quisquam magni eveniet voluptatem inventore quis, ullam recusandae deserunt
								ducimus. Maxime officia eum deserunt nam consequatur dolorem cumque quaerat deleniti maiores! Temporibus accusantium nostrum
								possimus voluptate odit sequi.
							</p>
						</div>
						<div className='flex justify-end w-full'>
							<div className='flex justify-end'>
								<p className='mr-1.5 bg-green-500 text-start self-end max-w-2/3 wrap-break-word whitespace-normal b-3 py-1 px-3 text-white rounded-md mt-5 '>
									Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio eaque commodi suscipit asperiores enim voluptas
									blanditiis! Tempore odit voluptatem unde molestias quasi. Debitis doloribus consequatur assumenda ipsum libero facilis esse
									fuga voluptate illum corporis tempore, illo velit quia pariatur aspernatur alias a iusto saepe et fugiat eum. Minus, facere
									at? Impedit exercitationem explicabo quas, reprehenderit eum optio magni alias est ex rerum totam officiis sunt libero
									facere excepturi perspiciatis omnis eius saepe voluptatem distinctio culpa tempora dolores cumque ab? Eum aspernatur
									tempore ab. Quae tenetur, eaque illum a, nostrum maxime accusantium expedita vel culpa, unde sequi repudiandae quod ipsa.
									Doloremque.
								</p>
								<span
									id='indicator'
									className='mt-5 relative  bottom-0 right-2.5  h-2  '></span>
							</div>
						</div>
					</div>
					<div className='  mt-1 border-t border-white '>
						<div className='flex justify-evenly gap-3 pt-3'>
							<button className='border border-blue-500 rounded-md bg-white w-24 cursor-pointer'>Reportes</button>
							<button className='border border-blue-500 rounded-md bg-white w-24 cursor-pointer'>Fallas</button>
							<button className='border border-blue-500 rounded-md bg-white w-24 cursor-pointer'>Certifidivo</button>
						</div>
					</div>
					<div className='flex items-center m-2 bg-white rounded-4xl px-3 '>
						<textarea
							placeholder='Escribe lo que quieras'
							maxLength={200}
							onChange={handleMessage}
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
