var url : String;
var source: AudioSource;
var www : WWW;
	
	function Start () {
		var myPath : char = Path.DirectorySeparatorChar;
		url = transform.name;
		url = url.Replace("\\",""+myPath);
		url = "File://"+url;
		www = new WWW(url);
		source = GetComponent.<AudioSource>();
		yield www;
		source.clip = www.audioClip;
		if(!source.isPlaying && source.clip.isReadyToPlay)
				source.Play();
		if(www.error != null){
			Debug.Log("Loading Error!: "+www.error);
			Destroy(this.gameObject);
		}
		}