export const getNotification = async (page) => {
  try {
    const data = await import(`../../data/notify/notification-pages/notifitations-page${page}.json`);
    return data.default;
  } catch (error) {
    console.log(error.message);
  }
};
