const listFilterNotify = ["Todos", "Seguidores", "Posteos"];

const Notificate = () => {
  return (
    <main className="min-h-screen pt-16">
      <div className=" max-w-[1210px] mx-auto min-h-screen flex items-start gap-x-6">
        <section className="bg-gray-400 w-[237px] h-[400px] rounded-xl"></section>
        <section className=" max-w-[688px] w-full h-fit flex flex-col gap-y-5">
          <ul className="bg-secondBlack-700 w-full h-[45px] rounded-xl flex items-center gap-x-3 px-4">
            {listFilterNotify.map((item) => (
              <li className="text-white">{item}</li>
            ))}
          </ul>
          <article className="bg-secondBlack-700 w-full h-[600px] rounded-xl"></article>
        </section>
        <section className="bg-gray-400 w-[237px] h-[400px] rounded-xl"></section>
      </div>
    </main>
  );
};

export default Notificate;
