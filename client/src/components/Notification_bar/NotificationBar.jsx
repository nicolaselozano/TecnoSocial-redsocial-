import React from 'react';

export const NotificationBar = () => {
  return (
    <section className="flex-col p-4 bg-gray-800 text-white rounded-xl w-80">
      <h1 className="text-2xl font-bold">Notificaciones</h1>
      
      <div className="flex gap-3 mt-3">
        <div className="bg-green-700 min-w-11 h-11 grid place-content-center rounded-lg">
          <span>.</span>
        </div>
        <div className="flex-col text-xs">
          <h2 className="font-bold">Nuevo evento</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
        </div>
      </div>

      <div className="flex gap-3 mt-3">
        <div className="bg-yellow-600 min-w-11 h-11 grid place-content-center rounded-lg">
          <span>.</span>
        </div>
        <div className="flex-col text-xs">
          <h2 className="font-bold">Nuevo mensaje</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
        </div>
      </div>

      <div className="flex gap-3 mt-3">
        <div className="bg-purple-900 min-w-11 h-11 grid place-content-center rounded-lg">
          <span>.</span>
        </div>
        <div className="flex-col text-xs">
          <h2 className="font-bold">Posteo Alverto</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
        </div>
      </div>

      <div className="flex gap-3 mt-3">
        <div className="bg-yellow-600 min-w-11 h-11 grid place-content-center rounded-lg">
          <span>.</span>
        </div>
        <div className="flex-col text-xs">
          <h2 className="font-bold">Nuevo mensaje</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
        </div>
      </div>

      <a className="text-green-500" href="#">Ver más</a>
    </section>
  );
}

export default NotificationBar;
