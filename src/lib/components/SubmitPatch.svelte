<script lang="ts">
	import { user } from '$lib/app';
	import { getFirestore, addDoc, collection } from 'firebase/firestore';
	import { goto } from '$app/navigation';
	const db = getFirestore();

	let patch = '';
	let name = '';
	let description = '';
	let updating = false;

	$: payload = {
		name: name,
		patch: patch,
		description: description,
		user: $user === null ? 'anonymous' : $user.uid
	};

	const addData = async () => {
		updating = true;
		addDoc(collection(db, 'patches'), payload)
			.then((doc) => {
				goto(`/patch/${doc.id}`);
			})
			.catch((e) => {
				console.log(e);
			});
		updating = false;
		patch = '';
		name = '';
		description = '';
	};
</script>

<!-- {#if $user} -->
	<div class="container">
		<textarea class="patch" placeholder="copy patch here" cols="30" rows="30" bind:value={patch} />
		<div class="submit">
			<input type="text" bind:value={name} placeholder="patch name" />
			<input type="text" bind:value={description} placeholder="description" />
			<button on:click={addData} disabled={updating}> Submit </button>
		</div>
	</div>
<!-- {/if} -->

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		width: 100%;
	}

	.patch {
		font-family: 'IBM Plex Mono', monospace;
		height: 50%;
		resize: none;
		border: 1px solid rgb(235, 235, 235);
	}

	.patch:focus {
		outline: 0;
	}

	.submit {
		display: flex;
		flex-direction: row;
		gap: 0.5em;
		width: 100%;
	}
</style>
