import React, { useRef } from 'react';
import { Plugins, CameraResultType } from '@capacitor/core';
import './App.css';

const { Camera } = Plugins;

function App() {
	const imgRef = useRef(null);

	const takePicture = async () => {
		const image = await Camera.getPhoto({
			quality: 90,
			allowEditing: true,
			resultType: CameraResultType.Uri,
		});
		var imageUrl = image.webPath;

		imgRef.current.src = imageUrl;
	};

	return (
		<div className='App'>
			<div className='photo-container'>
				<img ref={imgRef} alt='test' />
			</div>
			<div className='button-container'>
				<button onClick={takePicture}>Take Photo</button>
			</div>
		</div>
	);
}

export default App;
