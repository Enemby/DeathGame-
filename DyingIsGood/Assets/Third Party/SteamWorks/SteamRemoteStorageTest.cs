using UnityEngine;
using System.Collections;
using Steamworks;
using System;
using System.IO;

public class SteamRemoteStorageTest : MonoBehaviour {
	const string MESSAGE_FILE_NAME = "message.dat";
	public bool AddPreview = false;
	private Vector2 m_ScrollPos;
	private string m_Message;
	private int m_FileCount;
	private int m_FileSize;
	private ulong m_TotalBytes;
	private int m_FileSizeInBytes;
	private bool m_CloudEnabled;
	private UGCFileWriteStreamHandle_t m_FileStream;
	private UGCHandle_t m_UGCHandle;
	private PublishedFileId_t m_PublishedFileId;
	private PublishedFileUpdateHandle_t m_PublishedFileUpdateHandle;
	private SteamAPICall_t m_FileReadAsyncHandle;

	protected Callback<RemoteStoragePublishedFileSubscribed_t> m_RemoteStoragePublishedFileSubscribed;
	protected Callback<RemoteStoragePublishedFileUnsubscribed_t> m_RemoteStoragePublishedFileUnsubscribed;
	protected Callback<RemoteStoragePublishedFileDeleted_t> m_RemoteStoragePublishedFileDeleted;
	protected Callback<RemoteStoragePublishedFileUpdated_t> m_RemoteStoragePublishedFileUpdated;
	
	private CallResult<RemoteStorageFileShareResult_t> OnRemoteStorageFileShareResultCallResult;
	private CallResult<RemoteStoragePublishFileResult_t> OnRemoteStoragePublishFileResultCallResult;
	private CallResult<RemoteStorageDeletePublishedFileResult_t> OnRemoteStorageDeletePublishedFileResultCallResult;
	private CallResult<RemoteStorageEnumerateUserPublishedFilesResult_t> OnRemoteStorageEnumerateUserPublishedFilesResultCallResult;
	private CallResult<RemoteStorageSubscribePublishedFileResult_t> OnRemoteStorageSubscribePublishedFileResultCallResult;
	private CallResult<RemoteStorageEnumerateUserSubscribedFilesResult_t> OnRemoteStorageEnumerateUserSubscribedFilesResultCallResult;
	private CallResult<RemoteStorageUnsubscribePublishedFileResult_t> OnRemoteStorageUnsubscribePublishedFileResultCallResult;
	private CallResult<RemoteStorageUpdatePublishedFileResult_t> OnRemoteStorageUpdatePublishedFileResultCallResult;
	private CallResult<RemoteStorageDownloadUGCResult_t> OnRemoteStorageDownloadUGCResultCallResult;
	private CallResult<RemoteStorageGetPublishedFileDetailsResult_t> OnRemoteStorageGetPublishedFileDetailsResultCallResult;
	private CallResult<RemoteStorageEnumerateWorkshopFilesResult_t> OnRemoteStorageEnumerateWorkshopFilesResultCallResult;
	private CallResult<RemoteStorageGetPublishedItemVoteDetailsResult_t> OnRemoteStorageGetPublishedItemVoteDetailsResultCallResult;
	private CallResult<RemoteStorageUpdateUserPublishedItemVoteResult_t> OnRemoteStorageUpdateUserPublishedItemVoteResultCallResult;
	private CallResult<RemoteStorageUserVoteDetails_t> OnRemoteStorageUserVoteDetailsCallResult;
	private CallResult<RemoteStorageEnumerateUserSharedWorkshopFilesResult_t> OnRemoteStorageEnumerateUserSharedWorkshopFilesResultCallResult;
	private CallResult<RemoteStorageSetUserPublishedFileActionResult_t> OnRemoteStorageSetUserPublishedFileActionResultCallResult;
	private CallResult<RemoteStorageEnumeratePublishedFilesByUserActionResult_t> OnRemoteStorageEnumeratePublishedFilesByUserActionResultCallResult;
	private CallResult<RemoteStoragePublishFileProgress_t> OnRemoteStoragePublishFileProgressCallResult;
	private CallResult<RemoteStorageFileWriteAsyncComplete_t> OnRemoteStorageFileWriteAsyncCompleteCallResult;
	private CallResult<RemoteStorageFileReadAsyncComplete_t> OnRemoteStorageFileReadAsyncCompleteCallResult;
	
