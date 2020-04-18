var moveSpeed : float = 0.25;
var stopFriction : float = 0.8;
var jumpSpeed : float = 5;
var groundDistance : float = 0.5;
var walkingSprites : Sprite[];
var aliveSprite : Sprite;
var deadSprite : Sprite;
var deadClip : AudioClip;
private var grounded : boolean = false;
private var privTimer : float = 0;
private var spriteIndex : int = 0;
private var newFrame : boolean = false;
function Movement(){
	this.GetComponent(Rigidbody2D).velocity = Vector2(this.GetComponent(Rigidbody2D).velocity.x+Input.GetAxis("Horizontal")*moveSpeed*4,this.GetComponent(Rigidbody2D).velocity.y);
}
function Friction(){
	this.GetComponent(Rigidbody2D).velocity.x *= stopFriction;
}
function groundCheck(){
	var hit : RaycastHit2D = Physics2D.Raycast(this.transform.position,-Vector2.up,groundDistance);
	if(hit.collider != null){
		return true;
		Debug.Log("True!");
		grounded = true;
	}
	else{
		return false;
		Debug.Log("False!");
		grounded = false;
	}
}
function Jump(){
	if(this.GetComponent(Rigidbody2D).velocity.y <= 0.1){ //Lazy ground check
		this.GetComponent(Rigidbody2D).velocity.y = jumpSpeed;
	}
}
function Revive(){
	this.GetComponent(Rigidbody2D).fixedAngle = true;
	this.GetComponent(SpriteRenderer).sprite = aliveSprite;
	this.transform.rotation.eulerAngles.z = 0;
	this.GetComponent(SpriteRenderer).sortingOrder = 1;
	//this.GetComponent(AudioSource).clip = deadClip;
	//this.GetComponent(AudioSource).Play();
	this.gameObject.tag = "Player";
	this.enabled = true;
}
function Die(){
	this.GetComponent(Rigidbody2D).fixedAngle = false;
	this.GetComponent(SpriteRenderer).sprite = deadSprite;
	this.transform.rotation.eulerAngles.z = 90;
	this.GetComponent(SpriteRenderer).sortingOrder = -1;
	this.GetComponent(AudioSource).clip = deadClip;
	this.GetComponent(AudioSource).Play();
	this.gameObject.tag = "Untagged";
	this.enabled = false;
}
function iterateWalkSprites(){
	if(newFrame == true){
		spriteIndex += 1;
		newFrame = false;
	}
	if(spriteIndex > walkingSprites.Length-1){
		spriteIndex = 0;
	}
	this.GetComponent(SpriteRenderer).sprite = walkingSprites[spriteIndex];
	if(Input.GetAxis("Horizontal") > 0){
		this.transform.localScale.x = 1;
	}
	if(Input.GetAxis("Horizontal") < 0){
		this.transform.localScale.x = -1;
	}
}
function resetSprite(){
	this.GetComponent(SpriteRenderer).sprite = aliveSprite;
}
function spriteTimer(){
	privTimer+=Time.deltaTime;
	if(privTimer > 0.3){
		privTimer = 0;
		newFrame = true;
	}
}
function Update(){
	Movement();
	if(Input.GetAxis("Horizontal") != 0 && groundCheck() == true){
		iterateWalkSprites();
	}
	else{
		resetSprite();
	}
	if(Input.GetButton("Jump") && groundCheck() == true){
		Jump();
	}
	spriteTimer();
}
function FixedUpdate(){
	Friction(); //So it's not framerate dependant
}