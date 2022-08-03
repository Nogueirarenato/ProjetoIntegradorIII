
import React from 'react'
import { Component } from 'react';
import Url from '../../Services/apiServer';
import { getToken } from '../../Services/auth'
import 'react-bootstrap';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
import Table from 'react-bootstrap/Table'
import Placa from '../../Assets/components/Placa'
import '../../Assets/style/style.css'





class Admin extends React.Component {

    constructor() {
        super();

        this.state = {
            nome: "",
            senha: "",
            tipo: "",
            linhas: "",
            id: "",
            usuarios: [],
            placas: [],
            texto: "S120",
            cordofundo: "#ffffff",
            cor: "#191ebe",
            cordotexto: "#000000",
            sinalatual: "oitoNove"
        }
    }


    componentDidMount() {
        document.title = "CPTM - Painel"
        this.listarPlacas();
        this.listarUsers();


    }


    atualizaSinalAtual(event) {
        this.setState(
            { sinalatual: event.target.value }
        )
        // console.log(this.state.sinalatual)
    }

    atualizaCorDoTexto(event) {
        this.setState(
            { cordotexto: event.target.value }
        )
        //console.log(this.state.cordotexto)
    }

    atualizaCorDaBorda(event) {
        this.setState(
            { cor: event.target.value }
        )
        //console.log(this.state.cor)
    }


    atualizaCorDoFundo(event) {
        this.setState(
            { cordofundo: event.target.value }
        )
        //console.log(this.state.cordofundo)
    }



    atualizaTexto(event) {
        this.setState(
            { texto: event.target.value }
        )
        //console.log(this.state.texto)
    }




    atualizaNome(event) {
        this.setState(
            { nome: event.target.value }
        )
        //console.log(this.state.nome)
    }
    atualizaSenha(event) {
        this.setState({
            senha: event.target.value
        })
    }
    atualizaTipo(event) {
        this.setState({
            tipo: event.target.value
        })
    }
    atualizaLinhas(event) {

        this.setState(
            {
                linhas: event.target.value
            }
        )
        // console.log(this.state.linhas)

    }

    atualizaId(event) {

        this.setState(
            {
                id: event.target.value
            }
        )
        // console.log(this.state.linhas)

    }