	public void OnEnable() {
		m_Message = "";
		m_RemoteStoragePublishedFileSubscribed = Callback<RemoteStoragePublishedFileSubscribed_t>.Create(OnRemoteStoragePublishedFileSubscribed);
		m_RemoteStoragePublishedFileUnsubscribed = Callback<RemoteStoragePublishedFileUnsubscribed_t>.Create(OnRemoteStoragePublishedFileUnsubscribed);
		m_RemoteStoragePublishedFileDeleted = Callback<RemoteStoragePublishedFileDeleted_t>.Create(OnRemoteStoragePublishedFileDeleted);
		m_RemoteStoragePublishedFileUpdated = Callback<RemoteStoragePublishedFileUpdated_t>.Create(OnRemoteStoragePublishedFileUpdated);
		
		OnRemoteStorageFileShareResultCallResult = CallResult<RemoteStorageFileShareResult_t>.Create(OnRemoteStorageFileShareResult);
		OnRemoteStoragePublishFileResultCallResult = CallResult<RemoteStoragePublishFileResult_t>.Create(OnRemoteStoragePublishFileResult);
		OnRemoteStorageDeletePublishedFileResultCallResult = CallResult<RemoteStorageDeletePublishedFileResult_t>.Create(OnRemoteStorageDeletePublishedFileResult);
		OnRemoteStorageEnumerateUserPublishedFilesResultCallResult = CallResult<RemoteStorageEnumerateUserPublishedFilesResult_t>.Create(OnRemoteStorageEnumerateUserPublishedFilesResult);
		OnRemoteStorageSubscribePublishedFileResultCallResult = CallResult<RemoteStorageSubscribePublishedFileResult_t>.Create(OnRemoteStorageSubscribePublishedFileResult);
		OnRemoteStorageEnumerateUserSubscribedFilesResultCallResult = CallResult<RemoteStorageEnumerateUserSubscribedFilesResult_t>.Create(OnRemoteStorageEnumerateUserSubscribedFilesResult);
		OnRemoteStorageUnsubscribePublishedFileResultCallResult = CallResult<RemoteStorageUnsubscribePublishedFileResult_t>.Create(OnRemoteStorageUnsubscribePublishedFileResult);
		OnRemoteStorageUpdatePublishedFileResultCallResult = CallResult<RemoteStorageUpdatePublishedFileResult_t>.Create(OnRemoteStorageUpdatePublishedFileResult);
		OnRemoteStorageDownloadUGCResultCallResult = CallResult<RemoteStorageDownloadUGCResult_t>.Create(OnRemoteStorageDownloadUGCResult);
		OnRemoteStorageGetPublishedFileDetailsResultCallResult = CallResult<RemoteStorageGetPublishedFileDetailsResult_t>.Create(OnRemoteStorageGetPublishedFileDetailsResult);
		OnRemoteStorageEnumerateWorkshopFilesResultCallResult = CallResult<RemoteStorageEnumerateWorkshopFilesResult_t>.Create(OnRemoteStorageEnumerateWorkshopFilesResult);
		OnRemoteStorageGetPublishedItemVoteDetailsResultCallResult = CallResult<RemoteStorageGetPublishedItemVoteDetailsResult_t>.Create(OnRemoteStorageGetPublishedItemVoteDetailsResult);
		OnRemoteStorageUpdateUserPublishedItemVoteResultCallResult = CallResult<RemoteStorageUpdateUserPublishedItemVoteResult_t>.Create(OnRemoteStorageUpdateUserPublishedItemVoteResult);
		OnRemoteStorageUserVoteDetailsCallResult = CallResult<RemoteStorageUserVoteDetails_t>.Create(OnRemoteStorageUserVoteDetails);
		OnRemoteStorageEnumerateUserSharedWorkshopFilesResultCallResult = CallResult<RemoteStorageEnumerateUserSharedWorkshopFilesResult_t>.Create(OnRemoteStorageEnumerateUserSharedWorkshopFilesResult);
		OnRemoteStorageSetUserPublishedFileActionResultCallResult = CallResult<RemoteStorageSetUserPublishedFileActionResult_t>.Create(OnRemoteStorageSetUserPublishedFileActionResult);
		OnRemoteStorageEnumeratePublishedFilesByUserActionResultCallResult = CallResult<RemoteStorageEnumeratePublishedFilesByUserActionResult_t>.Create(OnRemoteStorageEnumeratePublishedFilesByUserActionResult);
		OnRemoteStoragePublishFileProgressCallResult = CallResult<RemoteStoragePublishFileProgress_t>.Create(OnRemoteStoragePublishFileProgress);
		OnRemoteStorageFileWriteAsyncCompleteCallResult = CallResult<RemoteStorageFileWriteAsyncComplete_t>.Create(OnRemoteStorageFileWriteAsyncComplete);
		OnRemoteStorageFileReadAsyncCompleteCallResult = CallResult<RemoteStorageFileReadAsyncComplete_t>.Create(OnRemoteStorageFileReadAsyncComplete);
	}
	void OnRemoteStorageFileShareResult(RemoteStorageFileShareResult_t pCallback, bool bIOFailure) {
		Debug.Log("[" + RemoteStorageFileShareResult_t.k_iCallback + " - RemoteStorageFileShareResult] - " + pCallback.m_eResult + " -- " + pCallback.m_hFile + " -- " + pCallback.m_rgchFilename);
		
		if (pCallback.m_eResult == EResult.k_EResultOK) {
			m_UGCHandle = pCallback.m_hFile;
		}
	}
	
