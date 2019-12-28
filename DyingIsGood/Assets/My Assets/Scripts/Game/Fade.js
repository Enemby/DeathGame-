var fadeTarget : float = 0.8;
var fadeSpeed : float = 0.01;
function FixedUpdate(){
	if(this.GetComponent(SpriteRenderer).color.a < fadeTarget){
		this.GetComponent(SpriteRenderer).color.a+=fadeSpeed;
	}
	if(this.GetComponent(SpriteRenderer).color.a > fadeTarget){
		this.GetComponent(SpriteRenderer).color.a = fadeTarget;
	}
}