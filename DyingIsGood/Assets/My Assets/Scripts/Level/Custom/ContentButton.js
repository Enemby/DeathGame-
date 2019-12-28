var fileName : String = "MyLevel";
function Press(){
	PlayerPrefs.SetString("Level",fileName);
	PlayerPrefs.Save();
	Application.LoadLevel("EditLevel");
}
function SetFile(myString : String){
	fileName = myString;
}
function Update(){
	this.transform.GetChild(0).GetComponent(UI.Text).text = fileName;
}