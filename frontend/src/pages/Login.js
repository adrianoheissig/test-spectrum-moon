import axios from "axios";

const dataForm = {
    username: "Mariana",
    password: "mariana123"
};

axios.post("http://localhost:3001/api/v1/signin", dataForm).then((res) => {
    if (res.data == "Ok") {
        showSuccess("Logado Com Sucesso")
    }
}).catch((error) => {
    showError("Usuario/Senha Invalido")
})