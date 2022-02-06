var musicVolume : float = 0;
var mySource : AudioSource;
function Start(){
	DontDestroyOnLoad(this.gameObject);
	if(GameObject.FindGameObjectsWithTag("Music Manager").Length > 1){
		Destroy(this.gameObject);
	}
	mySource = GetComponent(AudioSource);
	if(PlayerPrefs.GetFloat("MusicVolume") == 1){
		mySource.volume = 0.5;
	}
	else{
		mySource.volume = 0;
	}
}
function Update(){
	var enemies = GameObject.FindGameObjectsWithTag("Enemy");
	if(enemies.Length <= 3){
		mySource.pitch = 1.1;
	}
	else{
		if(enemies.Length > 8){
			mySource.pitch = 0.9;
		}
		else{
				if(enemies.Length < 6){
				mySource.pitch = 1;
				}
			}	
		}
	if(Application.loadedLevel == 1){
		Destroy(this.gameObject);
	}
	if(Input.GetKeyDown("m")){
		ToggleMusic();
	}
	mySource.volume = musicVolume;
}
function ToggleMusic(){
	if(mySource.volume == 0){
		musicVolume = 1;
	}
	else{
		musicVolume = 0;
	}
	PlayerPrefs.SetFloat("MusicVolume",musicVolume);
	PlayerPrefs.Save();
}