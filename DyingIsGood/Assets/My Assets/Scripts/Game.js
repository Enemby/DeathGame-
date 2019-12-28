var winClip : AudioClip;
var winBellClip : AudioClip;
var loseClip : AudioClip;
var gameEnd : boolean = false;
var win : boolean = false;
var audioPlayed : boolean = false;
var nextScene : String = "Titlescreen";
var campaignLevels : String[];
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
			PlayerPrefs.Save();
		}
		else{
			nextScene = "main"; //Load the titlescreen, We're done!
			PlayerPrefs.SetInt("Campaign",0);
			PlayerPrefs.SetInt("CLevel",0);
			PlayerPrefs.Save();
			
		}
		return true;	
	}
}
function endGame(){
	playAudio();
	if(this.GetComponent(AudioSource).isPlaying == false && audioPlayed == true){
		if(win == true){
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
			}
		}
		else{
			yield WaitForSeconds(0.5);
			if(enemyCheck() == false){
				Time.timeScale = 1;
				Application.LoadLevel(Application.loadedLevel);
			}
			else{
				Time.timeScale = 1;
			}
		}
	}
}
function Update(){
	if(Time.timeSinceLevelLoad >= 1.5){
		if(playerCheck() == false){
			timeFreeze();
			win = true;
		}
		if(enemyCheck() == false){
			timeFreeze();
			win = false;
		}
		if(gameEnd == true){
			endGame();
		}
	}
}