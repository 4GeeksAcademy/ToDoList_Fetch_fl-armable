const SignUp = ({shareUser}) => {
let user = "";
const enviarAHome = (newUser) => {
    shareUser(newUser);
};

return (
    <>
        {user.length > 0 ? (
            <div className="box">
                <span className="">Usuario:&nbsp;<strong>{user}</strong>  </span>
                <button>Salir</button>
                <button>Borrar usuario</button>
            </div>
        ) : (
            <div className="box">
                <span className="">Usuario:&nbsp;</span>
                <input
                    id='userInput'
                    className=''
                    type="text"
                    placeholder="Ingrese un usuario"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.target.value.trim() !== '') {
                            user = e.target.value.trim();
                            e.target.value = '';
                            enviarAHome(user); // Usa el valor directamente
                            console.log(user);
                        }
                    }}
                />
            </div>
        )}
    </>
);
}

export default SignUp;