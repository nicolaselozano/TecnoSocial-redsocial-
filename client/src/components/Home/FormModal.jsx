import { useState } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import Container from "quill/blots/container";

const FormModal = () => {
  const [text, setText] = useState("");

  //console.log(JSON.stringify(quill.getContents()));
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(text);
  };

  const handleChandeInput = (e) => {
    setText(e.target.value);
    //console.log(e.target.value.find(item => item === "/") ? "encontrado" : "no encontrado")
    
    /* if(e.target.value === "/"){
      console.log("abre el mini menu")
    } */
  };

  return (
    <form
      className="flex flex-col items-end gap-y-3"
      onSubmit={(e) => handleSubmit(e)}
    >
      <textarea
        
        placeholder="Crea un posteo"
        className="w-full max-h-[330px] h-[330px] p-3 bg-secondBlack-400 rounded-xl"
        onChange={(e) => handleChandeInput(e)}
        value={text}
      >
      </textarea>
      <button className="p-2 border border-primaryGreen-400 text-primaryGreen-400 rounded-lg hover:bg-primaryGreen-400 hover:text-white ">
        Publicar
      </button>
    </form>
  );
};

export default FormModal;
