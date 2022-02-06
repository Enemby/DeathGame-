var mypref : String;
var expectedValue : int;
var loaded : boolean = false;
function Start(){
	if(PlayerPrefs.GetInt(mypref) == expectedValue){
		this.gameObject.active = false;
	}
}
function OnEnable(){
	if(loaded == true){ //This is a necessary workaround, since OnEnable is called on scene start, and the usual workaround (TimeSinceLevelLoad) is not functional in OnEnable in Unity5.
		PlayerPrefs.SetInt(mypref,1);
		PlayerPrefs.Save();
	}
	else{
		loaded = true;
	}
}
function OnDisable(){
	Debug.Log("Disabled");
	PlayerPrefs.SetInt(mypref,0);
	PlayerPrefs.Save();
}