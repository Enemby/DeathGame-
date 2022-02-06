using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ExampleImplementation : MonoBehaviour {

    private LocalizationManager localeManager;
    [SerializeField]
    private List<string> languages;
    private int index = 0;

    private void Awake () {
		localeManager = GameObject.FindWithTag("Localization Manager").GetComponent<LocalizationManager>();
		if (PlayerPrefs.HasKey ("LAST_LANGUAGE")) {
			string myLanguage = PlayerPrefs.GetString("LAST_LANGUAGE");
			for(int i = 0;i<languages.Count;i++){
				if(languages[i] == myLanguage){
					index = i;
					localeManager.setLocalization(languages[index]);
				}
			}
		}
    }

	public void onLanguageButtonPressed () {
        index++;
        if (index == languages.Count) { //and here I've been using .Length this whole time, like some sort of monster
            index = 0;
        }
        localeManager.setLocalization(languages[index]);
		PlayerPrefs.SetString("LAST_LANGUAGE", languages[index]);
		PlayerPrefs.Save();
    }
}
