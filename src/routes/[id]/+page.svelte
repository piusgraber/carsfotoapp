<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	export let data;

	let imageDataURL = null;
	const videoStream = writable(null);
	let videoElement;
	let camError = '';

	// Accessing the camera stream
	onMount(async () => {
		try {
			const mediaStream = await navigator.mediaDevices.getUserMedia({
				video: { facingMode: 'environment' }
			});
			videoStream.set(mediaStream);
		} catch (error) {
			console.error('Error accessing the camera:', error);
		}
	});

	$: if (videoElement && $videoStream) {
		videoElement.srcObject = $videoStream;
	}

	function captureFrame() {
		if (!videoElement) return;
		const canvas = document.createElement('canvas');
		canvas.width = videoElement.videoWidth;
		canvas.height = videoElement.videoHeight;
		const context = canvas.getContext('2d');
		context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
		imageDataURL = canvas.toDataURL('image/png');
	}

	function hideCapturedImage() {
		imageDataURL = null;
	}
</script>

<!--
{JSON.stringify(data)}

-->

<div>{data.fz.id}: {data.fz.fahrzeug}</div>

  <div>{data.fz.fzf}</div>
<div>
	{#if $videoStream}
		<div class="grid">
			<div id="videoContainer">
				<video id="liveVideo" autoplay playsinline bind:this={videoElement}
					><track kind="captions" /></video
				>
			</div>
		</div>

		<div>
			{#if imageDataURL}
				<img src={imageDataURL} alt="vorschau" on:click={hideCapturedImage} on:keydown={() => {}} />
			{/if}
		</div>
	{:else}
		<div>warten auf Kamera...</div>
		{#if camError}
			<div class="err">{camError}</div>
		{/if}
    <br /><br /><br />
{/if}
</div>

{#if $videoStream}
	<button on:click={captureFrame}>Capture</button>
{/if}

<style>
	.err {
		font-family: Verdana;
		font-size: 11pt;
		color: red;
	}

	#videoContainer {
		width: 400px;
		height: 300px;
		background-color: gray;
	}
	video {
		width: 100%;
		height: auto;
	}
	button {
		padding: 10px 20px;
		font-size: 16px;
		cursor: pointer;
	}
	/*
    #capturedImage {
      background-color: gray;
      display: none;
      max-width: 100%;
      width: 500px;
      height: 375px;
    }
  */
	.grid {
		display: grid;
		grid-template-columns: 400px 500px;
	}
</style>
