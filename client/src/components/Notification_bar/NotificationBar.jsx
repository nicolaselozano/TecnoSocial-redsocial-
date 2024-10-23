import React, { useEffect, useState } from "react";
import { AiOutlineComment } from "react-icons/ai";
import { getNotification } from "../../services/Notification/get-notifications";
import { Link } from "react-router-dom";

export const NotificationBar = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [listNotifications, setListNotifications] = useState([]);

  const handlesGetNotifications = async () => {
    const list = await getNotification(1);
    //setTotalPage(list.totalpage);
    /* if (isPage < list.totalpage) {
      setIsLoading(false);
      setListNotifications((prev) => [...prev, ...list.notifications]);
    } */
    setListNotifications((prev) => [...prev, ...list.notifications]);
    //console.log(list.notifications);
  };



  useEffect(() => {
    handlesGetNotifications();
    //handleModificationList(listNotifications);
  }, []);

  //console.log(listNotifications.slice(-4));

  return (
    <section className="flex flex-col p-3 bg-secondBlack-700 text-white rounded-xl w-full h-fit gap-y-4">
      <h3 className="text-2xl font-bold">Notificaciones</h3>
      <ul className="flex flex-col gap-y-3">
        {listNotifications.slice(-4).map((item, index) => (
          <Link to={item.url} className="flex items-start gap-x-3 w-full h-fit" key={index}>
            <div className="size-[55px] bg-gradient-to-tl from-[#4356AA] to-[#22255A] rounded-xl flex items-center justify-center">
              <AiOutlineComment className="text-white size-6" />
            </div>
            <div className="flex-col h-full w-[65%] ">
              <h2 className="font-semibold text-base ">{item.title}</h2>
              <p className=" font-normal text-sm w-[150px]">{item.description.slice(0,50)} . . .</p>
            </div>
          </Link>
        ))}
      </ul>

      <Link
        className="text-primaryGreen-400 font-normal text-xs border-b border-primaryGreen-400 w-fit"
        to="/notifications"
      >
        Ver más
      </Link>
    </section>
  );
};

export default NotificationBar;