	void OnRemoteStoragePublishFileResult(RemoteStoragePublishFileResult_t pCallback, bool bIOFailure) {
		Debug.Log("[" + RemoteStoragePublishFileResult_t.k_iCallback + " - RemoteStoragePublishFileResult] - " + pCallback.m_eResult + " -- " + pCallback.m_nPublishedFileId + " -- " + pCallback.m_bUserNeedsToAcceptWorkshopLegalAgreement);
		
		if (pCallback.m_eResult == EResult.k_EResultOK) {
			m_PublishedFileId = pCallback.m_nPublishedFileId;
		}
	}
	
	void OnRemoteStorageDeletePublishedFileResult(RemoteStorageDeletePublishedFileResult_t pCallback, bool bIOFailure) {
		Debug.Log("[" + RemoteStorageDeletePublishedFileResult_t.k_iCallback + " - RemoteStorageDeletePublishedFileResult] - " + pCallback.m_eResult + " -- " + pCallback.m_nPublishedFileId);
	}
	
	void OnRemoteStorageEnumerateUserPublishedFilesResult(RemoteStorageEnumerateUserPublishedFilesResult_t pCallback, bool bIOFailure) {
		Debug.Log("[" + RemoteStorageEnumerateUserPublishedFilesResult_t.k_iCallback + " - RemoteStorageEnumerateUserPublishedFilesResult] - " + pCallback.m_eResult + " -- " + pCallback.m_nResultsReturned + " -- " + pCallback.m_nTotalResultCount + " -- " + pCallback.m_rgPublishedFileId);
	}
	
	void OnRemoteStorageSubscribePublishedFileResult(RemoteStorageSubscribePublishedFileResult_t pCallback, bool bIOFailure) {
		Debug.Log("[" + RemoteStorageSubscribePublishedFileResult_t.k_iCallback + " - RemoteStorageSubscribePublishedFileResult] - " + pCallback.m_eResult + " -- " + pCallback.m_nPublishedFileId);
	}
	
	void OnRemoteStorageEnumerateUserSubscribedFilesResult(RemoteStorageEnumerateUserSubscribedFilesResult_t pCallback, bool bIOFailure) {
		Debug.Log("[" + RemoteStorageEnumerateUserSubscribedFilesResult_t.k_iCallback + " - RemoteStorageEnumerateUserSubscribedFilesResult] - " + pCallback.m_eResult + " -- " + pCallback.m_nResultsReturned + " -- " + pCallback.m_nTotalResultCount + " -- " + pCallback.m_rgPublishedFileId + " -- " + pCallback.m_rgRTimeSubscribed);
	}
	
