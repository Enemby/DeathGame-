var targetCanvas : GameObject;
var myURL : String = "";
var myKey : String = "usedEditor";
function Start(){
	if(!PlayerPrefs.HasKey(myKey)){
		targetCanvas.active = true;
	}
}
function Close(){
	PlayerPrefs.SetInt(myKey,1);
	PlayerPrefs.Save();
	targetCanvas.active = false;
}
function openLink(){
	Application.OpenURL(myURL);
	Close();
}