var winClip : AudioClip;
var winBellClip : AudioClip;
var loseClip : AudioClip;
var gameEnd : boolean = false;
var win : boolean = false;
var audioPlayed : boolean = false;
var nextScene : String = "Titlescreen";
var campaignLevels : String[];
var timerObj : GameObject;
var moneyObj: GameObject;
var timerShown : boolean = false;
var localizationManager : MonoBehaviour;
var myText : UI.Text;
var mySpawnTemp : GameObject;
enum pistonType{
	Vertical = 0,
	Horizontal = 1
}
function Start(){
	CampaignStart();
}
function enemyCheck(){
	if(GameObject.FindGameObjectsWithTag("Enemy").Length == 0){
		return false;
	}
	else{
		return true;
	}
}
function playerCheck(){
	if(GameObject.FindGameObjectWithTag("Player") == null){
		return false;
	}
	else{
		return true;
	}
}
function timeFreeze(){
	Time.timeScale = 0.1;
	gameEnd = true;
	if(timerShown == false && timerObj != null && moneyObj != null && win == true){
		var myTime : String = ""+Mathf.Round(Time.timeSinceLevelLoad * 100.0f) * 0.01f;
		timerObj.active = true;
		timerObj.GetComponent("Text").text = localizationManager.getText("GAMEPLAY_UI_TIMER")+myTime+localizationManager.getText("GAMEPLAY_UI_TIMEUNIT");
		if(PlayerPrefs.GetInt("Campaign") == 1 ){
			if(!PlayerPrefs.HasKey("MoneyLevel")){
				PlayerPrefs.SetInt("MoneyLevel",0);
			}
			if(!PlayerPrefs.HasKey("Money")){
				PlayerPrefs.SetInt("Money",0);
			}
			PlayerPrefs.SetInt("Money",PlayerPrefs.GetInt("Money")+PlayerPrefs.GetInt("MoneyLevel"));
			PlayerPrefs.SetInt("MoneyLevel",0);
			if(win == true){
				PlayerPrefs.SetInt("Money",PlayerPrefs.GetInt("Money")+1000);
			}
		}
		if(!PlayerPrefs.HasKey("CampaignTime")){
			PlayerPrefs.SetFloat("CampaignTime",0.0f);
		}
		PlayerPrefs.SetFloat("CampaignTime",PlayerPrefs.GetFloat("CampaignTime")+Time.timeSinceLevelLoad);
		PlayerPrefs.Save();
		if(PlayerPrefs.GetInt("CLevel") >= campaignLevels.Length-1){
			timerObj.GetComponent("Text").text = "You won the game in: "+Mathf.Round(PlayerPrefs.GetFloat("CampaignTime") * 100.0f) * 0.01f+" seconds";
		}
		if(PlayerPrefs.GetInt("Campaign") == 1){
			moneyObj.active = true;
			moneyObj.GetComponent("Text").text = localizationManager.getText("GAMEPLAY_UI_MONEYWON")+PlayerPrefs.GetInt("Money");
		}
		timerShown = true;
	}
}
function playAudio(){
	if(audioPlayed == false){
		var myAudio = this.GetComponent(AudioSource);
		if(win == true){
			myAudio.PlayOneShot(winBellClip, 0.5);
			myAudio.PlayOneShot(winClip, 0.5);
		}
		else{
			myAudio.PlayOneShot(winBellClip, 0.5);
			myAudio.PlayOneShot(loseClip, 0.5);
		}
		audioPlayed = true; //prevent repeats
	}
}
function CampaignStart(){
	if(PlayerPrefs.GetInt("Campaign") == 1){
		PlayerPrefs.SetString("Level",campaignLevels[PlayerPrefs.GetInt("CLevel")]);
		PlayerPrefs.Save();
		Time.timeScale = 1;
	}
	else{
		if(mySpawnTemp != null){
			Destroy(mySpawnTemp);
		}
	}
}
function CampaignCheck(){
	if(PlayerPrefs.GetInt("Campaign") == 1){
		var getLevel = PlayerPrefs.GetInt("CLevel");
		PlayerPrefs.SetInt("CampaignLength",campaignLevels.Length);
		PlayerPrefs.Save();
		if(getLevel < campaignLevels.Length-1){
			PlayerPrefs.SetInt("CLevel",getLevel+1);
			Debug.Log(getLevel);
			PlayerPrefs.SetString("Level",campaignLevels[getLevel]);
			PlayerPrefs.Save(); //We need this for the campaign hack in SpawnTemp.
		}
		else{
			nextScene = "main"; //Load the titlescreen, We're done!
			PlayerPrefs.SetInt("BeatCampaign",1);
			PlayerPrefs.SetInt("Campaign",0);
			PlayerPrefs.SetInt("CLevel",0);
			PlayerPrefs.SetInt("MoneyLevel",0);
			PlayerPrefs.SetInt("Money",0);
			PlayerPrefs.SetFloat("CampaignTime",0);
			PlayerPrefs.Save();
			
		}
		return true;	
	}
}
function endGame(){
	playAudio();
	if(this.GetComponent(AudioSource).isPlaying == false && audioPlayed == true){
		if(win == true){
			if(myText != null){
				myText.gameObject.active = true;
				myText.text = localizationManager.getText("DIALOGUE_CC_WIN");
			}
			yield WaitForSeconds(0.5);
			if(playerCheck() == false){
				CampaignCheck();
				Time.timeScale = 1;
				if(PlayerPrefs.GetInt("Campaign") != 1){
					Application.LoadLevel(nextScene);
				}
				else{
					Application.LoadLevel(Application.loadedLevel);
				}
			}
			else{
				win = false;
				Time.timeScale = 1;
				if(myText != null){
					myText.gameObject.active = false;
				}
			}
		}
		else{
			if(myText != null){
				myText.gameObject.active = true;
				myText.text = localizationManager.getText("DIALOGUE_CC_LOSS");
			}
			yield WaitForSeconds(0.5);
			if(enemyCheck() == false){
				Time.timeScale = 1;
				Application.LoadLevel(Application.loadedLevel);
			}
			else{
				Time.timeScale = 1;
				if(myText != null){
					myText.gameObject.active = false;
				}
			}
		}
	}
}
function Update(){
	if(Time.timeSinceLevelLoad >= 1.5){
		if(playerCheck() == false){
			win = true;
			timeFreeze();
		}
		if(enemyCheck() == false){
			win = false;
			timeFreeze();
		}
		if(gameEnd == true){
			endGame();
		}
	}
	if(Input.GetButtonDown("Cancel")){
		Application.LoadLevel(1);
	}
}
function jumpNext(){
	timeFreeze();
	win = true;
}