var titleCanvas : GameObject;
var contentCanvas : GameObject;
var contentBack : GameObject;
var playCanvas : GameObject;
var editorScene : String;
var campaignScene : String;
var gameJamScene : String; //The GameJam Levels
var flashScript : MonoBehaviour;
function Start(){
	Time.timeScale = 1;
	PlayerPrefs.SetString("Level","null");
	PlayerPrefs.SetInt("Campaign",0);
	PlayerPrefs.Save();
	if(PlayerPrefs.GetInt("EpilepsySafe") == 1){
		flashScript.enabled = false;
	}
}
function Play(){
	titleCanvas.active = false;
	playCanvas.active = true;
}
function CustomContent(){
	titleCanvas.active = false;
	contentCanvas.active = true;
	contentBack.active = true;
}
function CustomBack(){
	titleCanvas.active = true;
	contentCanvas.active = false;
	contentBack.active = false;
}
function TitleBack(){
	titleCanvas.active = true;
	playCanvas.active = false;
}
function LevelEditor(){
	Application.LoadLevel(editorScene);
	//Bye Bye!
}
function LoadGameJam(){
	Application.LoadLevel(gameJamScene);
}
function Campaign(){
	PlayerPrefs.SetInt("Campaign",1);
	if(!PlayerPrefs.HasKey("CLevel")){
		PlayerPrefs.SetInt("CLevel",0);
	}
	if(PlayerPrefs.HasKey("CampaignLength")){
		if(PlayerPrefs.GetInt("CLevel") > PlayerPrefs.GetInt("CampaignLength")){
			PlayerPrefs.SetInt("CLevel",0);
		}
	}
	else{
		PlayerPrefs.SetInt("CLevel",0);
	}
	PlayerPrefs.SetInt("CLevel",0); //This resets the level counter every play.
	PlayerPrefs.Save();
	Application.LoadLevel(campaignScene);
}
function Exit(){
	Application.Quit();
}