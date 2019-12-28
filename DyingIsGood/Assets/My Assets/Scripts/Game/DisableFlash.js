var sceneToLoad : String = "main"; //Because that's logical.
var epilepsyKey : String = "e";
var continueKey : String = "space";
function Update () {
	if(PlayerPrefs.HasKey("EpilepsySafe")){
		Application.LoadLevel(sceneToLoad);
	}
	else{
		var myKeyPress;
		if(Input.anyKey){
			myKeyPress = Input.inputString;
			if(myKeyPress == epilepsyKey){
				PlayerPrefs.SetInt("EpilepsySafe",1);
				PlayerPrefs.Save();
			}
			else if(myKeyPress == continueKey){
				Application.LoadLevel(sceneToLoad);
			}
		}
	}
}