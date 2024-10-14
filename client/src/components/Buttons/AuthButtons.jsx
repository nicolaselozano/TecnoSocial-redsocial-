const AuthButton = ({name,onClick}) => {
    return (
        <button
            onClick={onClick}
            className="p-2 bg-blue-500 text-white rounded"
        >
            {name}
        </button>
    )
}

export default AuthButton;