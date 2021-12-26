<script context="module">
	export async function load({ page }) {
		return {
			props: { id: page.params.id }
		};
	}
</script>

<script lang="ts">
	import type { PatchObject } from '$lib/types';
	import {
		doc,
		DocumentReference,
		getDoc,
		getFirestore,
		Query,
		QueryDocumentSnapshot
	} from 'firebase/firestore';
	import Patch from '$lib/components/Patch.svelte';

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
			} else {
				err = 'Patch does not exist';
			}
		})
		.catch((e) => {
			err = 'Error retrieving patch';
		});
</script>

<div class="container">
	{#if !err && patch}
		<Patch
			name={patch.data.name}
			patch={patch.data.patch}
			description={patch.data.description}
			id={patch.id}
			limit={400}
		/>
	{:else}
		<div class="err">{err}</div>
	{/if}
</div>

<style>
	.container {
		display: grid;
		grid-template-rows: auto auto;
		gap: 0.5em;
	}
	.err {
		font-size: 2rem;
	}
</style>
