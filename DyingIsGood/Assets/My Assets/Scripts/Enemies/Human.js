var moveForce : float = 5;
var jumpForce : float = 10;
var randomDirectionBool : boolean = false;
var deadClip : AudioClip;
var timer : float = 0;
function randomColor(){
	var myRenderer = this.GetComponent(SpriteRenderer);
	var myColor = Random.Range(0.2,1);
	myRenderer.color.r = myColor;
	myRenderer.color.g = myColor;
	myRenderer.color.b = myColor;
}
function randomDirection(){
	if(randomDirectionBool == true){
		var myRand = Random.RandomRange(-1,1);
		if(myRand < 0){
			moveForce = -moveForce; //otherwise, do nothing
		}
	}
}
function checkStuck(){
	var oldPosition = this.transform.position;
	yield WaitForSeconds(0.2);
	if(Vector2.Distance(oldPosition,this.transform.position) <= 0.1){
		randomDirection();
	}
}
function Movement(){
	this.GetComponent(Rigidbody2D).velocity = Vector2(this.GetComponent(Rigidbody2D).velocity.x+moveForce,this.GetComponent(Rigidbody2D).velocity.y);
}
function Friction(){
	this.GetComponent(Rigidbody2D).velocity.x *= 0.8;
}
function Start(){
	randomColor();
	randomDirection();
}
function Die(){
	this.GetComponent(Rigidbody2D).fixedAngle = false;
	//this.GetComponent(SpriteRenderer).sprite = deadSprite;
	this.transform.rotation.eulerAngles.z = 90;
	this.GetComponent(SpriteRenderer).sortingOrder = -1;
	this.GetComponent(AudioSource).clip = deadClip;
	this.GetComponent(AudioSource).pitch = Random.Range(0.9,1.1);
	this.GetComponent(AudioSource).Play();
	this.gameObject.tag = "Untagged";
	//Destroy(this.gameObject,0.4);
	this.enabled = false;
}
function Revive(){
	this.GetComponent(Rigidbody2D).fixedAngle = true;
	//this.GetComponent(SpriteRenderer).sprite = deadSprite;
	this.transform.rotation.eulerAngles.z = 0;
	this.GetComponent(SpriteRenderer).sortingOrder = 0;
	//this.GetComponent(AudioSource).clip = deadClip;
	//this.GetComponent(AudioSource).pitch = Random.Range(0.9,1.1);
	//this.GetComponent(AudioSource).Play();
	this.gameObject.tag = "Enemy";
	//Destroy(this.gameObject,0.4);
	this.enabled = true;
}
function FixedUpdate(){
	timer+=Time.deltaTime;
	Friction();
	Movement();
	if(timer >= 0.3){
		checkStuck();
		timer = 0;
	}
}