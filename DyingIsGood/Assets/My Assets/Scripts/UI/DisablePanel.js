var myPanel: GameObject;
var myInput : UI.InputField;
function Update () {

}
public function Cancel(){
	myPanel.active = false;
}
public function UploadUpdate(){
	Debug.Log("Uploading?!");
	var myFile = PlayerPrefs.GetString("myFile");
	PlayerPrefs.SetString("myPath","CustomContent"+Path.DirectorySeparatorChar+myFile);
	PlayerPrefs.SetString("myID",myInput.text);
	PlayerPrefs.Save();
	var myID = ulong.Parse(myInput.text);
	Debug.Log(myID);
	//GameObject.Find("SteamManager").GetComponent("SteamWorkshop").UpdateToWorkshop(myID,"CustomContent"+Path.DirectorySeparatorChar+myFile);
	//GameObject.Find("SteamManager").GetComponent("SteamWorkshop").UpdateToWorkshop(myID,"Workshop"+Path.DirectorySeparatorChar);
	GameObject.Find("SteamManager").GetComponent("SteamRemoteStorageTest").UploadFileUpdate();
	PlayerPrefs.SetInt("UploadedToWorkShop",1);
	PlayerPrefs.Save();
	Debug.Log("CustomContent"+Path.DirectorySeparatorChar+myFile);
}
function Enable(){
	myPanel.active = true;
}