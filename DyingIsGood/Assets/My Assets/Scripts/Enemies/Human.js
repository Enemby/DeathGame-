var moveForce : float = 5;
var jumpForce : float = 5;
var walkingSprites : Sprite[];
var jumpSprite : Sprite;
var aliveSprite : Sprite;
private var privTimer : float = 0;
private var spriteIndex : int = 0;
private var newFrame : boolean = false;
var randomDirectionBool : boolean = false;
var deadClip : AudioClip;
var timer : float = 0;
var stairStepHeight : float = 0.15f;
var stepUpHeight : float = 0.49;
var skill : float = 0.5f; //Ability to jump on target
private var myScale : Vector3 = Vector3.zero;
var myRenderer : SpriteRenderer;
var touchingIce : boolean = false;
function randomColor(){
	var myRenderer = this.GetComponent(SpriteRenderer);
	var myColor : Color;
	myColor.r = Random.Range(0.6,1);
	myColor.g = Random.Range(0.6,1);
	myColor.b = Random.Range(0.2,1);
	myColor.a = 1;
	myRenderer.color = myColor;
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
function jumpLogic(){
	var myTransform = this.transform.position;
	if(moveForce > 0){
		myTransform.x += skill;
	}
	else{
		myTransform.x -= skill;
	}
	var hit : RaycastHit2D = Physics2D.Raycast(myTransform,-Vector2.up,0.5);
	var hit2 : RaycastHit2D = Physics2D.Raycast(this.transform.position,-Vector2.up,0.5);
	if(hit.collider == null && hit2.collider != null &&hit2.collider.tag != "Enemy" &&hit2.collider.tag == "Block"){
		Jump(); //We don't see ground! better jump!
	}
}
function Movement(){
	this.GetComponent(Rigidbody2D).velocity = Vector2(this.GetComponent(Rigidbody2D).velocity.x+moveForce*Time.deltaTime*250,this.GetComponent(Rigidbody2D).velocity.y);
	jumpLogic();
}
function Friction(){
	this.GetComponent(Rigidbody2D).velocity.x *= 0.8;
}
function Start(){
	randomColor();
	randomDirection();
	skill = Random.Range(0.1,0.7);
	myRenderer = this.GetComponent(SpriteRenderer);
}
function Jump(){
	if(this.GetComponent(Rigidbody2D).velocity.y <= 0.1){ //Lazy ground check
		this.GetComponent(Rigidbody2D).velocity.y = jumpForce;
	}
}
function Die(){
	this.GetComponent(Rigidbody2D).fixedAngle = false;
	//this.GetComponent(SpriteRenderer).sprite = deadSprite;
	this.transform.rotation.eulerAngles.z = 90;
	this.GetComponent(SpriteRenderer).sortingOrder = -1;
	this.GetComponent(AudioSource).clip = deadClip;
	this.GetComponent(AudioSource).pitch = Random.Range(0.9,1.1);
	this.GetComponent(AudioSource).Play();
	this.gameObject.tag = "DeadCharacter";
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
	this.enabled = true;
}
function iterateWalkSprites(){
	if(newFrame == true){
		spriteIndex += 1;
		newFrame = false;
	}
	if(spriteIndex > walkingSprites.Length-1){
		spriteIndex = 0;
	}
	myRenderer.sprite = walkingSprites[spriteIndex];
	if(this.transform.parent == null){
		if(moveForce > 0){
			this.transform.localScale.x = 1;
		}
		if(moveForce < 0){
			this.transform.localScale.x = -1;
		}
	}
	else{
		if(myScale == Vector3.zero){
			myScale = this.transform.localScale;
		}
		if(moveForce > 0){
			this.transform.localScale.x = myScale.x;
		}
		if(moveForce < 0){
			this.transform.localScale.x = -myScale.x;
		}
	}
}
function spriteTimer(){
	privTimer+=Time.deltaTime;
	if(privTimer > 0.25){
		privTimer = 0;
		newFrame = true;
	}
}
function FixedUpdate(){
	timer+=Time.deltaTime;
	if(touchingIce != true){
		Friction();
	}
	Movement();
	if(timer >= 0.3){
		checkStuck();
		timer = 0;
	}
	var hit3 : RaycastHit2D = Physics2D.Raycast(this.transform.position,-Vector2.up,0.5);
	if(this.tag != "DeadCharacter"){
		if(hit3.collider != null){
			iterateWalkSprites();
		}
		else{
			myRenderer.sprite = jumpSprite;
		}
	}
	spriteTimer();
}
function OnCollisionEnter2D(coll: Collision2D) {
	if(coll.contacts[0].point.y > this.transform.position.y-stepUpHeight && coll.contacts[0].normal.y != 1 ){
		this.transform.position.y+=stairStepHeight;
		//Debug.Log("Normal is: "+coll.contacts[0].normal.y+". point is: "+coll.contacts[0].point.y+". Player y is: "+this.transform.position.y);
	}
}
function OnCollisionStay2D(coll2: Collision2D) {
	if(coll2.gameObject.tag == "Ice"){
		touchingIce = true;
	}
	else{
		touchingIce = false;
	}
}
function NoGravity(){
	this.GetComponent(Rigidbody2D).gravityScale = 0;
}