const countdown = document.querySelector('.countdown');

// set lauch date (ms)
const launchDate = new Date( '20 jan 2019 13:00:00' ).getTime();

// set interval per second
const intvl = setInterval( () => {

	// get today's date and time
	const currentTime = new Date().getTime();

	// distance from currentTime to launchDate
	const distance = launchDate - currentTime;

	// calculation of time
	const days = Math.floor( distance / ( 1000 * 60 * 60 * 24 ) );
	const hours = Math.floor( ( distance % ( 1000 * 60 * 60 * 24 ) ) / ( 1000 * 60 * 60 ) );
	const mins = Math.floor( ( distance % ( 1000 * 60 * 60 ) ) / ( 1000 * 60 ) );
	const seconds = Math.floor( ( distance % ( 1000 * 60 ) ) / 1000 );
	
	// Display Result
	countdown.innerHTML = `
		<div>${days} <span>Days</span></div>
		<div>${hours} <span>Hours</span></div>
		<div>${mins} <span>Mins</span></div>
		<div>${seconds} <span>Seconds</span></div>
	`;

	// Stop if Launch date passed
	if( distance < 0 ){
		// stop counntdown
		clearInterval( intvl );

		// different color to countdown
		countdown.style.color = '#17a2b8';
		countdown.innerHTML = 'Launched!';
	}

}, 1000 );