	void OnRemoteStorageUnsubscribePublishedFileResult(RemoteStorageUnsubscribePublishedFileResult_t pCallback, bool bIOFailure) {
		Debug.Log("[" + RemoteStorageUnsubscribePublishedFileResult_t.k_iCallback + " - RemoteStorageUnsubscribePublishedFileResult] - " + pCallback.m_eResult + " -- " + pCallback.m_nPublishedFileId);
	}
	
	void OnRemoteStorageUpdatePublishedFileResult(RemoteStorageUpdatePublishedFileResult_t pCallback, bool bIOFailure) {
		Debug.Log("[" + RemoteStorageUpdatePublishedFileResult_t.k_iCallback + " - RemoteStorageUpdatePublishedFileResult] - " + pCallback.m_eResult + " -- " + pCallback.m_nPublishedFileId + " -- " + pCallback.m_bUserNeedsToAcceptWorkshopLegalAgreement);
	}
	
	void OnRemoteStorageDownloadUGCResult(RemoteStorageDownloadUGCResult_t pCallback, bool bIOFailure) {
		Debug.Log("[" + RemoteStorageDownloadUGCResult_t.k_iCallback + " - RemoteStorageDownloadUGCResult] - " + pCallback.m_eResult + " -- " + pCallback.m_hFile + " -- " + pCallback.m_nAppID + " -- " + pCallback.m_nSizeInBytes + " -- " + pCallback.m_pchFileName + " -- " + pCallback.m_ulSteamIDOwner);
	}
	
	void OnRemoteStorageGetPublishedFileDetailsResult(RemoteStorageGetPublishedFileDetailsResult_t pCallback, bool bIOFailure) {
		Debug.Log("[" + RemoteStorageGetPublishedFileDetailsResult_t.k_iCallback + " - RemoteStorageGetPublishedFileDetailsResult] - " + pCallback.m_eResult + " -- " + pCallback.m_nPublishedFileId + " -- " + pCallback.m_nCreatorAppID + " -- " + pCallback.m_nConsumerAppID + " -- " + pCallback.m_rgchTitle + " -- " + pCallback.m_rgchDescription + " -- " + pCallback.m_hFile + " -- " + pCallback.m_hPreviewFile + " -- " + pCallback.m_ulSteamIDOwner + " -- " + pCallback.m_rtimeCreated + " -- " + pCallback.m_rtimeUpdated + " -- " + pCallback.m_eVisibility + " -- " + pCallback.m_bBanned + " -- " + pCallback.m_rgchTags + " -- " + pCallback.m_bTagsTruncated + " -- " + pCallback.m_pchFileName + " -- " + pCallback.m_nFileSize + " -- " + pCallback.m_nPreviewFileSize + " -- " + pCallback.m_rgchURL + " -- " + pCallback.m_eFileType + " -- " + pCallback.m_bAcceptedForUse);
		
		if (pCallback.m_eResult == EResult.k_EResultOK) {
			m_UGCHandle = pCallback.m_hFile;
		}
	}
	
	void OnRemoteStorageEnumerateWorkshopFilesResult(RemoteStorageEnumerateWorkshopFilesResult_t pCallback, bool bIOFailure) {
		Debug.Log("[" + RemoteStorageEnumerateWorkshopFilesResult_t.k_iCallback + " - RemoteStorageEnumerateWorkshopFilesResult] - " + pCallback.m_eResult + " -- " + pCallback.m_nResultsReturned + " -- " + pCallback.m_nTotalResultCount + " -- " + pCallback.m_rgPublishedFileId + " -- " + pCallback.m_rgScore + " -- " + pCallback.m_nAppId + " -- " + pCallback.m_unStartIndex);
		
		for (int i = 0; i < pCallback.m_nResultsReturned; ++i) {
			print(i + ": " + pCallback.m_rgPublishedFileId[i]);
		}
		
		if(pCallback.m_nResultsReturned >= 1) {
			m_PublishedFileId = pCallback.m_rgPublishedFileId[0];
		}
	}
	
