<script context="module">
	export async function load({ params }) {
		return {
			props: { id: params.id }
		};
	}
</script>

<script lang="ts">
	import type { PatchObject, DocData } from '$lib/types';
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import { user } from '$lib/app';
	import {
		doc,
		DocumentReference,
		getDoc,
		getFirestore,
		deleteDoc
	} from 'firebase/firestore';

	export let id: string = '';
	let err: string = '';
	let patch: PatchObject;
	let canDelete: boolean = false;
	let data: DocData;

	const db = getFirestore();
	const ref: DocumentReference = doc(db, 'patches', id);

	// Allow for deletion if the user owns the patch
	$: if ($user && data) {
		canDelete = data.user === $user.uid
	}

	getDoc(ref)
		.then((doc) => {
			if (doc.exists()) {
				data = doc.data();
				patch = {
					id: doc.id,
					data: {
						name: data.name,
						description: data.description,
						patch: data.patch
					}
				};
			} else {
				err = 'Patch does not exist';
			}
		})
		.catch((e) => {
			err = 'Error retrieving patch';
		});

	const copyPatch = () => {
		if (browser) {
			navigator.clipboard.writeText(patch.data.patch);
		}
	};

	const deletePatch = async() => {
		deleteDoc(ref)
		.then(res => goto('/'))
		.catch(e => {
			err = 'Error deleting patch'
		})
	}

	const sanitiseHTML = (str) => {
		return str.replaceAll('\n', '<br>').replaceAll('\t', '&nbsp;&nbsp;&nbsp;&nbsp;')
	}
</script>

<div class="container">
	{#if !err && patch}
	<h1 class='name'>{patch.data.name}</h1>
	{#if patch.data.description}
	<div class="description">
		{patch.data.description}
	</div>
	{/if}

	<button on:click={copyPatch} class="copy">copy code</button>

	<div class="code">
		{ @html sanitiseHTML(patch.data.patch) }
	</div>
	{:else}
		<div class="err">{err}</div>
	{/if}

	{#if canDelete}
	<button on:click={deletePatch} class="delete">delete patch</button>
	{/if}
</div>

<style>
	h1 {
		margin-bottom: 0.5em;
	}
	.container {
		display: grid;
		grid-template-rows: auto auto;
		gap: 0.5em;
	}
	.err {
		font-size: 2rem;
	}

	.copy {
		margin-top: 1em;
		font-size: 1.5rem;
	}

	.delete {
		width: max-content;
		border: 1px solid red;
	}
</style>
