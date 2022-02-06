#pragma strict

function Start () {

}

function Update () {

}
function OnTriggerEnter2D(myobj: Collider2D){
	if(myobj.gameObject.tag == "Player"){
		if(PlayerPrefs.HasKey("MoneyLevel")){
			PlayerPrefs.SetInt("MoneyLevel",PlayerPrefs.GetInt("MoneyLevel")+100);
			PlayerPrefs.Save();
			Destroy(this.gameObject);
		}
		else{
			PlayerPrefs.SetInt("MoneyLevel",0);
			PlayerPrefs.Save();
		}
	}
	if(myobj.gameObject.tag == "Enemy"){
		Destroy(this.gameObject);
	}
}