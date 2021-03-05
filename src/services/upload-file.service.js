import UserService from "./user.service";

class UploadFilesService {
  upload(file, onUploadProgress) {
    let formData = new FormData();

    formData.append("file", file);
    UserService.initiateContract(formData);

   /* return http.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });*/
  }

  getFiles() {

    console.log("/files");
    
  }
}

export default new UploadFilesService();
