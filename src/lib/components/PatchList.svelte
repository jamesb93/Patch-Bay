<script lang="ts">
	import type { PatchObject } from '$lib/types';
	import Patch from '$lib/components/Patch.svelte';

	export let patches: Array<PatchObject> = [];
</script>

<div class="patchList">
	{#each patches as obj}
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
