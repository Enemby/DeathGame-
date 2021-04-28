function Start(){
	DontDestroyOnLoad(this.gameObject);
	if(GameObject.FindGameObjectsWithTag("Music Manager").Length > 1){
		Destroy(this.gameObject);
	}
}
function Update(){
	var enemies = GameObject.FindGameObjectsWithTag("Enemy");
	if(enemies.Length <= 3){
		this.GetComponent(AudioSource).pitch = 1.1;
	}
	else{
		if(enemies.Length > 8){
			this.GetComponent(AudioSource).pitch = 0.9;
		}
		else{
				if(enemies.Length < 6){
				this.GetComponent(AudioSource).pitch = 1;
				}
			}	
		}
	if(Application.loadedLevel == 1){
		Destroy(this.gameObject);
	}
}