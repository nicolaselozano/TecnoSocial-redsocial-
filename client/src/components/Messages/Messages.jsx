import { useEffect, useState } from "react";
import userFollowersStore from "../../context/users/followers-store";
import { MessagePanel } from "./MessagePanel";
import { MessageSidebar } from "./MessageSidebar";

export function Messages() {
  const { getFollowers, getFolloweds, follower, followed } = userFollowersStore();
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {

    const fetchUserData = async () => {
      setIsLoading(true);
      await getFollowers();
      await getFolloweds();
      setIsLoading(false);
    };
    fetchUserData();

  }, []);

  const handleSelectUser = (userId) => {
    console.log(followed.list);
    
    const user = followed.list.find((user) => user.authId === userId);

    setCurrentUser(user);

  }
  return (
    <div className="flex h-[500px] bg-gray-900 text-white"> {/* // en vez de [500px] puede ir screen */}
      <MessageSidebar userList={followed.list || []} handleUser={handleSelectUser} />
      {
        !isLoading && currentUser ?      
        <MessagePanel currentUser={currentUser} /> :
        <div></div>
      }

    </div>
  );
}

export default Messages;
