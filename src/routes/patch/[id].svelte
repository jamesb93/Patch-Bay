<script context="module">
	export async function load({ page }) {
		return {
			props: { id: page.params.id }
		};
	}
</script>

<script lang="ts">
	import { browser } from '$app/env';
	import type { PatchObject } from '$lib/types';
	import {
		doc,
		DocumentReference,
		getDoc,
		getFirestore,
	} from 'firebase/firestore';

	export let id: string = '';
	let err: string = '';
	let patch: PatchObject;

	const db = getFirestore();
	const ref: DocumentReference = doc(db, 'patches', id);

	getDoc(ref)
		.then((doc) => {
			if (doc.exists()) {
				const data = doc.data();
				patch = {
					id: doc.id,
					data: {
						name: data.name,
						description: data.description,
						patch: data.patch
					}
				};
				console.log(patch)
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
</style>
