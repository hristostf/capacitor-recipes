import React, { useRef, useEffect, useState } from 'react';
import { Plugins, CameraResultType } from '@capacitor/core';
import './App.css';

const { Camera, PushNotifications } = Plugins;

function App() {
	const imgRef = useRef(null);
	const [message, setMessage] = useState('');

	useEffect(() => {
		console.log('Initializing HomePage');

		// Request permission to use push notifications
		// iOS will prompt user and return if they granted permission or not
		// Android will just grant without prompting
		PushNotifications.requestPermission().then((result) => {
			if (result.granted) {
				// Register with Apple / Google to receive push via APNS/FCM
				PushNotifications.register();
			} else {
				// Show some error
			}
		});

		PushNotifications.addListener('registration', (token) => {
			setMessage('Push registration success, token: ' + token.value);
		});

		PushNotifications.addListener('registrationError', (error) => {
			setMessage('Error on registration: ' + JSON.stringify(error));
		});

		PushNotifications.addListener(
			'pushNotificationReceived',
			(notification) => {
				setMessage('Push received: ' + JSON.stringify(notification));
			}
		);

		PushNotifications.addListener(
			'pushNotificationActionPerformed',
			(notification) => {
				setMessage(
					'Push action performed: ' + JSON.stringify(notification)
				);
			}
		);
	}, []);

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
				<p>{message}</p>
			</div>
			<div className='button-container'>
				<button onClick={takePicture}>Take Photo</button>
			</div>
		</div>
	);
}

export default App;
