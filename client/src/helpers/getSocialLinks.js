export const getSocialLinks = (user) => {
    const links = [];
    
    user.redes.forEach((red) => {
        if (red.github) {
            links.push({ type: 'GitHub', link: `https://github.com/${red.github}` });
        }
        if (red.linkedin) {
            links.push({ type: 'LinkedIn', link: `https://www.linkedin.com/in/${red.linkedin}` });
        }
    });

    return links;
};