import { getRoleColor } from "../../helpers/get-role-color";

const UserList = ({
    users
}) => {

    const totalDivs = users.length > 10 ? 0 : 10 ; // Total de divs fantasmas
    const ghostDivCount = Math.max(totalDivs - users.length, 0);

    return (
        <section className="flex flex-wrap justify-start">
            {users.map((user, key) => (
                <div
                    key={key}
                    className="flex-grow flex-shrink basis-[calc(25%-1rem)] m-2 bg-secondBlack-700 p-2 rounded-xl min-w-[200px] max-w-[400px]"
                >
                    <h2 className="text-lg font-bold">{user.name}</h2>
                    <div className="flex gap-3 mt-1 flex-wrap">
                        {user.roles.map((role, index) => (
                            <span
                                key={index}
                                className={`text-sm px-2 py-1 rounded-md border-l-2 border-white border-opacity-30 capitalize`}
                                style={{ backgroundColor: getRoleColor(role) }}
                            >
                                {role}
                            </span>
                        ))}
                    </div>
                </div>
            ))}

            {Array.from({ length: ghostDivCount }).map((_, index) => (
                <div
                    key={`ghost-${index}`}
                    className="min-w-[200px] max-w-[400px] min-h-[76px]
                    flex-grow flex-shrink basis-[calc(25%-1rem)] m-2 invisible"
                />
            ))}
        </section>
    );
};

export default UserList;
