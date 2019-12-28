using UnityEngine;
using System.Collections;
public class MusicPulse : MonoBehaviour {
	
	public float BPM = 100f;
	public Color StartColor;
	public Color EndColor;
	//private Material mat;
	Camera cam;
	
	// Use this for initialization
	void Start () {
		//mat = GetComponent<Renderer>().material;
		cam = GameObject.FindGameObjectWithTag("MainCamera").GetComponent<Camera>();
		cam.clearFlags = CameraClearFlags.SolidColor;
	}
	
	// Update is called once per frame
	void Update () {
		var baseValue = Mathf.Cos (((Time.time * Mathf.PI) * (BPM / 60f)) % Mathf.PI);
		var target = Color.Lerp (EndColor, StartColor, baseValue);
		cam.backgroundColor = target;
		//mat.SetColor("_EmissionColor", target);
	}
}