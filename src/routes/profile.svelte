<script lang="ts">
	import type { PatchObject } from '$lib/types';
	import PatchList from '$lib/components/PatchList.svelte';
	import { collection, query, where, getDocs, getFirestore } from 'firebase/firestore';
	import { user } from '$lib/app';

	const db = getFirestore();

	let patchList: Array<PatchObject> = [];
	let gate: boolean = true; // debounce the reactivity of $user

	$: {
		if ($user && $user.uid && gate) {
			gate = false;
			const q = query(collection(db, 'patches'), where('user', '==', $user.uid));
			getDocs(q).then((docs) => {
				docs.forEach((doc) => {
					const data = doc.data();
					const patch = {
						id: doc.id,
						data: {
							name: data.name,
							description: data.description,
							patch: data.patch
						}
					};
					patchList.push(patch);
				});
				patchList = patchList; // Trigger svelte reactivity 🙄
			});
		}
	}
</script>

<h3>My Patches</h3>
<PatchList patches={patchList} />
