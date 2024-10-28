import { useEffect, useRef, useCallback } from "react";
import userFollowersStore from "../../context/users/followers-store";
import { getRoleColor } from "../../helpers/get-role-color";
import { UserTypes } from "../../utils/UserListType";

const UserList = ({ type }) => {
    const { followed, follower, loading, getFolloweds, getFollowers } = userFollowersStore();
    const users = type === UserTypes.FOLLOWED ? followed : follower;
    const observer = useRef();

    const lastUserElementRef = useCallback((node) => {
        if (loading || !users.has_more) return;

        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                const nextPage = users.page + 1;
                if (type === UserTypes.FOLLOWED) {
                    getFolloweds(nextPage);
                } else if (type === UserTypes.FOLLOWERS) {
                    getFollowers(nextPage);
                }
            }
        });

        if (node) observer.current.observe(node);
    }, [getFolloweds, getFollowers]);

    useEffect(() => {
        if (type === UserTypes.FOLLOWED) {
            getFolloweds();
        } else if (type === UserTypes.FOLLOWERS) {
            getFollowers();
        }
    }, [getFolloweds, getFollowers, type]);

    useEffect(() => {
        console.log(`${type} list updated:`, users.list);
    }, [users.list, type]);

    const desiredColumns = 4;
    const ghostDivCount = (Math.ceil(users.list.length / desiredColumns) * desiredColumns) - users.list.length;

    return (
        <section className="flex flex-wrap justify-start">
            {Array.isArray(users.list) && users.list.map((userData, index) => {
                const isLastUser = index === users.list.length - 1;

                return (
                    <div
                        ref={isLastUser ? lastUserElementRef : null}
                        key={index}
                        className="flex-grow flex-shrink basis-[calc(25%-1rem)] m-2 bg-secondBlack-700 p-2 rounded-xl min-w-[200px] max-w-[400px]"
                    >
                        <img
                            src={userData.avatar}
                            alt={userData.name}
                            className="w-16 h-16 object-cover rounded-md mb-2"
                        />
                        <h2 className="text-lg font-bold">{userData.name}</h2>
                        <div className="flex gap-3 mt-1 flex-wrap">
                            {Array.isArray(userData?.roles) && userData.roles.length > 0 ? (
                                userData.roles.map((role, index) => (
                                    <span
                                        key={index}
                                        className="text-sm text-white px-2 py-1 rounded-md border-l-2 border-white border-opacity-30 capitalize"
                                        style={{ backgroundColor: getRoleColor(role.name) }}
                                    >
                                        {role.name}
                                    </span>
                                ))
                            ) : (
                                <span>No roles available</span>
                            )}
                        </div>
                    </div>
                );
            })}

            {/* Ghost Divs */}
            {Array.from({ length: ghostDivCount }).map((_, index) => (
                <div
                    key={`ghost-${index}`}
                    className="min-w-[200px] max-w-[400px] min-h-[76px] flex-grow flex-shrink basis-[calc(25%-1rem)] m-2 invisible"
                />
            ))}

            {loading && <p className="text-center">Cargando...</p>}
        </section>
    );
};

export default UserList;
