import { Component } from 'react';
import React from 'react'
import Url from '../../Services/apiServer';
import '../../Assets/style/style.css'



class Login extends Component {


    constructor() {
        super();
        this.state = {
            user: "",
            senha: "",
            userLogado: "",
            erro: ""
        }
    }
    componentDidMount() {
        document.title = "CPTM - Login"
        this.setState({ erro: "" })
    }








    realizaLogin(event) {
        event.preventDefault();


        let user = {

            nome: this.state.user.toLowerCase(),
            senha: this.state.senha

        }

        fetch(Url + "Login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        }
        ).then(console.log(user))
            .then(response => response.json())
            .then(data => {
                if (data.token) {
                    localStorage.setItem("TOKEN_KEY", data.token)
                    this.setState({ erro: "Logado" })
                    this.props.history.push('/Menu')

                }
                else (this.setState({ erro: "Usuário ou Senha Inválidos" }))
                console.log("entrou")

            })
    }

    atualizaEstadoUser(event) {
        this.setState({ user: event.target.value });
        console.log(this.state.user)

    }
    atualizaEstadoSenha(event) {
        this.setState({ senha: event.target.value });
    }

    abrirVisualizar89(){
        let route = './MenuView'
        this.props.history.push(route); 
    }

    render() {
        return (

            

                <div id="containerPageLogin">

                    <div id="containerLogin">

                    <h1 className="h1_login"> Quadro Digital</h1>
                    <h2 className="h2_Login">Presidente Altino</h2>



                    <form classname={'formLogin'}onSubmit={this.realizaLogin.bind(this)}>
                        <input className="inputLogin" name="email" placeholder="Usuario" type="text" onChange={this.atualizaEstadoUser.bind(this)}
                            value={this.state.user} />
                        <input className="inputLogin" type="password" name="pass" placeholder="Senha" onChange={this.atualizaEstadoSenha.bind(this)}
                            value={this.state.senha} />
                        <button className="buttonLogin buttonLogin-animated buttonLogin-white " type="submit" name='Login'><p className={'preto'}>Login</p></button>
                        
                        
                    </form>
                    <form onSubmit>
                    <input className="buttonLogin buttonLogin-animated buttonLogin-white preto" id='1_menu' type="submit" value="Apenas Visualizar " onClick={this.abrirVisualizar89.bind(this)} />

                    </form>

                    <h2 className="h2_Login" style={{ fontSize: "1.5em", margin: "3%" }}>{this.state.erro}</h2>
                    </div>
                </div>
           


        )
    }
}

export default Login;
