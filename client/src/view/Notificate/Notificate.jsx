import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FilterOptions from "../../components/Notifications/FilterOptions";
import CardNotification from "../../components/Notifications/CardNotification";
import LayouteMain from "../../layout/LayouteMain";

const listFilterNotify = [
  {
    name: "Todos",
    link: "",
  },
  {
    name: "Comentarios",
    link: "comment",
  },
  {
    name: "Posteos",
    link: "posts",
  },
];

const listNotify = [
  {
    type: "comment",
    title: "Comentario",
    description:
      "Lorem ipsum dolor sit amet consectetur. Integer enim ac lorem mauris at quam aenean leo amet. Platea et hendrerit velit gravida quis neque nec. Ut amet tempor quam eu mauris leo morbi amet. Nisl sed est amet tortor suspendisse nulla varius dictum.",
    url: "#",
    date: "2024-10-17",
  },
  {
    type: "comment",
    title: "Comentario",
    description:
      "Lorem ipsum dolor sit amet consectetur. Integer enim ac lorem mauris at quam aenean leo amet. Platea et hendrerit velit gravida quis neque nec. Ut amet tempor quam eu mauris leo morbi amet. Nisl sed est amet tortor suspendisse nulla varius dictum.",
    url: "#",
    date: "2024-06-01",
  },
  {
    type: "comment",
    title: "Comentario",
    description:
      "Lorem ipsum dolor sit amet consectetur. Integer enim ac lorem mauris at quam aenean leo amet. Platea et hendrerit velit gravida quis neque nec. Ut amet tempor quam eu mauris leo morbi amet. Nisl sed est amet tortor suspendisse nulla varius dictum.",
    url: "#",
    date: "2024-10-17",
  },
  {
    type: "comment",
    title: "Comentario",
    description:
      "Lorem ipsum dolor sit amet consectetur. Integer enim ac lorem mauris at quam aenean leo amet. Platea et hendrerit velit gravida quis neque nec. Ut amet tempor quam eu mauris leo morbi amet. Nisl sed est amet tortor suspendisse nulla varius dictum.",
    url: "#",
    date: "2024-10-02",
  },
  {
    type: "comment",
    title: "Comentario",
    description:
      "Lorem ipsum dolor sit amet consectetur. Integer enim ac lorem mauris at quam aenean leo amet. Platea et hendrerit velit gravida quis neque nec. Ut amet tempor quam eu mauris leo morbi amet. Nisl sed est amet tortor suspendisse nulla varius dictum.",
    url: "#",
    date: "2024-04-8",
  },
  {
    type: "comment",
    title: "Comentario",
    description:
      "Lorem ipsum dolor sit amet consectetur. Integer enim ac lorem mauris at quam aenean leo amet. Platea et hendrerit velit gravida quis neque nec. Ut amet tempor quam eu mauris leo morbi amet. Nisl sed est amet tortor suspendisse nulla varius dictum.",
    url: "#",
    date: "2024-09-17",
  },
  {
    type: "comment",
    title: "Comentario",
    description:
      "Lorem ipsum dolor sit amet consectetur. Integer enim ac lorem mauris at quam aenean leo amet. Platea et hendrerit velit gravida quis neque nec. Ut amet tempor quam eu mauris leo morbi amet. Nisl sed est amet tortor suspendisse nulla varius dictum.",
    url: "#",
    date: "2024-10-10",
  },
];

const Notification = () => {
  const [isIndex, setIsIndex] = useState(0);
  const [filterList, setFilterList] = useState(listNotify);

  useEffect(() => {
    let newList = listNotify.filter((item) => {
      //console.log(item.type);
      return (
        item.type === (isIndex === 2 ? "post" : isIndex === 1 ? "comment" : "")
      );
    });
    if (newList.length === 0) {
      newList = listNotify;
    }
    //console.log(newList)
    setFilterList(newList);
  }, [isIndex]);

  //console.log(filterList);

  return (
    <LayouteMain>
      <section className=" max-w-[688px] w-full h-fit flex flex-col gap-y-5">
        {/* <ul className="bg-secondBlack-700 w-full h-[45px] rounded-xl flex items-center gap-x-5 px-4 relative overflow-hidden">
          {listFilterNotify.map((item, index) => (
            <FilterOptions
              key={index}
              link={item.link}
              name={item.name}
              index={index}
              isIndex={isIndex}
              setIsIndex={setIsIndex}
            />
          ))}
          <div
            className={`absolute top-0 ${
              isIndex === 0
                ? " left-0 w-[70px]"
                : isIndex === 1
                ? "left-16 w-[105px]"
                : "left-40 w-[85px]"
            } h-full bg-primaryGreen-950 transition-all duration-300 `}
          ></div>
        </ul> */}
        <article className="bg-secondBlack-700 w-full h-full rounded-xl overflow-hidden">
          <ul className="flex flex-col h-fit">
            {filterList.map((item, index) => (
              <CardNotification
                key={index}
                url={item.url}
                isNew={item.date}
                title={item.title}
                description={item.description}
                type={item.type}
                filter={isIndex}
              />
            ))}
          </ul>
        </article>
      </section>
    </LayouteMain>
  );
};

export default Notification;