	void OnRemoteStorageGetPublishedItemVoteDetailsResult(RemoteStorageGetPublishedItemVoteDetailsResult_t pCallback, bool bIOFailure) {
		Debug.Log("[" + RemoteStorageGetPublishedItemVoteDetailsResult_t.k_iCallback + " - RemoteStorageGetPublishedItemVoteDetailsResult] - " + pCallback.m_eResult + " -- " + pCallback.m_unPublishedFileId + " -- " + pCallback.m_nVotesFor + " -- " + pCallback.m_nVotesAgainst + " -- " + pCallback.m_nReports + " -- " + pCallback.m_fScore);
	}
	
	void OnRemoteStoragePublishedFileSubscribed(RemoteStoragePublishedFileSubscribed_t pCallback) {
		Debug.Log("[" + RemoteStoragePublishedFileSubscribed_t.k_iCallback + " - RemoteStoragePublishedFileSubscribed] - " + pCallback.m_nPublishedFileId + " -- " + pCallback.m_nAppID);
	}
	
	void OnRemoteStoragePublishedFileUnsubscribed(RemoteStoragePublishedFileUnsubscribed_t pCallback) {
		Debug.Log("[" + RemoteStoragePublishedFileUnsubscribed_t.k_iCallback + " - RemoteStoragePublishedFileUnsubscribed] - " + pCallback.m_nPublishedFileId + " -- " + pCallback.m_nAppID);
	}
	
	void OnRemoteStoragePublishedFileDeleted(RemoteStoragePublishedFileDeleted_t pCallback) {
		Debug.Log("[" + RemoteStoragePublishedFileDeleted_t.k_iCallback + " - RemoteStoragePublishedFileDeleted] - " + pCallback.m_nPublishedFileId + " -- " + pCallback.m_nAppID);
	}
	
	void OnRemoteStorageUpdateUserPublishedItemVoteResult(RemoteStorageUpdateUserPublishedItemVoteResult_t pCallback, bool bIOFailure) {
		Debug.Log("[" + RemoteStorageUpdateUserPublishedItemVoteResult_t.k_iCallback + " - RemoteStorageUpdateUserPublishedItemVoteResult] - " + pCallback.m_eResult + " -- " + pCallback.m_nPublishedFileId);
	}
	
	void OnRemoteStorageUserVoteDetails(RemoteStorageUserVoteDetails_t pCallback, bool bIOFailure) {
		Debug.Log("[" + RemoteStorageUserVoteDetails_t.k_iCallback + " - RemoteStorageUserVoteDetails] - " + pCallback.m_eResult + " -- " + pCallback.m_nPublishedFileId + " -- " + pCallback.m_eVote);
	}
	
	void OnRemoteStorageEnumerateUserSharedWorkshopFilesResult(RemoteStorageEnumerateUserSharedWorkshopFilesResult_t pCallback, bool bIOFailure) {
		Debug.Log("[" + RemoteStorageEnumerateUserSharedWorkshopFilesResult_t.k_iCallback + " - RemoteStorageEnumerateUserSharedWorkshopFilesResult] - " + pCallback.m_eResult + " -- " + pCallback.m_nResultsReturned + " -- " + pCallback.m_nTotalResultCount + " -- " + pCallback.m_rgPublishedFileId);
	}
	
	void OnRemoteStorageSetUserPublishedFileActionResult(RemoteStorageSetUserPublishedFileActionResult_t pCallback, bool bIOFailure) {
		Debug.Log("[" + RemoteStorageSetUserPublishedFileActionResult_t.k_iCallback + " - RemoteStorageSetUserPublishedFileActionResult] - " + pCallback.m_eResult + " -- " + pCallback.m_nPublishedFileId + " -- " + pCallback.m_eAction);
	}
	