    listarPlacas() {
        fetch(Url + "Placas", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem('TOKEN_KEY')
            }
        }
        ).then(response => response.json())
            .then(data => {
                // console.log(data)
                this.setState({ placas: data })
                console.log(this.state.placas)
            })
            .catch(erro => console.log(erro))
    }





    listarUsers() {
        fetch(Url + "Usuario", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem('TOKEN_KEY')
            }
        }
        ).then(response => response.json())
            .then(data => {
                // console.log(data)
                this.setState({ usuarios: data })
                console.log(this.state.usuarios)
            })
            .catch(erro => console.log(erro))
    }

    cadastrarUser(event) {

        event.preventDefault();
        let _userName = this.state.nome.toLowerCase()
        let _userLinha = parseInt(this.state.linhas)
        let _userTipo = parseInt(this.state.tipo)




        fetch(Url + "Usuario", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem('TOKEN_KEY')
            },
            body: JSON.stringify({

                "nome": _userName,
                "senha": this.state.senha,
                "tipo": _userTipo,
                "linha": _userLinha


            })
        }
        ).then(this.refresh())


    }


    cadastrarPlaca(event) {

        event.preventDefault();


        let dNow = new Date()
        var localdate = dNow.getDate() + "/" + (dNow.getMonth() + 1) + "/" + dNow.getFullYear() + " " + dNow.getHours() + ":" + dNow.getMinutes();


        fetch(Url + "Placas", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem('TOKEN_KEY')
            },
            body: JSON.stringify({

                "cor": this.state.cor,
                "cordofundo": this.state.cordofundo,
                "cordotexto": this.state.cordotexto,
                "etiqueta": this.state.texto,
                "hora": localdate,
                "observacao": "Nova Placa",
                "sinalanterior": "Não há",
                "sinalatual": this.state.sinalatual


            })
        }
        ).then(this.refresh())


    }


    deleteUser(event) {

        event.preventDefault();
        console.log(this.state.id)
        let id = parseInt(this.state.id)
        fetch(Url + "Usuario", {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem('TOKEN_KEY')
            },
            body: JSON.stringify({

                "id": id



            })
        }
        ).then(this.refresh())

    }


    deletePlaca(event) {

        event.preventDefault();
        console.log(this.state.id)
        let id = parseInt(this.state.id)
        fetch(Url + "Placas", {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem('TOKEN_KEY')
            },
            body: JSON.stringify({

                "id": id



            })
        }
        ).then(this.refresh())

    }

    refresh() {
        setTimeout(() => {
            window.location.reload()
            return false;
        }, 1000)
    }

    render() {


        return (



            <div style={{ margin: "10vh" }}>

                <h1>Lista de Usuários</h1>
                <Table striped bordered hover size="sm" responsive style={{ width: '50vw' }}>
                    <thead><tr><th style={{ textAlign: 'center' }}>id</th><th>Usuário</th><th>senha</th><th style={{ textAlign: 'center' }}>Tipo</th><th style={{ textAlign: 'center' }}>Linhas</th>
                        <th style={{ textAlign: 'center' }}>Ações</th></tr></thead><tbody>

                        {
                            this.state.usuarios.map(item => {
                                if (item.linha == '89') item.linha = '8 e 9'
                                if (item.linha == '710') item.linha = '7 e 10'
                                if (item.linha == '1112') item.linha = '11 e 12'
                                if (item.tipo == '2') item.tipo = 'Administrador'
                                if (item.tipo == '1' || item.tipo == '3' || item.tipo == '4') item.tipo = 'Controlador'

                                // console.log(item)
                                return (
                                    <tr key={item.id}><td style={{ textAlign: 'center' }} >{item.id}</td><td>{item.nome}</td><td>{item.senha}</td>
                                        <td style={{ textAlign: 'center' }}>{item.tipo}</td><td style={{ textAlign: 'center' }}>{item.linha}</td><td><form onSubmit={this.deleteUser.bind(this)} ><input type="submit" value='Deletar' onClick={() => this.setState({ id: item.id })}></input></form></td>
                                    </tr>


                                )
                            })
                        }

                    </tbody></Table>


                <h1>Inserir Usuário</h1>

                <form onSubmit={this.cadastrarUser.bind(this)}>
                    <input type="text" placeholder="Nome" onChange={this.atualizaNome.bind(this)} />
                    <input type="text" placeholder="Senha" onChange={this.atualizaSenha.bind(this)} />


                    <select value={this.state.value} name="option" onChange={this.atualizaTipo.bind(this)}>
                        <option value="" disabled selected>Tipo</option>
                        <option value="1">Usuário</option>
                        <option value="2">Administrador</option>

                    </select>

                    <select value={this.state.value} name="option" onChange={this.atualizaLinhas.bind(this)}>
                        <option value="" disabled selected >Linhas</option>
                        <option value="710" >7 e 10</option>
                        <option value="89">8 e 9</option>
                        <option value="1112">11 e 12</option>
                    </select>

                    <input type="submit" value="Cadastrar" />

                </form>


                <h1>Lista de Placas</h1>
                <Table striped bordered hover size="sm" responsive style={{ width: '80vw', textAlign: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <thead><tr><th style={{ textAlign: 'center' }}>id</th><th>Placa</th><th>Texto</th><th>Cor do fundo</th><th style={{ textAlign: 'center' }}>Cor do Texto</th><th style={{ textAlign: 'center' }}>Cor da Borda</th>
                        <th style={{ textAlign: 'center' }}>Sinal Anterior</th><th style={{ textAlign: 'center' }}>Sinal Atual</th><th style={{ textAlign: 'center' }}>Ultima Movimentação</th><th style={{ textAlign: 'center' }}>Observação</th><th>Ações</th></tr></thead><tbody>

                        {
                            this.state.placas.map(item => {


                                // console.log(item)
                                return (
                                    <tr key={item.id} style={{ height: '7vh' }}><td style={{ textAlign: 'center' }}>{item.id}</td>

                                        <td>
                                            <Placa id={item.id} cordaborda={item.cor} cordofundo={item.cordofundo} texto={item.etiqueta} cordotexto={item.cordotexto} /></td>


                                        <td>{item.etiqueta}</td><td>{item.cordofundo}</td>
                                        <td style={{ textAlign: 'center' }}>{item.cordotexto}</td><td style={{ textAlign: 'center' }}>{item.cor}</td><td>{item.sinalanterior}</td><td>{item.sinalatual}</td><td>{item.hora}</td><td>{item.observacao}</td><td><form onSubmit={this.deletePlaca.bind(this)} ><input type="submit" value='Deletar' onClick={() => this.setState({ id: item.id })}></input></form></td>
                                    </tr>


                                )
                            })
                        }

                    </tbody></Table>




                <h1>Inserir Placa</h1>

                <form onSubmit={this.cadastrarPlaca.bind(this)}>
                    <input type="text" placeholder="Texto" onChange={this.atualizaTexto.bind(this)} />
                    <input type="color" name="Cor do Fundo" onChange={this.atualizaCorDoFundo.bind(this)} value="#fbf9f9" />
                    <label htmlFor="Cor do Fundo">Cor do Fundo</label>
                    <input type="color" name="Cor do Texto" onChange={this.atualizaCorDoTexto.bind(this)} value="#050505" />
                    <label htmlFor="Cor do Texto">Cor do Texto</label>
                    <input type="color" name="Cor da Borda" onChange={this.atualizaCorDaBorda.bind(this)} value="#2024a2" />
                    <label htmlFor="Cor do Borda">Cor da Borda</label>

                    <select value={this.state.value} name="option" onChange={this.atualizaSinalAtual.bind(this)}>
                        <option value="" disabled selected >Linhas</option>
                        <option value="seteDez" >7 e 10</option>
                        <option value="oitoNove">8 e 9</option>
                        <option value="onzeDoze">11 e 12</option>
                    </select>



                    <input type="submit" value="Cadastrar" />

                </form>

                <h1>Placa</h1>


                <Placa cordaborda={this.state.cor}
                    cordofundo={this.state.cordofundo}
                    texto={this.state.texto}
                    cordotexto={this.state.cordotexto}

                />






            </div>




        )


    }


}


export default Admin;