const AuthButton = ({name,onClick}) => {
    return (
        <button
            onClick={onClick}
            className="border border-primaryGreen-400 text-primaryGreen-400 bg-transparent px-4 py-2 rounded-md hover:bg-primaryGreen-400 hover:text-white"
        >
            {name}
        </button>
    )
}

export default AuthButton;