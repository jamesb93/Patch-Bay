<script>
	import { auth, user } from '$lib/app';
	import {
		createUserWithEmailAndPassword,
		signInWithEmailAndPassword,
		signOut
	} from 'firebase/auth';
	import SignIn from '$lib/components/SignIn.svelte';

	const createAccount = () => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				console.log('account created');
			})
			.catch((err) => {
				console.log('There was an error!!!');
				const code = err.code;
				console.log(code);
				if (code === 'auth/email-already-in-use') {
					console.log('User already exists');
				}

				if (code === 'auth/weak-password') {
					console.log('password is too weak.');
				}
			});
	};

	let email = 'test@foo.xyz';
	let password = 'foobles';
</script>

<div class="auth">
	<input bind:value={email} placeholder="Enter your e-mail" />
	<input bind:value={password} placeholder="Enter a password" />
	<button on:click={createAccount}>Create Account</button>
	{#if $user}
		<button
			on:click={() => {
				signOut(auth)
					.then(() => {
						console.log('user signed out');
					})
					.catch((e) => {
						console.log('Sign out error:', e.code, e.message);
					});
			}}>Sign Out</button
		>
	{:else}
		<SignIn />
	{/if}
	<div class="authstatus">
		{#if $user}
			User is signed in to {$user.email}
		{:else}
			User is not signed in
		{/if}
	</div>
</div>

<style>
	.auth {
		display: flex;
		flex-direction: column;
		max-width: 200px;
		gap: 0.5em;
	}

	.auth > input {
		font-size: 1.5rem;
	}
</style>
