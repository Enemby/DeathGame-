var sceneName : String = "";
var keyName : String = "";
var musicSource: AudioSource;
var musicVolume : float = 0;
function Start(){
	if(PlayerPrefs.HasKey("MusicVolume")){
		musicVolume = PlayerPrefs.GetFloat("MusicVolume");
	}
	else{
		PlayerPrefs.SetFloat("MusicVolume",1);
	}
}
function Update(){
	if(Input.GetKeyDown(keyName)){
		Application.LoadLevel(sceneName);
	}
	if(Input.GetKeyDown("m")){
		ToggleMusic();
	}
	musicSource.volume = musicVolume;
}
function ToggleMusic(){
	if(musicSource.volume == 0){
		musicVolume = 1;
	}
	else{
		musicVolume = 0;
	}
	PlayerPrefs.SetFloat("MusicVolume",musicVolume);
	PlayerPrefs.Save();
}