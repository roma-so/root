import Navigation from '../js/navigation.js';

<nav>
  <div id="nav"></div>

  <script>

  this.on('mount', function(){
    new Navigation({
      block: document.getElementById('nav')
    })
  })

  </script>
</nav>
