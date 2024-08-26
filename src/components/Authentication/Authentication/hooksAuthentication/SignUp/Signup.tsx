import { useImgUpload } from "./useImgUpload";

const Signup = () => {
  // Desestruturação do hook personalizado
  const { selectedImg, handleImgChange } = useImgUpload();

  return (
    <section className={hideContent}>
      <div>
        <label htmlFor="userID">User Id</label>
        <input type="text" name="userID" required />
      </div>

      <div>
        <input type="file" onChange={handleImgChange} />
        {selectedImg && <img src={selectedImg} alt="Selected" />}
      </div>
    </section>
  );
};

export default Signup;
