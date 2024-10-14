import { useState } from "react";
import { Link } from "react-router-dom";

//const listFilterNotify = ["Todos", "Seguidores", "Posteos"];

const listFilterNotify = [
  {
    name: "Todos",
    link: "",
  },
  {
    name: "Seguidores",
    link: "mefollows",
  },
  {
    name: "Posteos",
    link: "posts",
  },
];

const listNotify = [
  {
    type: "post",
    title: "Nuevo Posteo",
    description:
      "Lorem ipsum dolor sit amet consectetur. Integer enim ac lorem mauris at quam aenean leo amet. Platea et hendrerit velit gravida quis neque nec. Ut amet tempor quam eu mauris leo morbi amet. Nisl sed est amet tortor suspendisse nulla varius dictum.",
    url: "#",
    new: true,
  },
  {
    type: "mefollow",
    title: "Nuevo Seguidor",
    description:
      "Lorem ipsum dolor sit amet consectetur. Integer enim ac lorem mauris at quam aenean leo amet. Platea et hendrerit velit gravida quis neque nec. Ut amet tempor quam eu mauris leo morbi amet. Nisl sed est amet tortor suspendisse nulla varius dictum.",
    url: "#",
    new: false,
  },
  {
    type: "post",
    title: "Nuevo Posteo",
    description:
      "Lorem ipsum dolor sit amet consectetur. Integer enim ac lorem mauris at quam aenean leo amet. Platea et hendrerit velit gravida quis neque nec. Ut amet tempor quam eu mauris leo morbi amet. Nisl sed est amet tortor suspendisse nulla varius dictum.",
    url: "#",
    new: true,
  },
  {
    type: "mefollow",
    title: "Nuevo Seguidor",
    description:
      "Lorem ipsum dolor sit amet consectetur. Integer enim ac lorem mauris at quam aenean leo amet. Platea et hendrerit velit gravida quis neque nec. Ut amet tempor quam eu mauris leo morbi amet. Nisl sed est amet tortor suspendisse nulla varius dictum.",
    url: "#",
    new: false,
  },
  {
    type: "mefollow",
    title: "Nuevo Seguidor",
    description:
      "Lorem ipsum dolor sit amet consectetur. Integer enim ac lorem mauris at quam aenean leo amet. Platea et hendrerit velit gravida quis neque nec. Ut amet tempor quam eu mauris leo morbi amet. Nisl sed est amet tortor suspendisse nulla varius dictum.",
    url: "#",
    new: false,
  },
  {
    type: "mefollow",
    title: "Nuevo Seguidor",
    description:
      "Lorem ipsum dolor sit amet consectetur. Integer enim ac lorem mauris at quam aenean leo amet. Platea et hendrerit velit gravida quis neque nec. Ut amet tempor quam eu mauris leo morbi amet. Nisl sed est amet tortor suspendisse nulla varius dictum.",
    url: "#",
    new: false,
  },
  {
    type: "mefollow",
    title: "Nuevo Seguidor",
    description:
      "Lorem ipsum dolor sit amet consectetur. Integer enim ac lorem mauris at quam aenean leo amet. Platea et hendrerit velit gravida quis neque nec. Ut amet tempor quam eu mauris leo morbi amet. Nisl sed est amet tortor suspendisse nulla varius dictum.",
    url: "#",
    new: false,
  },
];

const Notificate = () => {
  //const [isActive, setIsActive] = useState(false);
  const [isIndex, setIsIndex] = useState(0);
  return (
    <main className="min-h-screen pt-16 text-white">
      <div className=" max-w-[1210px] mx-auto min-h-screen flex items-start gap-x-6">
        <section className="bg-gray-400 w-[237px] h-[400px] rounded-xl"></section>
        <section className=" max-w-[688px] w-full h-fit flex flex-col gap-y-5">
          <ul className="bg-secondBlack-700 w-full h-[45px] rounded-xl flex items-center gap-x-5 px-4 relative overflow-hidden">
            {listFilterNotify.map((item, index) => (
              <li
                className={`${
                  isIndex === index ? "text-primaryGreen-400" : "text-white"
                }  font-normal text-base z-10`}
              >
                <Link to={`/notificate/${item.link}`}>{item.name}</Link>
              </li>
            ))}
            <div className="absolute left-0 top-0 w-[70px] h-full bg-primaryGreen-950"></div>
          </ul>
          <article className="bg-secondBlack-700 w-full h-full rounded-xl overflow-hidden">
            <ul className="flex flex-col h-fit">
              {listNotify.map((item) => (
                <Link
                  to={item.url}
                  className={`flex items-center gap-x-4 border-b border-secondBlack-400 px-8 py-4 ${
                    item.new ? "bg-primaryGreen-950 text-primaryGreen-400" : ""
                  }`}
                >
                  <div className="size-[80px] bg-green-400 rounded-xl "></div>
                  <div className=" flex flex-col gap-y-2 w-[80%]">
                    <h3 className=" text-xl font-semibold">{item.title}</h3>
                    <p className=" text-xs font-normal">{item.description}</p>
                  </div>
                  {item.new && (
                    <div className="size-3 bg-primaryGreen-400 rounded-full"></div>
                  )}
                </Link>
              ))}
            </ul>
          </article>
        </section>
        <section className="bg-gray-400 w-[237px] h-[400px] rounded-xl"></section>
      </div>
    </main>
  );
};

export default Notificate;
