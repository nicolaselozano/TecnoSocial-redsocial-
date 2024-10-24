import { useEffect, useState } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import Container from "quill/blots/container";

const FormModal = () => {
  const [text, setText] = useState({
    title: "",
    text: "",
  });

  const [image, setImage] = useState([]);
  const [preview, setPreview] = useState([]);

  useEffect(() => {
    if (image.length > 0) {
      const previewArray = image.map((item) => {
        const reader = new FileReader();
        return new Promise((resolve) => {
          reader.onloadend = () => {
            resolve(reader.result);
          };
          reader.readAsDataURL(item);
        });
      });
      Promise.all(previewArray).then((results) => setPreview(results));
    } else {
      setPreview([]);
    }
  }, [image]);

  const handlesClicDelete = (id) => {
    //let newArray = preview;
    setPreview(preview.filter((item, index) => index !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(text,preview);
  };

  const handleChandeInput = (e) => {
    const { name, value } = e.target;
    setText({ ...text, [name]: value });
    if(preview.length <= 0){
      setImage([])
    }
  };

  //console.log(preview);

  return (
    <form
      className="flex flex-col items-end gap-y-3"
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        type="text"
        value={text.title}
        placeholder="Titulo de post"
        className="w-full max-h-[40px] h-full p-3 bg-secondBlack-400 rounded-xl"
        name="title"
        onChange={(e) => handleChandeInput(e)}
      />
      <textarea
        placeholder="Crea un posteo"
        className="w-full max-h-[330px] h-[330px] p-3 bg-secondBlack-400 rounded-xl"
        onChange={(e) => handleChandeInput(e)}
        value={text.text}
        name="text"
      />
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => setImage(Array.from(e.target.files))}
        className=" w-full "
      />
      {/* image && <img src={preview} className="size-[100px]" /> */}
      <ul className="flex items-start gap-x-3 w-full">
        {preview?.map((item, index) => (
          <li key={index} className="size-[100px] rounded-lg overflow-hidden relative">
            <button
              className=" absolute top-1 right-1 bg-red-600 px-1 text-sm rounded-full"
              onClick={() => handlesClicDelete(index)}
            >
              X
            </button>
            <img
              
              src={item}
              alt={`imagen-${index}`}
              className="size-full object-cover"
            />
          </li>
        ))}
      </ul>
      <button className="p-2 border border-primaryGreen-400 text-primaryGreen-400 rounded-lg hover:bg-primaryGreen-400 hover:text-white ">
        Publicar
      </button>
    </form>
  );
};

export default FormModal;
