<script lang="ts">
	import { user } from '$lib/app';
	import SignIn from '$lib/components/Auth/SignIn.svelte';
	import SignUp from '$lib/components/Auth/SignUp.svelte';

	let email: string = '';
	let password: string = '';
	let error: string = '';
</script>

<div class="auth">
	<input bind:value={email} placeholder="Enter your e-mail" />
	<input type="password" bind:value={password} placeholder="Enter a password" />

	{#if !$user}
		<SignUp bind:email bind:password bind:error />
	{/if}
	<SignIn bind:email bind:password bind:error />

	<div class="error">
		{error}
	</div>
</div>

<style>
	.auth {
		display: flex;
		flex-direction: column;
		place-items: center;
		width: 100%;
		justify-content: space-between;
		gap: 0.5em;
	}

	.auth > input {
		max-width: 20ch;
	}

	.error {
		color: red;
	}
</style>
