<script>
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<main class="container">
	<Header />
	<slot />
	<Footer />
</main>

<style>
	.container {
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: min(100%, 70ch);
		margin: 0 auto;
	}
</style>
