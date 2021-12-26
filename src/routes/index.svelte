<script lang="ts">
	import type { PatchObject } from '$lib/types';
	import PatchList from '$lib/components/PatchList.svelte';
	import { collection, getDocs, getFirestore } from 'firebase/firestore';

	const db = getFirestore();
	let patchList: Array<PatchObject> = [];

	getDocs(collection(db, 'patches')).then((query) => {
		query.forEach((d) => {
			const data = d.data();
			patchList.push({
				id: d.id,
				data: {
					name: data.name,
					description: data.description,
					patch: data.patch
				}
			});
		});
		patchList = patchList; // Trigger svelte reactivity 🙄
	});
</script>

<h3>Latest Patches</h3>
<PatchList patches={patchList} />
