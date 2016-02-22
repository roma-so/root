<roma class={ user: true, 'boom' : this.gum } >
  <img  title="Me walking with cat" src="/me.png"/>
  <div class="kitty_eyes"></div>
  <img class="whistle" src="/whistle.png"/>
  <img class="bubble" onclick={bubble} src="/bubble.png"/>
  
  <script>
    this.bubble = (evt) => {
      this.gum = true
    };
  </script>
</roma>
