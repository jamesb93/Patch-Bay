<script lang="ts">
	import { user } from '$lib/app';
	import { getFirestore, addDoc, collection } from 'firebase/firestore';
	import { goto } from '$app/navigation';

	const db = getFirestore();

	let patch: string = '';
	let name: string = '';
	let description: string = '';
	let updating: boolean = false;

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

{#if $user}
	<div class="container">
		<textarea
			wrap="off"
			class="patch"
			placeholder="copy patch here"
			cols="30"
			rows="30"
			bind:value={patch}
		/>
		<div class="submit">
			<textarea class="details name" type="text" bind:value={name} placeholder="patch name" />
			<textarea
				class="details desc"
				type="text"
				bind:value={description}
				placeholder="description"
			/>
			<button on:click={addData} disabled={updating}>Submit</button>
		</div>
	</div>
{/if}

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		width: 100%;
	}

	.patch {
		height: 50ch;
		resize: none;
		border: 1px solid rgb(235, 235, 235);
		white-space: pre-wrap;
	}

	.details {
		border: 1px solid rgb(235, 235, 235);
		resize: none;
	}

	.name {
		height: 3ch;
	}

	.desc {
		height: 9ch;
	}

	.submit {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		resize: none;
	}
</style>
