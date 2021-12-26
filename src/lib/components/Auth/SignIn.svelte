<script lang="ts">
	import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
	import { auth, user } from '$lib/app';
	import { goto } from '$app/navigation';

	export let email: string = '';
	export let password: string = '';
	export let error: string = '';

	const errors = {
		'auth/user-not-found': 'User not found',
		'auth/wrong-password': 'Password is incorrect'
	};

	const signUserIn = () => {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				error = '';
				goto('/');
			})
			.catch((e) => {
				error = errors[e.code];
			});
	};

	const signUserOut = () => {
		signOut(auth)
			.then(() => {
				console.log('user signed out');
			})
			.catch((e) => {
				error = e.message;
			});
	};
</script>

<button
	on:click={() => {
		if ($user) {
			signUserOut();
		} else {
			signUserIn();
		}
	}}
>
	{#if $user}
		Sign Out
	{:else}
		Sign In
	{/if}
</button>
