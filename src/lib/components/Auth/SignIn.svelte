<!-- 
    This component handles signing in and signing out.
-->
<script>
	import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
	import { auth, user } from '$lib/app';
	import { goto } from '$app/navigation';

	export let email;
	export let password;
	export let error;

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
