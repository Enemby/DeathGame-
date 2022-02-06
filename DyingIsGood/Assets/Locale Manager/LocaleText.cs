using System;
using UnityEngine;
using UnityEngine.UI;


/// <summary>
/// Provides the ability to manipulate the sibling Text component at runtime to match the current Locale.
/// </summary>
public class LocaleText : MonoBehaviour {

    [SerializeField]
    private string textID; // The ID of the string resource we want to grab.
    [SerializeField]
    private bool autoUpdate = true; // Does this UI text automatically apply changes to locale?
    private Text textComponent;
    private LocalizationManager localeManager;

    private void Awake () {
        // Cache references:
        textComponent = GetComponent<Text>();
		if (GameObject.FindWithTag ("Localization Manager").GetComponent<LocalizationManager> () != null) {
			localeManager = GameObject.FindWithTag ("Localization Manager").GetComponent<LocalizationManager> ();
			// Bind event if we autoUpdate:
			updateLocale ();
			if (autoUpdate == true) {
				localeManager.languageChanged += updateLocale;
			}
		} else {
			InvokeRepeating("UpdateReferences",2.0f,2.0f);
		}
    }
	private void UpdateReferences(){
		textComponent = GetComponent<Text>();
		if (GameObject.FindWithTag ("Localization Manager").GetComponent<LocalizationManager> () != null) {
			localeManager = GameObject.FindWithTag ("Localization Manager").GetComponent<LocalizationManager> ();
			// Bind event if we autoUpdate:
			updateLocale ();
			if (autoUpdate == true) {
				localeManager.languageChanged += updateLocale;
			}
			CancelInvoke();
		}
	}
    /// <summary>
    /// Attempts to fetch the associated string resource from the LocalizationManager.
    /// Will update the sibling Text component's text attribute if successful.
    /// </summary>
    public void updateLocale () {
        try {
            string response = localeManager.getText(textID);
            if (response != null) {
				if (textComponent == null) {
					GetComponent<TextMesh>().text = response;
				}
				else{
                	textComponent.text = response;
				}
            }
        }
        catch (NullReferenceException e) {
            Debug.Log(e);
        }
    }
}
