<script>
	import { goto } from '$app/navigation';
	import { browser } from '$app/env';

	export let name = '';
	export let patch = '';
	export let description = '';
	export let id = '';

	const copyPatch = () => {
		if (browser) {
			navigator.clipboard.writeText(patch);
		}
	};
</script>

<div class="patch">
	<div class="top">
		<a href={`/patch/${id}`} class="name">{name || 'untitled'}</a>
		<button on:click={copyPatch} class="copy">copy</button>
	</div>
	<code class="code">{patch.slice(0, 60)}</code>
	<div class="description">{description || 'untitled'}</div>
</div>

<style>
	.patch {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 1em;
		padding: 1em;
		border: 1px solid grey;
		min-width: 40ch;
	}

	.top {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.name {
		font-weight: bold;
		text-decoration: underline;
		font-size: 1.1rem;
	}

	.code {
		color: grey;
	}

	.copy {
		width: max-content;
	}
</style>
