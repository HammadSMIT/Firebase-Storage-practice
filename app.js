import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getStorage, ref , uploadBytes , uploadBytesResumable, getDownloadURL , deleteObject } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyC6Q5HW8Cj5LuoFjbOkl5FtPvAMqSz_Oow",
  authDomain: "firestore-storage-practice.firebaseapp.com",
  projectId: "firestore-storage-practice",
  storageBucket: "firestore-storage-practice.appspot.com",
  messagingSenderId: "688809875354",
  appId: "1:688809875354:web:6deeafdba5c3672c1ccc23",
  measurementId: "G-EG9YNXQ24H"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
var Document = document.getElementById("Documents");


let btn = document.querySelector("#btn");
btn.addEventListener("click" , () => {
  const getFile = document.querySelector("#getFile");
  localStorage.setItem("Document" , `${getFile.files[0].name}`)
//   console.log(getFile.files[0].name)
const mountainsRef = ref(storage, `images/${getFile.files[0].name}`);
const uploadTask = uploadBytesResumable(mountainsRef,getFile.files[0] );

uploadTask.on('state_changed', 
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
        
    }
    Document.innerHTML = `${getFile.files[0].name}`
    

   

    
  }, 
  (error) => {
    console.log(error)
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
    });
  }
);


// 'file' comes from the Blob or File API
// uploadBytes(mountainsRef , getFile.files[0]).then((snapshot) => {
//     console.log('Uploaded a blob or file!');
//     console.log(snapshot)
//   });
} )

let DelBtn = document.querySelector("#DelBtn");
DelBtn.addEventListener("click" ,  () => {
    localStorage.clear()
   
    const desertRef = ref(storage, `images/${getFile.files[0].name}`);
    // Delete the file
deleteObject(desertRef).then(() => {
  // File deleted successfully
  console.log("deleted Succesfully")
  Document.innerHTML = "";
}).catch((error) => {
  // Uh-oh, an error occurred!
  console.log(error)
});

})
