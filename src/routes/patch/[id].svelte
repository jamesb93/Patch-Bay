<script context="module">
	export const ssr = false;

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

<div class="container">
{#if !err && patch}
	<Patch
		name={patch.data.name}
		patch={patch.data.patch}
		description={patch.description}
		id={patch.id}
		limit={280}
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
