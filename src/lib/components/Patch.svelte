<script>
	import { browser } from '$app/env';

	export let name = '';
	export let patch = '';
	export let description = '';
	export let id = '';
	export let limit = 60;

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
	<code class="code">{patch.slice(0, limit)}</code>
	<div class="description">{description || 'untitled'}</div>
</div>

<style>
	.patch {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		padding: 0.5em;
		border: 1px solid grey;
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

	.copy {
		width: max-content;
	}
</style>
