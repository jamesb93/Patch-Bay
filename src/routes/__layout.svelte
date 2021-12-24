<script>
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<Header />
<main class="container">
	<slot />
	<Footer />
</main>

<style>
	.container {
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: min(100%, 65ch);
		margin: 0 auto;
	}
</style>
