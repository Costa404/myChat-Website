import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../../../../firebase";

export const uploadImage = async (file: File) => {
  const uniqueFileName = `${uuidv4()}-${file.name}`;
  const storageRef = ref(storage, `images/${uniqueFileName}`);
  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};
