public var myFile : String;
public var myText : UI.Text;
public var fileID : String;
function Start(){
	myFile = this.transform.parent.GetComponent(ContentButton).fileName;
	if(GameObject.Find("SteamManager") == null){
		this.gameObject.active = false;
	}
	if(myText == null){
		myText = transform.GetChild(0).GetComponent(UI.Text);
	}
}
function Pressed(){
	GameObject.Find("SteamManager").GetComponent("SteamWorkshop").SaveToWorkshop("CustomContent"+Path.DirectorySeparatorChar+myFile,File.ReadAllText("CustomContent"+Path.DirectorySeparatorChar+myFile),myFile,"I uploaded this from Death Game+! Try it out!",null,null);
	myText.text = "Uploaded";
	PlayerPrefs.SetInt("UploadedToWorkShop",1);
	PlayerPrefs.Save();
}
function UpdateItemPressed(){
	PlayerPrefs.SetString("myFile",myFile);
	PlayerPrefs.Save();
	GameObject.Find("UpdatePanel").BroadcastMessage("Enable");
}
function Update () {

}