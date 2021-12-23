<script>
	import { createUserWithEmailAndPassword } from 'firebase/auth';
	import { auth } from '$lib/app';
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';

	export let email;
	export let password;
	export let error;

	const errors = {
		'auth/email-already-in-use': 'Account already exists',
		'auth/weak-password': 'Password is too weak',
		'auth/internal-error': 'E-mail or password are invalid',
		'auth/invalid-email': 'E-mail is invalid'
	};

	const createAccount = () => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				console.log('account created');
				goto('/');
			})
			.catch((err) => {
				const code = err.code;
				console.log(code, err.message);
				error = errors[code];
			});
	};
</script>

<button transition:fade on:click={createAccount}>Create Account</button>
