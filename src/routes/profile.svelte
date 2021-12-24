<script>
	import Patch from '$lib/components/Patch.svelte';
	import { collection, query, where, getDocs, getFirestore } from 'firebase/firestore';
	import { user } from '$lib/app';

	const db = getFirestore();
	let patchList = [];
	let gate = true; // debounce the reactivity of $user

	$: {
		if ($user && $user.uid && gate) {
			gate = false;
			const q = query(collection(db, 'patches'), where('user', '==', $user.uid));
			getDocs(q).then((docs) => {
				docs.forEach((doc) => {
					const patch = {
						id: doc.id,
						data: doc.data()
					};
					patchList.push(patch);
				});
				patchList = patchList; // Trigger svelte reactivity 🙄
			});
		}
	}
</script>

<h3>My Patches</h3>
<div class="patchList">
	{#each patchList as obj}
		<Patch
			name={obj.data.name}
			patch={obj.data.patch}
			description={obj.data.description}
			id={obj.id}
		/>
	{/each}
</div>

<style>
	.patchList {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}
</style>
