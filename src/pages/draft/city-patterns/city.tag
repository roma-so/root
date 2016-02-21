import Pattern from './city.js'

import './index.css';

<city>
	<div class="content">
		<div id="city"></div>
	</div>

	this.on('mount', function(){

		new Pattern({
			block: document.getElementById('city'),
			population: 10000,
			density: 1000
		})
	})

	this.on('unmount', function(){

	})
</city>