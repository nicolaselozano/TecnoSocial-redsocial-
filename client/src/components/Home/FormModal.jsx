const FormModal = () => {
  return (
    <form className="flex flex-col items-end gap-y-3">
      <textarea
        placeholder="Crea un posteo"
        className="w-full max-h-[330px] h-[330px] p-3 bg-secondBlack-400 rounded-xl"
      />
      <button className="p-2 border border-primaryGreen-400 text-primaryGreen-400 rounded-lg hover:bg-primaryGreen-400 hover:text-secondBlack-900">
        Publicar
      </button>
    </form>
  );
};

export default FormModal;
