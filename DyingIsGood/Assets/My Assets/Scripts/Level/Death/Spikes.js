var sliceSound : AudioClip;
function OnTriggerEnter2D(otherobj : Collider2D){
	if(otherobj.tag == "Deletor"){
		Destroy(this.gameObject);
		Destroy(otherobj.gameObject,0.01);
	}
	if(otherobj.tag == "Player"||otherobj.tag == "Enemy"){
		otherobj.BroadcastMessage("Die");
		this.GetComponent(AudioSource).clip = sliceSound;
		this.GetComponent(AudioSource).Play();
	}
}