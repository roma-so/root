var GenerateEarth = function(obj){

if (typeof(obj) === 'undefined') return

	var geometry = obj.geo;
	var segments = obj.segments;
	var smoothingFactor = obj.smooth;

	var terrain = [];
	for(var i = 0; i <= segments; i++) {
		terrain[i] = new Array();
		for(var j = 0; j <= segments; j++) {
			terrain[i][j] = 0;
		}
	}

	var size = segments+1;
	for(var length = segments; length >= 2; length /= 2) {
		var half = length/2;
		smoothingFactor /= 2;

		// generate the new square values
		for(var x = 0; x < segments; x += length) {
			for(var y = 0; y < segments; y += length) {
				var average = terrain[x][y]+ // top left
				terrain[x+length][y]+ // top right
				terrain[x][y+length]+ // lower left
				terrain[x+length][y+length]; // lower right
				average /= 4;
				average += 2*smoothingFactor*Math.random()-smoothingFactor;
				terrain[x+half][y+half] = average;
			}
		}

		// generate the diamond values
		for(var x = 0; x < segments; x += half) {
			for(var y = (x+half)%length; y < segments; y += length) {
				var average = terrain[(x-half+size)%size][y]+ // middle left
						terrain[(x+half)%size][y]+ // middle right
						terrain[x][(y+half)%size]+ // middle top
						terrain[x][(y-half+size)%size]; // middle bottom
				average /= 4;
				average += 2*smoothingFactor*Math.random()-smoothingFactor;

				terrain[x][y] = average;

				// values on the top and right edges
				if(x === 0)
					terrain[segments][y] = average;
				if(y === 0)
					terrain[x][segments] = average;
			}
		}
	}

	var index = 0;

	for(var i = 0; i <= segments; i++) {
		for(var j = 0; j <= segments; j++) {
			geometry.vertices[index].z = terrain[i][j];
			index++;
		}
	}

	return geometry
}

export default GenerateEarth;
