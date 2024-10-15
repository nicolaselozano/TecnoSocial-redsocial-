import { useState } from "react";
import { Link } from "react-router-dom";
import FilterOptions from "../../components/Notifications/FilterOptions";
import CardNotification from "../../components/Notifications/CardNotification";

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

const Notification = () => {
  //const [isActive, setIsActive] = useState(false);
  const [isIndex, setIsIndex] = useState(0);
  //const [isNewNotify,setIsNewNotify] = useState(false);
  return (
    <main className="min-h-screen pt-16 text-white">
      <div className=" max-w-[1210px] mx-auto min-h-screen flex items-start gap-x-6">
        <section className="bg-gray-400 w-[237px] h-[400px] rounded-xl"></section>
        <section className=" max-w-[688px] w-full h-fit flex flex-col gap-y-5">
          <ul className="bg-secondBlack-700 w-full h-[45px] rounded-xl flex items-center gap-x-5 px-4 relative overflow-hidden">
            {listFilterNotify.map((item, index) => (
              <FilterOptions
                key={index}
                link={item.link}
                name={item.name}
                index={index}
                isIndex={isIndex}
              />
            ))}
            <div className="absolute left-0 top-0 w-[70px] h-full bg-primaryGreen-950"></div>
          </ul>
          <article className="bg-secondBlack-700 w-full h-full rounded-xl overflow-hidden">
            <ul className="flex flex-col h-fit">
              {listNotify.map((item,index) => (
                <CardNotification
                  key={index}
                  url={item.url}
                  isNew={item.new}
                  title={item.title}
                  description={item.description}
                  type={item.type}
                  /* setIsNewNotify={setIsNewNotify}
                  isNewNotify={isNewNotify} */
                />
              ))}
            </ul>
          </article>
        </section>
        <section className="bg-gray-400 w-[237px] h-[400px] rounded-xl"></section>
      </div>
    </main>
  );
};

export default Notification;
