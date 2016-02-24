'use strict'

function Navigation(params){
	if ( typeof(params) === 'undefined' ) return
	var _this = this;

	this.block= params.block;

	this.init();

	this.addBrunch();


	function animate() {
		requestAnimationFrame( animate );
		_this.draw();
	}

	animate();
}


Navigation.prototype.init= function(){
	var _this= this;

	this.scene= new THREE.Scene();
	this.camera= new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
	this.camera.z=1;

	this.branch = {};
	this.mouse= new THREE.Vector2();
	this.INTERSECTED;
	this.explosion = false;

	this.raycaster= new THREE.Raycaster();

	this.setLight();
	this.setRender();


	window.addEventListener( 'resize', function(event){
    	_this.onWindowResize(event, _this);
	}, false);

	document.addEventListener( 'mousemove', function(event){
    	_this.onDocumentMouseMove(event, _this.mouse);
	}, false);

	document.addEventListener( 'click', function(event){
    	_this.onDocumentMouseClick(event, _this);
	}, false);
}

Navigation.prototype.onDocumentMouseMove = function( event, mouse ) {

	event.preventDefault();

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

Navigation.prototype.onDocumentMouseClick = function( event, _this ) {

	_this.whatAboutHover = _this.checkHover();

	if(_this.whatAboutHover) {
		_this.explosion = true;
		_this.BYE = _this.intersects[ 0 ].object;
	}
}

Navigation.prototype.onWindowResize = function( event, _this ) {

	_this.camera.aspect = window.innerWidth / window.innerHeight;
	_this.camera.updateProjectionMatrix();

	_this.renderer.setSize( window.innerWidth, window.innerHeight );

}

Navigation.prototype.addBrunch= function(x,y){
	var _this= this;

	this.geometry = new THREE.BoxGeometry( 10, 3, 5 );
	this.texture = THREE.ImageUtils.loadTexture('projects.png', {}, function() {
		_this.renderer.render(_this.scene, _this.camera);
	});
	this.material =  new THREE.MeshBasicMaterial({map: this.texture}),

	this.cube = new THREE.Mesh( this.geometry, this.material );

	this.cube.castShadow = true;
	this.cube.receiveShadow = true;

	this.scene.add( this.cube );

	this.camera.position.set(10,10, 20);

	this.cube.rotation.x= -.3;
	this.cube.rotation.y= -.1;

	this.cube.position.x= 8;
	this.cube.position.y= 10;
	this.cube.position.z = 0;

}

Navigation.prototype.setLight= function(){
	this.light = new THREE.SpotLight( 0xcccccc, 1 );
	this.light.position.set( 1000, 250, 1000 );
	this.light.castShadow = true;

	this.light.shadowCameraNear = 200;
	this.light.shadowCameraFar = this.camera.far;
	this.light.shadowCameraFov = 50;

	this.light.shadowBias = -0.00022;

	this.light.shadowMapWidth = 2048;
	this.light.shadowMapHeight = 2048;

	this.scene.add( this.light );
}

Navigation.prototype.setRender= function(){
	this.renderer = new THREE.WebGLRenderer();
	this.renderer.setSize( window.innerWidth, window.innerHeight );
	this.renderer.setClearColor( 0x90ad9b );
	this.block.appendChild( this.renderer.domElement );
}

Navigation.prototype.checkHover= function(){
	if ( this.intersects.length > 0 ) {

		this.block.style.cursor = "pointer";

		this.INTERSECTED = this.intersects[ 0 ].object;
		return true

	}  else this.INTERSECTED = null;

	return false
}

Navigation.prototype.draw= function(){
	this.camera.updateMatrixWorld();

	this.raycaster.setFromCamera( this.mouse, this.camera );

	this.intersects = this.raycaster.intersectObjects( this.scene.children );
	this.block.style.cursor = "auto";

	this.whatAboutHover = this.checkHover();

	if(this.whatAboutHover && !this.explosion) {
		this.INTERSECTED.currentRotation = this.INTERSECTED.rotation.x;
		this.INTERSECTED.rotation.x= this.INTERSECTED.currentRotation + .05;
	}

	if(this.explosion){
		this.BYE.currentPosition = this.BYE.position.z;
		if(this.BYE.currentPosition < -150) {
			this.explosion = false;
			this.BYE.visible = false;
			riot.route('projects')
		}
		this.BYE.position.z= this.BYE.currentPosition - 2;

		this.BYE.currentRotation = this.BYE.rotation.x;
		this.BYE.rotation.x= this.BYE.currentRotation + .2;
	}


	this.renderer.render( this.scene, this.camera );

}

module.exports = Navigation
