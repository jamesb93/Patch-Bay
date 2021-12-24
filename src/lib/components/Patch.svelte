<script>
	import { browser } from '$app/env';

	export let name = '';
	export let patch = '';
	export let description = '';
	export let id = '';
	export let limit = 60;

	const preview = patch.slice(0, limit)
		.replace('<code>', '')
		.replace('</code>', '')
		.replace('<pre>', '')
		.replace('</pre>', '')

	const copyPatch = () => {
		if (browser) {
			navigator.clipboard.writeText(patch);
		}
	};

	const copyLink = () => {
		if (browser) {
			navigator.clipboard.writeText(`https://shareapatchwith.me/patch/${id}`);
		}
	};
</script>

<div class="patch">
	<div class="top">
		<a href={`/patch/${id}`} class="name">{name || 'untitled'}</a>
		<div class="links">
			<button on:click={copyPatch} class="copy">copy text</button>
			<button on:click={copyLink}>copy link</button>
		</div>
	</div>
	<div class="code">
		{preview}
	</div>
	<div class="description">{description || 'no description'}</div>
</div>

<style>
	.patch {
		display: grid;
		grid-template-rows: auto auto auto;
		gap: 0.3em;
		padding: 0.5em;
		border: 1px solid grey;
		margin: 0 auto;
		min-width: 100%;
	}

	.top {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.name {
		font-weight: bold;
		text-decoration: underline;
	}

	.code {
		color: grey;
	}
</style>
