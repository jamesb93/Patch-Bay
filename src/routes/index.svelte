<script>
	import Patch from '$lib/components/Patch.svelte';
	import { collection, getDocs, getFirestore } from 'firebase/firestore';


	const db = getFirestore();
	let patchList = [];

	getDocs(collection(db, 'patches')).then((query) => {
		query.forEach((d) => {
			patchList.push({
				id: d.id,
				data: d.data()
			});
		});
		patchList = patchList; // Trigger svelte reactivity 🙄
	});
</script>

<h2>Latest Patches</h2>
<div class="patchList">
	{#each patchList.slice(0, 30) as obj}
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