	void OnRemoteStorageEnumeratePublishedFilesByUserActionResult(RemoteStorageEnumeratePublishedFilesByUserActionResult_t pCallback, bool bIOFailure) {
		Debug.Log("[" + RemoteStorageEnumeratePublishedFilesByUserActionResult_t.k_iCallback + " - RemoteStorageEnumeratePublishedFilesByUserActionResult] - " + pCallback.m_eResult + " -- " + pCallback.m_eAction + " -- " + pCallback.m_nResultsReturned + " -- " + pCallback.m_nTotalResultCount + " -- " + pCallback.m_rgPublishedFileId + " -- " + pCallback.m_rgRTimeUpdated);
	}
	
	void OnRemoteStoragePublishFileProgress(RemoteStoragePublishFileProgress_t pCallback, bool bIOFailure) {
		Debug.Log("[" + RemoteStoragePublishFileProgress_t.k_iCallback + " - RemoteStoragePublishFileProgress] - " + pCallback.m_dPercentFile + " -- " + pCallback.m_bPreview);
	}
	
	void OnRemoteStoragePublishedFileUpdated(RemoteStoragePublishedFileUpdated_t pCallback) {
		Debug.Log("[" + RemoteStoragePublishedFileUpdated_t.k_iCallback + " - RemoteStoragePublishedFileUpdated] - " + pCallback.m_nPublishedFileId + " -- " + pCallback.m_nAppID + " -- " + pCallback.m_ulUnused);
	}
	
	void OnRemoteStorageFileWriteAsyncComplete(RemoteStorageFileWriteAsyncComplete_t pCallback, bool bIOFailure) {
		Debug.Log("[" + RemoteStorageFileWriteAsyncComplete_t.k_iCallback + " - RemoteStorageFileWriteAsyncComplete] - " + pCallback.m_eResult);
	}
	
	void OnRemoteStorageFileReadAsyncComplete(RemoteStorageFileReadAsyncComplete_t pCallback, bool bIOFailure) {
		Debug.Log("[" + RemoteStorageFileReadAsyncComplete_t.k_iCallback + " - RemoteStorageFileReadAsyncComplete] - " + pCallback.m_hFileReadAsync + " -- " + pCallback.m_eResult + " -- " + pCallback.m_nOffset + " -- " + pCallback.m_cubRead);
		
		if (pCallback.m_eResult == EResult.k_EResultOK) {
			byte[] Data = new byte[40];
			bool ret = SteamRemoteStorage.FileReadAsyncComplete(pCallback.m_hFileReadAsync, Data, pCallback.m_cubRead);
			print("FileReadAsyncComplete(m_FileReadAsyncHandle, Data, pCallback.m_cubRead) : " + ret);
			if (ret) {
				m_Message = System.Text.Encoding.UTF8.GetString(Data, (int)pCallback.m_nOffset, (int)pCallback.m_cubRead);
			}
		}
	}
	void UploadFileUpdate(){
		string myFile = PlayerPrefs.GetString("myFile");
		string myPath = PlayerPrefs.GetString("myPath");
		string myID = PlayerPrefs.GetString ("myID");
		m_PublishedFileId.m_PublishedFileId = ulong.Parse(myID);
		SteamRemoteStorage.FileWrite (myPath, File.ReadAllBytes(myPath),File.ReadAllBytes(myPath).Length);
		SteamRemoteStorage.FileWrite ("CustomContent"+Path.DirectorySeparatorChar+"Example.png", File.ReadAllBytes("CustomContent"+Path.DirectorySeparatorChar+"Example.png"),File.ReadAllBytes("CustomContent"+Path.DirectorySeparatorChar+"Example.png").Length);
		m_PublishedFileUpdateHandle = SteamRemoteStorage.CreatePublishedFileUpdateRequest(m_PublishedFileId);
		bool ret = SteamRemoteStorage.UpdatePublishedFileFile(m_PublishedFileUpdateHandle,myPath);
		bool ret2 = SteamRemoteStorage.UpdatePublishedFilePreviewFile (m_PublishedFileUpdateHandle, "CustomContent" + Path.DirectorySeparatorChar + "Example.png");
		Debug.Log ("mypath: " + myPath);
		if (ret && ret2) {
			SteamAPICall_t handle = SteamRemoteStorage.CommitPublishedFileUpdate (m_PublishedFileUpdateHandle);
			OnRemoteStorageUpdatePublishedFileResultCallResult.Set (handle);
		}
	}
}