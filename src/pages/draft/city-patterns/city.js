import './city.libs.min.js'
import GenerateEarth from'./generateEarth.js'

'use strict'

function Pattern(params){
	if ( typeof(params) === 'undefined' ) return
	var _this= this;

	this.block= params.block;

	this.init();

	for(var z=0; z < 10; z++){
		for(var x= 0; x < 10; x++){
			this.CreateElement(x, z);
		}
	}
	this.AddSky();
	this.camera.position.set(0, 0, 80);

	this.AddEarth();

	

	function animate() {
		requestAnimationFrame( animate );
		_this.draw();
	}

	animate();
	
}


Pattern.prototype.init= function(){

	this.scene= new THREE.Scene();
	this.camera= new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 2000000 );
	this.camera.z=10;

	this.building = {};
	this.buildingTypes();

	this.building.maxSize = 10;

	this.setControls();
	this.setLight();
	
	this.setRender();
	


}


Pattern.prototype.buildingTypes = function(){

	this.building.types = [
		{
			img:'houses/house.jpg',
			height: 2,
			width: 2
		},

		{
			img:'houses/house_2.jpg',
			height: 2,
			width: 2
		},

		{
			img:'houses/house_3.jpg',
			height: 2,
			width: 2
		},

		{
			img:'houses/house_4.jpg',
			height: 2,
			width: 2
		},

		{
			img:'houses/house_5.jpg',
			height: 2,
			width: 2
		},

		{
			img:'houses/house_6.jpg',
			height: 2,
			width: 2
		}

	]
}

Pattern.prototype.setControls= function(){

	this.controls = new THREE.TrackballControls( this.camera );
	this.controls.rotateSpeed = 1.0;
	this.controls.zoomSpeed = 1.2;
	this.controls.panSpeed = 0.8;
	this.controls.noZoom = false;
	this.controls.noPan = false;
	this.controls.staticMoving = true;
	this.controls.dynamicDampingFactor = 0.3;
}

Pattern.prototype.setLight= function(){
	this.light = new THREE.SpotLight( 0xff630f, 8 );
	this.light.position.set( -1000, 1000, 500 );
	this.light.castShadow = true;

	this.light.shadowCameraNear = 1;
	this.light.shadowCameraFar = 1;
	this.light.shadowCameraFov = 5;

	this.light.shadowBias = -0.00022;

	this.light.shadowMapWidth = 2048;
	this.light.shadowMapHeight = 2048;

	this.scene.add( this.light );
}

Pattern.prototype.setRender= function(){
	this.renderer = new THREE.WebGLRenderer();
	this.renderer.setPixelRatio( window.devicePixelRatio );
	this.renderer.setSize( window.innerWidth, window.innerHeight );
	this.renderer.setClearColor( 0xffffff );
	this.block.appendChild( this.renderer.domElement );
}



Pattern.prototype.CreateElement= function(x,z){

	this.building.prevX=  this.building.randomX;
	this.building.prevZ= this.building.randomZ;

	this.building.randomX=  Math.random() * this.building.maxSize + 2;
	this.building.randomZ= Math.random() * this.building.maxSize + 5;
	this.building.randomFloors= Math.random() * this.building.maxSize + 1;
	this.building.color = (Math.random() * this.building.maxSize + 1) * 250000;

	

	this.building.textureType = this.building.types[Math.floor(Math.random() * this.building.types.length)];

	this.AddElement({
		boxx: this.building.randomX/2, 
		boxy: this.building.randomZ/2,
		boxz: this.building.randomFloors,
		x: x * this.building.prevX * 2,
		y: 0,
		z: z * this.building.prevZ * 2,
		color: 0xffffff,
		texture: this.building.textureType
	});
}


Pattern.prototype.AddSky= function(){
	this.sky = new THREE.Sky();
	this.scene.add( this.sky.mesh );

	this.sunSphere = new THREE.Mesh(
		new THREE.SphereBufferGeometry( 20000, 16, 8 ),
		new THREE.MeshBasicMaterial( { color: 0xffffff } )
	);
	this.sunSphere.position.y = - 70000;
	this.sunSphere.visible = true;
	this.scene.add( this.sunSphere );
	var distance = 4000;

	var uniforms = this.sky.uniforms;
	uniforms.turbidity.value = 10;
	uniforms.reileigh.value = 2;
	uniforms.luminance.value = .25;
	uniforms.mieCoefficient.value = 0.05;
	uniforms.mieDirectionalG.value = 0.8;

	var theta = Math.PI * ( .5 );
	var phi = 2 * Math.PI * ( -0.5 );

	this.sunSphere.position.x = distance * Math.cos( phi );
	this.sunSphere.position.y = distance * Math.sin( phi ) * Math.sin( theta );
	this.sunSphere.position.z = distance * Math.sin( phi ) * Math.cos( theta );

	this.sunSphere.visible = ! true;

	this.sky.uniforms.sunPosition.value.copy( this.sunSphere.position );
}


Pattern.prototype.AddEarth= function(){

	this.Earth = {};
	this.Earth.color = new THREE.Color("rgb(0, 84, 31)");

	this.width = 1000;
	this.height = 1000;
	this.segments = 64;
	this.smoothingFactor = 100;
	this.terrain = new Array();
	var size = this.segments+1;

	this.geometry = new THREE.PlaneGeometry(
	    this.width,
	    this.height,
	    this.segments,
	    this.segments
	);

	this.geometry = GenerateEarth({
		geo:this.geometry,
		smooth: this.smoothingFactor,
		segments: this.segments
	})

	this.mesh = new THREE.Mesh(this.geometry, this.material);
	this.scene.add(this.mesh);


	this.setTexture({texture: {
			img:'i.jpg',
			height: 10,
			width: 10
		}});

	
	this.mesh.position.z = -1;
	this.geometry.rotateX(-1.55);



	this.AddElement({
		boxx: 10000000, 
		boxy: 10, 
		boxz: 10000000,
		x: 0,
		y: -11,
		z: 0,
		color: this.building.color,
		texture: {
			img:'i.jpg',
			height: 10000,
			width: 10000
		}
	});

	this.AmbientLight = new THREE.AmbientLight( 0xffffff, 2);
//	this.directionalLight.position.set( 0, 1, 0 );
	this.scene.add( this.AmbientLight );

}

Pattern.prototype.AddElement= function(object){
	this.geometry = new THREE.BoxGeometry(object.boxx, object.boxy, object.boxz);
	this.material =  new THREE.MeshLambertMaterial( { color: object.color, vertexColors: THREE.VertexColors } );
	this.cube = new THREE.Mesh( this.geometry, this.material );

	if ( object.texture ) {
		this.setTexture(object)
	}

	this.scene.add( this.cube );
	

	this.cube.position.x= object.x;
	this.cube.position.y= object.y;
	this.cube.position.z = object.z;
}

Pattern.prototype.setTexture = function(object){
	this.texture = new THREE.TextureLoader().load( object.texture.img );
	this.texture.repeat.set( object.texture.width, object.texture.height );
	this.texture.wrapS = THREE.RepeatWrapping;
	this.texture.wrapT = THREE.RepeatWrapping;
	this.texture.needsUpdate = true;
	this.material.map = this.texture;
	this.cube.geometry.colorsNeedUpdate = true;
}

Pattern.prototype.draw= function(){

	this.controls.update();
	this.renderer.render( this.scene, this.camera );
	
}


module.exports = Pattern