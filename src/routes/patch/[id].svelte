<script context="module">
	export async function load({ page }) {
		return {
			props: { id: page.params.id }
		};
	}
</script>

<script>
	import { doc, getDoc, getFirestore } from 'firebase/firestore';
	import Patch from '$lib/components/Patch.svelte';

	export let id;
	let err = '';
	let patch = null;

	const db = getFirestore();
	const ref = doc(db, 'patches', id);
	getDoc(ref)
		.then((p) => {
			if (p.exists()) {
				patch = {
					id: p.id,
					data: p.data()
				};
			} else {
				err = 'Patch does not exist';
			}
		})
		.catch((e) => {
			err = 'Error retrieving patch';
		});
</script>

{#if !err && patch}
	<Patch
		name={patch.data.name}
		patch={patch.data.patch}
		description={patch.description}
		id={patch.id}
	/>
{:else}
	<div class="err">{err}</div>
{/if}

<style>
	.err {
		font-size: 2rem;
	}
</style>
