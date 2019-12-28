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
}