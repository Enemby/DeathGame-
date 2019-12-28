var sceneName : String = "";
var keyName : String = "";
var musicSource: AudioSource;
function Update(){
	if(Input.GetKeyDown(keyName)){
		Application.LoadLevel(sceneName);
	}
	if(Input.GetKeyDown("m")){
		ToggleMusic();
	}
}
function ToggleMusic(){
	if(musicSource.volume == 0){
		musicSource.volume = 1;
	}
	else{
		musicSource.volume = 0;
	}
}