function Update(){
	if(this.transform.parent == null){
		//It's delete time!
		var potentials : GameObject[] = GameObject.FindObjectsOfType(GameObject);
		for(i=0;i<potentials.Length;i++){
			if(potentials[i].tag != "Untagged" && potentials[i].tag != "Editor" && potentials[i].tag != "Deletor"){
				if(potentials[i].active == true){
					if(Vector3.Distance(this.transform.position,potentials[i].transform.position) <= 1){
						Destroy(potentials[i]);
					}
				}
			}
		}
		Destroy(this.gameObject);
	}
}