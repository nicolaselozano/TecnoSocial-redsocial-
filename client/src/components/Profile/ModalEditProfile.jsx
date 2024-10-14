import React, { useState } from 'react';

const EditProfileModal = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    name: 'Manuel Rodríguez',
    username: 'manuRod687',
    country: 'Estados Unidos',
    description: 'Recibido en la UNLAM | Javascript | CSS',
    roles: ['Frontend', 'Backend'],
    email: 'manuel121@gmail.com',
    socialLinks: {
      github: 'www.github.com',
      linkedin: 'www.linkedin.com',
      facebook: 'www.facebook.com',
      instagram: 'www.instagram.com',
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSocialLinkChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      socialLinks: { ...prevData.socialLinks, [name]: value },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos actualizados:', formData);
    handleClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-secondBlack-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-secondBlack-700 p-2 rounded-lg shadow-lg w-1/3 max-w-md h-auto">
        <h2 className="text-sm font-bold text-primaryGreen-400 mb-2">Editar perfil</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block text-secondBlack-100 text-xs font-bold mb-1" htmlFor="name">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border border-secondBlack-400 rounded w-full py-1 px-1 bg-secondBlack-700 text-secondBlack-100 leading-tight focus:outline-none focus:border-primaryGreen-400 text-xs"
            />
          </div>

          <div className="mb-2">
            <label className="block text-secondBlack-100 text-xs font-bold mb-1" htmlFor="username">
              Usuario
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="shadow appearance-none border border-secondBlack-400 rounded w-full py-1 px-1 bg-secondBlack-700 text-secondBlack-100 leading-tight focus:outline-none focus:border-primaryGreen-400 text-xs"
            />
          </div>

          <div className="mb-2">
            <label className="block text-secondBlack-100 text-xs font-bold mb-1" htmlFor="country">
              País
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="shadow appearance-none border border-secondBlack-400 rounded w-full py-1 px-1 bg-secondBlack-700 text-secondBlack-100 leading-tight focus:outline-none focus:border-primaryGreen-400 text-xs"
            >
              <option>Argentina</option>
              <option>Chile</option>
              <option>Uruguay</option>
              <option>Canadá</option>
              <option>Estados Unidos</option>
            </select>
          </div>

          <div className="mb-2">
            <label className="block text-secondBlack-100 text-xs font-bold mb-1" htmlFor="description">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              rows="1"
              value={formData.description}
              onChange={handleChange}
              className="shadow appearance-none border border-secondBlack-400 rounded w-full py-1 px-1 bg-secondBlack-700 text-secondBlack-100 leading-tight focus:outline-none focus:border-primaryGreen-400 text-xs"
            ></textarea>
          </div>

          <div className="mb-2">
            <label className="block text-secondBlack-100 text-xs font-bold mb-1">Rol</label>
            <div className="flex space-x-1">
              {formData.roles.map((role, index) => (
                <span
                  key={index}
                  className="inline-block bg-primaryGreen-400 text-secondBlack-900 text-xs font-semibold rounded-full px-2 py-1"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-2">
            <label className="block text-secondBlack-100 text-xs font-bold mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border border-secondBlack-400 rounded w-full py-1 px-1 bg-secondBlack-700 text-secondBlack-100 leading-tight focus:outline-none focus:border-primaryGreen-400 text-xs"
            />
          </div>

          <div className="mb-2">
            <label className="block text-secondBlack-100 text-xs font-bold mb-1">Redes sociales</label>
            <input
              type="text"
              name="github"
              placeholder="Github"
              value={formData.socialLinks.github}
              onChange={handleSocialLinkChange}
              className="shadow appearance-none border border-secondBlack-400 rounded w-full py-1 px-1 bg-secondBlack-700 text-secondBlack-100 leading-tight focus:outline-none focus:border-primaryGreen-400 mb-1 text-xs"
            />
            <input
              type="text"
              name="linkedin"
              placeholder="LinkedIn"
              value={formData.socialLinks.linkedin}
              onChange={handleSocialLinkChange}
              className="shadow appearance-none border border-secondBlack-400 rounded w-full py-1 px-1 bg-secondBlack-700 text-secondBlack-100 leading-tight focus:outline-none focus:border-primaryGreen-400 mb-1 text-xs"
            />
            <input
              type="text"
              name="facebook"
              placeholder="Facebook"
              value={formData.socialLinks.facebook}
              onChange={handleSocialLinkChange}
              className="shadow appearance-none border border-secondBlack-400 rounded w-full py-1 px-1 bg-secondBlack-700 text-secondBlack-100 leading-tight focus:outline-none focus:border-primaryGreen-400 mb-1 text-xs"
            />
            <input
              type="text"
              name="instagram"
              placeholder="Instagram"
              value={formData.socialLinks.instagram}
              onChange={handleSocialLinkChange}
              className="shadow appearance-none border border-secondBlack-400 rounded w-full py-1 px-1 bg-secondBlack-700 text-secondBlack-100 leading-tight focus:outline-none focus:border-primaryGreen-400 text-xs"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="bg-secondBlack-400 hover:bg-secondBlack-100 text-white py-1 px-2 rounded mr-1"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="border border-primaryGreen-400 text-primaryGreen-400 bg-transparent px-4 py-2 rounded-md hover:bg-primaryGreen-400 hover:text-white"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );

}

export default EditProfileModal;
