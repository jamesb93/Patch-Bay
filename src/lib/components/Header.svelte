<script>
	import { user, auth } from '$lib/app';
	import { signOut } from 'firebase/auth';
	import { goto } from '$app/navigation';

	const signUserOut = () => {
		signOut(auth)
			.then(() => {
				console.log('User signed out');
			})
			.catch((e) => {
				console.log(`User failed to sign out with error ${e.code}`);
			});
	};
</script>

<header>
	<a href="/" class="title">Patch Bay</a>
	<button on:click={() => goto('/submit')}>New Patch+</button>
	<div class="auth">
		{#if $user}
			<a href="/profile">{$user.email}</a>
			<button on:click={signUserOut}>Sign Out</button>
		{:else}
			<button on:click={() => goto('/auth')}>Login/Sign Up</button>
		{/if}
	</div>
</header>

<style>
	header {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		gap: 2em;
		width: 100%;
		padding: 1em;
		margin-bottom: 1em;
		border-bottom: 1px solid rgba(128, 128, 128, 0.54);
	}

	.auth {
		display: flex;
		flex-direction: row;
		gap: 1em;
	}
</style>
