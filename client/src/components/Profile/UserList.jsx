import { useEffect, useRef, useCallback } from "react";
import { getRoleColor } from "../../helpers/get-role-color";
import useStore from '../../context/users/follows-store';

const UserList = () => {
    const { followed, fetchUserFollowed, page, loading, has_more } = useStore();
    const observer = useRef();

    const lastUserElementRef = useCallback(
        (node) => {
            if (loading || !has_more) return;

            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && has_more) {
                    fetchUserFollowed(page + 1);
                }
            });

            if (node) observer.current.observe(node);
        },
        [loading, has_more, fetchUserFollowed, page]
    );

    useEffect(() => {
        const fetchData = async () => {
            await fetchUserFollowed();
        }
        fetchData();
    }, [fetchUserFollowed]);

    useEffect(() => {
        console.log("Followed list updated:", followed);
    }, [followed]);

    const desiredColumns = 4; // Número de columnas deseadas
    const ghostDivCount = (Math.ceil(followed.list.length / desiredColumns) * desiredColumns) - followed.list.length;

    return (
        <section className="flex flex-wrap justify-start">
            {followed.list.map((userData, key) => {
                const { user } = userData;
                const isLastUser = key === followed.list.length - 1;

                return (
                    <div
                        ref={isLastUser ? lastUserElementRef : null}
                        key={key}
                        className="flex-grow flex-shrink basis-[calc(25%-1rem)] m-2 bg-secondBlack-700 p-2 rounded-xl min-w-[200px] max-w-[400px]"
                    >
                        <img
                            src={user.avatar}
                            alt={`${user.name}'s avatar`}
                            className="w-16 h-16 rounded-md mb-2"
                        />
                        <h2 className="text-lg font-bold">{user.name}</h2>
                        <div className="flex gap-3 mt-1 flex-wrap">
                            {Array.isArray(user.roles) && user.roles.length > 0 ? (
                                user.roles.map((role, index) => (
                                    <span
                                        key={index}
                                        className="text-sm text-white px-2 py-1 rounded-md border-l-2 border-white border-opacity-30 capitalize"
                                        style={{ backgroundColor: getRoleColor(role) }}
                                    >
                                        {role}
                                    </span>
                                ))
                            ) : (
                                <span>No roles available</span>
                            )}
                        </div>
                    </div>
                );
            })}

            {/* Divs fantasmas */}
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
