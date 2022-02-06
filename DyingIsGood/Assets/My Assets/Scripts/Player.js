var moveSpeed : float = 0.25;
var stopFriction : float = 0.8;
var jumpSpeed : float = 5;
var groundDistance : float = 0.5;
var walkingSprites : Sprite[];
var jumpSprite : Sprite;
var aliveSprite : Sprite;
var deadSprite : Sprite;
var deadClip : AudioClip;
var stairStepHeight : float = 0.1f;
var stepUpHeight : float = 0.5;
var touchingIce : boolean = false;
private var colGrounded : boolean = false;
private var grounded : boolean = false;
private var privTimer : float = 0;
private var spriteIndex : int = 0;
private var newFrame : boolean = false;
private var myScale : Vector3 = Vector3.zero;
function Movement(){
	if(this.GetComponent(Rigidbody2D).gravityScale != 0){
		this.GetComponent(Rigidbody2D).velocity = Vector2(this.GetComponent(Rigidbody2D).velocity.x+Input.GetAxis("Horizontal")*moveSpeed*Time.deltaTime*125,this.GetComponent(Rigidbody2D).velocity.y);
	}
	else{
		this.GetComponent(Rigidbody2D).velocity = Vector2(this.GetComponent(Rigidbody2D).velocity.x+Input.GetAxis("Horizontal")*moveSpeed*Time.deltaTime*125,this.GetComponent(Rigidbody2D).velocity.y+Input.GetAxis("Vertical")*moveSpeed*Time.deltaTime*125);
	}
}
function Friction(){
	this.GetComponent(Rigidbody2D).velocity.x *= stopFriction;
	if(this.GetComponent(Rigidbody2D).gravityScale == 0){
		this.GetComponent(Rigidbody2D).velocity.y *= stopFriction;
	}
}
function groundCheck(){
	var hit : RaycastHit2D = Physics2D.Raycast(this.transform.position,-Vector2.up,groundDistance);
	var behindTrans = this.transform.position;
	behindTrans.x-=0.25;
	var forwardTrans = this.transform.position;
	forwardTrans.x+=0.25;
	var DebugVector2 = -Vector2.up;
	var DebugVector3 = -Vector3.up;
	var DebugVector1 = -Vector3.up;
	var hit2 : RaycastHit2D = Physics2D.Raycast(behindTrans,-Vector2.up,groundDistance);
	var hit3 : RaycastHit2D = Physics2D.Raycast(forwardTrans,-Vector2.up,groundDistance);
	if(hit.collider!= null){ //Debug purposes
		DebugVector1.y = hit.distance;
		Debug.DrawRay(this.transform.position,-DebugVector1,Color.blue,0);
	}
	if(hit2.collider!= null){
		DebugVector2.y = hit2.distance;
		Debug.DrawRay(behindTrans,-DebugVector2,Color.red,0);
	}
	if(hit3.collider!= null){
		DebugVector3.y = hit3.distance;
		Debug.DrawRay(forwardTrans,-DebugVector3,Color.green,0);
	}
	if(hit.collider != null && hit.collider.tag != "Enemy"||hit2.collider != null && hit2.collider.tag != "Enemy"||hit3.collider != null && hit3.collider.tag != "Enemy"){
		return true;
		Debug.Log("True!");
		grounded = true;
	}
	else{
		if(colGrounded == true){
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
	this.gameObject.tag = "DeadCharacter";
	this.enabled = false;
	if(PlayerPrefs.GetInt("Campaign") == 1){
		PlayerPrefs.SetInt("PlayerDeaths",PlayerPrefs.GetInt("PlayerDeaths")+1);
		PlayerPrefs.Save();
	}
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
	if(this.transform.parent == null){
		if(Input.GetAxis("Horizontal") > 0){
			this.transform.localScale.x = 1;
		}
		if(Input.GetAxis("Horizontal") < 0){
			this.transform.localScale.x = -1;
		}
	}
	else{
		if(myScale == Vector3.zero){
			myScale = this.transform.localScale;
		}
		if(Input.GetAxis("Horizontal") > 0){
			this.transform.localScale.x = myScale.x;
		}
		if(Input.GetAxis("Horizontal") < 0){
			this.transform.localScale.x = -myScale.x;
		}
	}
}
function resetSprite(){
	this.GetComponent(SpriteRenderer).sprite = aliveSprite;
	if(!groundCheck()){
		this.GetComponent(SpriteRenderer).sprite = jumpSprite;
	}
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
	if(touchingIce != true){
		Friction(); //So it's not framerate dependant
	}
}
function OnCollisionEnter2D(coll: Collision2D) {
	if(coll.contacts[0].point.y > this.transform.position.y-stepUpHeight && groundCheck() == true && coll.contacts[0].normal.y <= 0.1 ){
		this.transform.position.y+=stairStepHeight;
		//Debug.Log("Normal is: "+coll.contacts[0].normal.y+". point is: "+coll.contacts[0].point.y+". Player y is: "+this.transform.position.y);
	}
}
function OnCollisionExit2D(coll2: Collision2D) {
	colGrounded = false;
}
function OnCollisionStay2D(coll2: Collision2D) {
	if(coll2.collider.tag == "Block" && coll2.collider.transform.position.y < this.transform.position.y && coll2.contacts[0].normal.y >= 0.1){
		colGrounded = true;
	}
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