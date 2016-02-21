import '../components/header.tag';
import '../components/footer.tag';

<home>
	<header></header>
	<div id="home" class="content">
		<section class={ user: true, 'boom' : this.gum } >
			<img  title="Me walking with cat" src="/me.png"/>
			<div class="kitty_eyes"></div>
			<img class="whistle" src="/whistle.png"/>
			<img class="bubble" onclick={bubble} src="/bubble.png"/>
		</section> 	
	</div>
	<footer></footer>

	<script>
		this.bubble = (evt) => {
			this.gum = true
		};
	</script>

</home>