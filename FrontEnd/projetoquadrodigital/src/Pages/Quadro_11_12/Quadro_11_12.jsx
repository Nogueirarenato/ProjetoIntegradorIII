import React, { Component } from 'react'
import "../../Assets/style/styleLuz.css"
import Url from '../../Services/apiServer';
import 'react-bootstrap';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
import Table from 'react-bootstrap/Table'
import Placa from '../../Assets/components/Placa'
import '../../Assets/style/style.css'
import Drop from '../../Assets/components/Drop'
import Drag from '../../Assets/components/Drag'
import DropDel from '../../Assets/components/DropDel'
import Trash from '../../Assets/Images/trash.png'
import { withRouter } from 'react-router';




class Quadro_11_12 extends Component {
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
            cor: "#660066",
            cordotexto: "#000000",
            sinalatual: "onzeDoze",
            contador:""
        }
    }

    componentDidMount() {
        document.title = "CPTM - Painel"
        this.listarPlacas();
        this.autoAtualiza();
        this.atualizaContador();
        
    }

    atualizaContador(){
        var contadorMin = 601;
        setInterval(()=>{
            contadorMin = contadorMin -1;
            this.setState({contador: contadorMin})
        }, 1000)
        
    }

    autoAtualiza(){
        setInterval(()=>{this.refresh()}, 600000)
    }

    atualizaSinalAtual(event) {
        this.setState(
            { sinalatual: event.target.value }
        )
        // console.log(this.state.sinalatual)
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
                "observacao": "Este campo é editável",
                "sinalanterior": "Não há",
                "sinalatual": this.state.sinalatual


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

    temTrem(item, local) {









    }


    render() {


        return (
            //Inicio do Programa
            <div style={{margin: '2%', zoom: '80%', maxWidth: '100vw', fontWeight: '800', fontSize: '1.1em'}}>
                <table class="tableizer-table" style={{minWidth: '100vw'}}>
<thead><tr><th colSpan="5" className="center">PÁTEO LUZ</th><th style={{backgroundColor: 'white', borderBottom: '1px solid rgba(6, 185, 6, 0)', borderTop: '1px solid rgba(6, 185, 6, 0)' } } className="inv">_</th><th colSpan="2" className="center">Trens em Operação</th><th style={{backgroundColor: 'white', borderBottom: '1px solid rgba(6, 185, 6, 0)', borderTop: '1px solid rgba(6, 185, 6, 0)' } } className="inv">_</th><th colSpan="2" className="center">Manutenção</th></tr></thead><tbody>
 <tr><td className="am">GRANDE</td><td className="am inv"><Drop id="11_001">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_001") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td>
<td className="am inv"><Drop id="11_002">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_002") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_003">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_003") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_004">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_004") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td style={{backgroundColor: 'white', borderBottom: '1px solid rgba(6, 185, 6, 0)', borderTop: '1px solid rgba(6, 185, 6, 0)' } } className="inv">_</td><td className="az inv"><Drop id="11_005">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_005") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="az inv"><Drop id="11_006">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_006") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td style={{backgroundColor: 'white', borderBottom: '1px solid rgba(6, 185, 6, 0)', borderTop: '1px solid rgba(6, 185, 6, 0)' } } className="inv">_</td><td className="vd inv"><Drop id="11_007">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_007") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="vd inv"><Drop id="11_008">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_008") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td></tr>
 <tr><td className="am" >PARALELA</td><td className="am inv"><Drop id="11_009">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_009") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_010">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_010") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_011">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_011") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_012">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_012") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td style={{backgroundColor: 'white', borderBottom: '1px solid rgba(6, 185, 6, 0)', borderTop: '1px solid rgba(6, 185, 6, 0)' } } className="inv">_</td><td className="az inv"><Drop id="11_013">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_013") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="az inv"><Drop id="11_014">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_014") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td style={{backgroundColor: 'white', borderBottom: '1px solid rgba(6, 185, 6, 0)', borderTop: '1px solid rgba(6, 185, 6, 0)' } } className="inv">_</td><td className="vd inv"><Drop id="11_015">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_015") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="vd inv"><Drop id="11_016">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_016") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td></tr>
 <tr><td className="am">VIRADOR</td><td className="am inv"><Drop id="11_017">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_017") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_018">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_018") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_019">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_019") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_020">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_020") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td style={{backgroundColor: 'white', borderBottom: '1px solid rgba(6, 185, 6, 0)', borderTop: '1px solid rgba(6, 185, 6, 0)' } } className="inv">_</td><td className="az inv"><Drop id="11_021">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_021") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="az inv"><Drop id="11_022">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_022") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td style={{backgroundColor: 'white', borderBottom: '1px solid rgba(6, 185, 6, 0)', borderTop: '1px solid rgba(6, 185, 6, 0)' } } className="inv">_</td><td className="vd inv"><Drop id="11_023">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_023") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="vd inv"><Drop id="11_024">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_024") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td></tr>
 <tr><td className="am">AREIEIRO</td><td className="am inv"><Drop id="11_025">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_025") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_026">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_026") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_027">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_027") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_028">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_028") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td style={{backgroundColor: 'white', borderBottom: '1px solid rgba(6, 185, 6, 0)', borderTop: '1px solid rgba(6, 185, 6, 0)' } } className="inv">_</td><td className="az inv"><Drop id="11_029">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_029") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="az inv"><Drop id="11_030">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_030") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td style={{backgroundColor: 'white', borderBottom: '1px solid rgba(6, 185, 6, 0)', borderTop: '1px solid rgba(6, 185, 6, 0)' } } className="inv">_</td><td className="vd inv"><Drop id="11_031">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_031") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="vd inv"><Drop id="11_032">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_032") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td></tr>
 <tr><td className="am">ELEVADOR</td><td className="am inv"><Drop id="11_033">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_033") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_034">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_034") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_035">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_035") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_036">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_036") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td style={{backgroundColor: 'white', borderBottom: '1px solid rgba(6, 185, 6, 0)', borderTop: '1px solid rgba(6, 185, 6, 0)' } } className="inv">_</td><td className="az inv"><Drop id="11_037">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_037") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="az inv"><Drop id="11_038">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_038") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td style={{backgroundColor: 'white', borderBottom: '1px solid rgba(6, 185, 6, 0)', borderTop: '1px solid rgba(6, 185, 6, 0)' } } className="inv">_</td><td className="vd inv"><Drop id="11_039">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_039") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="vd inv"><Drop id="11_040">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_040") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td></tr>
 <tr><td className="am2">MEIO DA GRANDE</td><td className="am2 inv"><Drop id="11_041">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_041") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am2 inv"><Drop id="11_042">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_042") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am2 inv"><Drop id="11_043">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_043") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am2 inv"><Drop id="11_044">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_044") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td style={{backgroundColor: 'white', borderBottom: '1px solid rgba(6, 185, 6, 0)', borderTop: '1px solid rgba(6, 185, 6, 0)' } } className="inv">_</td><td className="az inv"><Drop id="11_045">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_045") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="az inv"><Drop id="11_046">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_046") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td style={{backgroundColor: 'white', borderBottom: '1px solid rgba(6, 185, 6, 0)', borderTop: '1px solid rgba(6, 185, 6, 0)' } } className="inv">_</td><td className="vd inv"><Drop id="11_047">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_047") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="vd inv"><Drop id="11_048">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_048") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td></tr>
 <tr><td className="am2">COMETA</td><td className="am2 inv"><Drop id="11_049">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_049") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am2 inv"><Drop id="11_050">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_050") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am2 inv"><Drop id="11_051">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_051") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am2 inv"><Drop id="11_052">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_052") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td style={{backgroundColor: 'white', borderBottom: '1px solid rgba(6, 185, 6, 0)', borderTop: '1px solid rgba(6, 185, 6, 0)' } } className="inv">_</td><td className="az inv"><Drop id="11_053">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_053") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="az inv"><Drop id="11_054">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_054") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td style={{backgroundColor: 'white', borderBottom: '1px solid rgba(6, 185, 6, 0)', borderTop: '1px solid rgba(6, 185, 6, 0)' } } className="inv">_</td><td className="vd inv"><Drop id="11_055">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_055") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="vd inv"><Drop id="11_056">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_056") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td></tr>
 <tr><td className="am3">P1</td><td className="am3 inv"><Drop id="11_057">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_057") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am3 inv"><Drop id="11_058">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_058") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am3 inv"><Drop id="11_059">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_059") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am3 inv"><Drop id="11_060">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_060") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td style={{backgroundColor: 'white', borderBottom: '1px solid rgba(6, 185, 6, 0)', borderTop: '1px solid rgba(6, 185, 6, 0)' } } className="inv">_</td><td className="az inv"><Drop id="11_061">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_061") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="az inv"><Drop id="11_062">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_062") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td style={{backgroundColor: 'white', borderBottom: '1px solid rgba(6, 185, 6, 0)', borderTop: '1px solid rgba(6, 185, 6, 0)' } } className="inv">_</td><td className="vd inv"><Drop id="11_063">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_063") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="vd inv"><Drop id="11_064">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_064") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td></tr>
 <tr><td className="am3">MEIO DA PEQUENA</td><td className="am3 inv"><Drop id="11_065">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_065") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am3 inv"><Drop id="11_066">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_066") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am3 inv"><Drop id="11_067">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_067") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am3 inv"><Drop id="11_068">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_068") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td style={{backgroundColor: 'white', borderBottom: '1px solid rgba(6, 185, 6, 0)', borderTop: '1px solid rgba(6, 185, 6, 0)' } } className="inv">_</td><td className="az inv"><Drop id="11_069">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_069") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="az inv"><Drop id="11_070">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_070") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td style={{backgroundColor: 'white', borderBottom: '1px solid rgba(6, 185, 6, 0)', borderTop: '1px solid rgba(6, 185, 6, 0)' } } className="inv">_</td><td className="vd inv"><Drop id="11_071">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_071") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="vd inv"><Drop id="11_072">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_072") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td></tr>
 <tr><td className="am3">PS4</td><td className="am3 inv"><Drop id="11_080">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_080") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am3 inv"><Drop id="11_073">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_073") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am3 inv"><Drop id="11_074">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_074") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am3 inv"><Drop id="11_075">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_075") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td style={{backgroundColor: 'white', borderBottom: '1px solid rgba(6, 185, 6, 0)', borderTop: '1px solid rgba(6, 185, 6, 0)' } } className="inv">_</td><td className="az inv"><Drop id="11_076">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_076") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="az inv"><Drop id="11_077">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_077") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td style={{backgroundColor: 'white', borderBottom: '1px solid rgba(6, 185, 6, 0)', borderTop: '1px solid rgba(6, 185, 6, 0)' } } className="inv">_</td><td className="vd inv"><Drop id="11_078">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_078") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="vd inv"><Drop id="11_079">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_079") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td></tr>
 <tr><td className="am">ATRÁS DA OFICINA</td><td className="am inv"><Drop id="11_081">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_081") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_082">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_082") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_083">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_083") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_084">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_084") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td style={{backgroundColor: 'white', borderBottom: '1px solid rgba(6, 185, 6, 0)', borderTop: '1px solid rgba(6, 185, 6, 0)' } } className="inv">_</td><td className="az inv"><Drop id="11_085">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_085") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="az inv"><Drop id="11_086">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_086") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td style={{backgroundColor: 'white', borderBottom: '1px solid rgba(6, 185, 6, 0)', borderTop: '1px solid rgba(6, 185, 6, 0)' } } className="inv">_</td><td className="vd inv"><Drop id="11_087">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_087") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="vd inv"><Drop id="11_088">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_088") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td></tr>
 <tr><td className="am">TANQUE</td><td className="am inv"><Drop id="11_089">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_089") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_090">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_090") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_091">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_091") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_092">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_092") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td style={{backgroundColor: 'white', borderBottom: '1px solid rgba(6, 185, 6, 0)', borderTop: '1px solid rgba(6, 185, 6, 0)' } } className="inv">_</td><td className="az inv"><Drop id="11_093">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_093") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="az inv"><Drop id="11_094">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_094") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td style={{backgroundColor: 'white', borderBottom: '1px solid rgba(6, 185, 6, 0)', borderTop: '1px solid rgba(6, 185, 6, 0)' } } className="inv">_</td><td className="vd inv"><Drop id="11_095">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_095") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="vd inv"><Drop id="11_096">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_096") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td></tr>
 <tr><td className="am">TANQUINHO</td><td className="am inv"><Drop id="11_097">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_097") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_098">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_098") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_099">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_099") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_100">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_100") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td style={{backgroundColor: 'white', borderBottom: '1px solid rgba(6, 185, 6, 0)', borderTop: '1px solid rgba(6, 185, 6, 0)' } } className="inv">_</td><td className="az inv"><Drop id="11_101">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_101") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="az inv"><Drop id="11_102">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_102") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td style={{backgroundColor: 'white', borderBottom: '1px solid rgba(6, 185, 6, 0)', borderTop: '1px solid rgba(6, 185, 6, 0)' } } className="inv">_</td><td className="vd inv"><Drop id="11_103">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_103") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="vd inv"><Drop id="11_104">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_104") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td></tr>
 <tr><td className="am">LINHA 9</td><td className="am inv"><Drop id="11_105">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_105") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_106">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_106") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_107">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_107") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_108">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_108") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td style={{backgroundColor: 'white', borderBottom: '1px solid rgba(6, 185, 6, 0)', borderTop: '1px solid rgba(6, 185, 6, 0)' } } className="inv">_</td><td className="az inv"><Drop id="11_109">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_109") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="az inv"><Drop id="11_110">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_110") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td style={{backgroundColor: 'white', borderBottom: '1px solid rgba(6, 185, 6, 0)', borderTop: '1px solid rgba(6, 185, 6, 0)' } } className="inv">_</td><td className="vd inv"><Drop id="11_111">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_111") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="vd inv"><Drop id="11_112">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_112") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td></tr>
 <tr><td className="am">LINHA 8</td><td className="am inv"><Drop id="11_113">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_113") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_114">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_114") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_115">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_115") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_116">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_116") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td style={{backgroundColor: 'white', borderBottom: '1px solid rgba(6, 185, 6, 0)', borderTop: '1px solid rgba(6, 185, 6, 0)' } } className="inv">_</td><td className="az inv"><Drop id="11_117">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_117") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="az inv"><Drop id="11_118">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_118") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td style={{backgroundColor: 'white', borderBottom: '1px solid rgba(6, 185, 6, 0)', borderTop: '1px solid rgba(6, 185, 6, 0)' } } className="inv">_</td><td className="vd inv"><Drop id="11_119">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_119") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="vd inv"><Drop id="11_120">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_120") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td></tr>
 <tr><td className="am">LINHA 7</td><td className="am inv"><Drop id="11_121">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_121") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_122">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_122") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_123">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_123") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_124">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_124") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td style={{backgroundColor: 'white', borderBottom: '1px solid rgba(6, 185, 6, 0)', borderTop: '1px solid rgba(6, 185, 6, 0)' } } className="inv">_</td><td className="az inv"><Drop id="11_125">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_125") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="az inv"><Drop id="11_126">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_126") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td style={{backgroundColor: 'white', borderBottom: '1px solid rgba(6, 185, 6, 0)', borderTop: '1px solid rgba(6, 185, 6, 0)' } } className="inv">_</td><td className="vd inv"><Drop id="11_127">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_127") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="vd inv"><Drop id="11_128">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_128") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td></tr>
 <tr><td className="am">LINHA 5</td><td className="am inv"><Drop id="11_129">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_129") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_130">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_130") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_131">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_131") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_132">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_132") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td style={{backgroundColor: 'white', borderBottom: '1px solid rgba(6, 185, 6, 0)', borderTop: '1px solid rgba(6, 185, 6, 0)' } } className="inv">_</td><td className="az inv"><Drop id="11_133">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_133") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="az inv"><Drop id="11_134">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_134") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td style={{backgroundColor: 'white', borderBottom: '1px solid rgba(6, 185, 6, 0)', borderTop: '1px solid rgba(6, 185, 6, 0)' } } className="inv">_</td><td className="vd inv"><Drop id="11_135">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_135") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="vd inv"><Drop id="11_136">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_136") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td></tr>
 <tr><td className="am">LINHA 4</td><td className="am inv"><Drop id="11_137">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_137") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_138">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_138") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_139">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_139") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_140">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_140") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td style={{backgroundColor: 'white', borderBottom: '1px solid rgba(6, 185, 6, 0)', borderTop: '1px solid rgba(6, 185, 6, 0)' } } className="inv">_</td><td className="az inv"><Drop id="11_141">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_141") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="az inv"><Drop id="11_142">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_142") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td style={{backgroundColor: 'white', borderBottom: '1px solid rgba(6, 185, 6, 0)', borderTop: '1px solid rgba(6, 185, 6, 0)' } } className="inv">_</td><td className="vd inv"><Drop id="11_143">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_143") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="vd inv"><Drop id="11_144">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_144") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td></tr>
 <tr><td className="am">LINHA 3</td><td className="am inv"><Drop id="11_145">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_145") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_146">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_146") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_147">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_147") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_148">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_148") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td style={{backgroundColor: 'white', borderBottom: '1px solid rgba(6, 185, 6, 0)', borderTop: '1px solid rgba(6, 185, 6, 0)' } } className="inv">_</td><td className="az inv"><Drop id="11_149">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_149") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="az inv"><Drop id="11_152">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_152") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td style={{backgroundColor: 'white', borderBottom: '1px solid rgba(6, 185, 6, 0)', borderTop: '1px solid rgba(6, 185, 6, 0)' } } className="inv">_</td><td className="vd inv"><Drop id="11_150">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_150") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="vd inv"><Drop id="11_151">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_151") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td></tr>
 <tr><td className="am">LINHA 2</td><td className="am inv"><Drop id="11_153">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_153") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_154">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_154") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_155">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_155") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_156">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_156") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td style={{backgroundColor: 'white', borderBottom: '1px solid rgba(6, 185, 6, 0)', borderTop: '1px solid rgba(6, 185, 6, 0)' } } className="inv">_</td><td className="az inv"><Drop id="11_157">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_157") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="az inv"><Drop id="11_158">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_158") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td style={{backgroundColor: 'white', borderBottom: '1px solid rgba(6, 185, 6, 0)', borderTop: '1px solid rgba(6, 185, 6, 0)' } } className="inv">_</td><td className="vd inv"><Drop id="11_159">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_159") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="vd inv"><Drop id="11_160">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_160") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td></tr>
 <tr><td className="am">LINHA 1</td><td className="am inv"><Drop id="11_161">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_161") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_162">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_162") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_163">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_163") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_164">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_164") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td style={{backgroundColor: 'white', borderBottom: '1px solid rgba(6, 185, 6, 0)', borderTop: '1px solid rgba(6, 185, 6, 0)' } } className="inv">_</td><td className="az inv"><Drop id="11_165">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_165") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="az inv"><Drop id="11_166">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_166") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td style={{backgroundColor: 'white', borderBottom: '1px solid rgba(6, 185, 6, 0)', borderTop: '1px solid rgba(6, 185, 6, 0)' } } className="inv">_</td><td className="vd inv"><Drop id="11_168">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_168") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="vd inv"><Drop id="11_169">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_169") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td></tr>
 <tr><td className="am">PAREDAO</td><td className="am inv"><Drop id="11_170">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_170") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_171">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_171") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_172">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_172") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_173">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_173") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td style={{backgroundColor: 'white', borderBottom: '1px solid rgba(6, 185, 6, 0)', borderTop: '1px solid rgba(6, 185, 6, 0)' } } className="inv">_</td><td className="az inv"><Drop id="11_174">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_174") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="az inv"><Drop id="11_175">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_175") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td style={{backgroundColor: 'white', borderBottom: '1px solid rgba(6, 185, 6, 0)', borderTop: '1px solid rgba(6, 185, 6, 0)' } } className="inv">_</td><td className="vd inv"><Drop id="11_176">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_176") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="vd inv"><Drop id="11_177">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_177") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td></tr>
 </tbody></table>
 <div><p style={{marginLeft:'2vw'}}>{this.state.contador}</p></div>
 <table class="tableizer-table" style={{color: 'white', marginTop: '3%'}}> <thead>
 <tr><td colSpan="5" className="vm">Reserva</td></tr></thead>
 <tbody>
 <tr><td className="am inv"><Drop id="11_178">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_178") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_179">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_179") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_180">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_180") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_181">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_181") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_182">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_182") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td></tr>
 <tr><td className="am inv"><Drop id="11_183">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_183") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_184">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_184") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_185">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_185") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_186">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_186") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td><td className="am inv"><Drop id="11_187">. {this.state.placas.map(item => {
                                if (item.sinalatual === "11_187") {


                                    return (<div>

                                        <Drag
                                            id={item.id}
                                            cor={item.cor}
                                            cordofundo={item.cordofundo}
                                            cordotexto={item.cordotexto}
                                            etiqueta={item.etiqueta}
                                            hora={item.hora}
                                            observacao={item.observacao}
                                            sinalanterior={item.sinalanterior}
                                            sinalatual={item.sinalatual}

                                        >
                                            <Placa key={item.id}
                                                id={item.id}
                                                cordaborda={item.cor}
                                                cordofundo={item.cordofundo}
                                                texto={item.etiqueta}
                                                cordotexto={item.cordotexto}
                                                sinalanterior={item.sinalanterior}
                                                observacao={item.observacao}
                                                sinalatual={item.sinalAtual}
                                                ultimamovimentacao={item.hora} />
                                        </Drag>

                                    </div>

                                    )
                                }


                            })}</Drop></td></tr>
 
 </tbody></table> 





























<div style={{ margin: '5vw', marginTop: "10" }}>
    <h2>Criar Nova Placa</h2>

    <div>

        {
            this.state.placas.map(item => {
                if (item.sinalatual === 'onzeDoze') {


                    return (<div style={{maxWidth: '3vw'}}>

                        <Drag
                            id={item.id}
                            cor={item.cor}
                            cordofundo={item.cordofundo}
                            cordotexto={item.cordotexto}
                            etiqueta={item.etiqueta}
                            hora={item.hora}
                            observacao={item.observacao}
                            sinalanterior={item.sinalanterior}
                            sinalatual={item.sinalatual}

                        >
                            <Placa key={item.id}
                                id={item.id}
                                cordaborda={item.cor}
                                cordofundo={item.cordofundo}
                                texto={item.etiqueta}
                                cordotexto={item.cordotexto}
                                sinalanterior={item.sinalanterior}
                                observacao={item.observacao}
                                sinalatual={item.sinalAtual}
                                ultimamovimentacao={item.hora} />
                        </Drag>

                    </div>

                    )
                }
                else { return (null) }


            })
        }




    </div>


    <h3>Inserir Dados</h3>

    <form onSubmit={this.cadastrarPlaca.bind(this)}>
        <input type="text" placeholder="Texto" onChange={this.atualizaTexto.bind(this)} />
       
      

        <select value={this.state.value} name="option" onChange={this.atualizaCorDoFundo.bind(this)}>
                    <option value="" disabled selected >Cor do Fundo</option>
                    <option value="blue" >Azul</option>
                    <option value="green" >Verde</option>
                    <option value="yellow" >Amarelo</option>
                    <option value="purple" >Roxo</option>
                    <option value="pink" >Rosa</option>
                    <option value="red" >Vermelho</option>
                    <option value="orange" >Laranja</option>
                    <option value="brown" >Marrom</option>
                    <option value="grey" >Cinza</option>
                    <option value="white" >Branco</option>
                    <option value="black" >Preto</option>
            
        </select>

        
        <select value={this.state.value} name="option" onChange={this.atualizaCorDoTexto.bind(this)}>
                    <option value="" disabled selected >Cor do Texto</option>
                    <option value="blue" >Azul</option>
                    <option value="green" >Verde</option>
                    <option value="yellow" >Amarelo</option>
                    <option value="purple" >Roxo</option>
                    <option value="pink" >Rosa</option>
                    <option value="red" >Vermelho</option>
                    <option value="orange" >Laranja</option>
                    <option value="brown" >Marrom</option>
                    <option value="grey" >Cinza</option>
                    <option value="white" >Branco</option>
                    <option value="black" >Preto</option>
            
        </select>


        <select value={this.state.value} name="option" onChange={this.atualizaCorDaBorda.bind(this)}>
                    <option value="" disabled selected >Cor da Borda</option>
                    <option value="blue" >Azul</option>
                    <option value="green" >Verde</option>
                    <option value="yellow" >Amarelo</option>
                    <option value="purple" >Roxo</option>
                    <option value="pink" >Rosa</option>
                    <option value="red" >Vermelho</option>
                    <option value="orange" >Laranja</option>
                    <option value="brown" >Marrom</option>
                    <option value="grey" >Cinza</option>
                    <option value="white" >Branco</option>
                    <option value="black" >Preto</option>
            
        </select>
        

        <select value={this.state.value} name="option" onChange={this.atualizaSinalAtual.bind(this)}>
            <option value="onzeDoze" disabled selected >Linhas</option>
            <option value="seteDez" >7 e 10</option>
            <option value="oitoNove">8 e 9</option>
            <option value="onzeDoze">11 e 12</option>
        </select>



        <input type="submit" value="Cadastrar" />

    </form>

    <h3>Pré Visualização</h3>

        <div style={{maxWidth: '3vw'}}>
    <Placa cordaborda={this.state.cor} cordofundo={this.state.cordofundo} texto={this.state.texto} cordotexto={this.state.cordotexto} />
    </div>
</div>


<Drag><DropDel id="trash"  ><img src={Trash} alt="lixeira" style={{ maxWidth: '3vw', marginLeft: '3vw' }} id="trash2" cor="a" cordofundo="a" cordotexto="a" etiqueta="a" hora="a" observacao="a" sinalanterior="a" sinalatual="a" /></DropDel></Drag>

        <div><p style={{textAlign: 'right'}}>Desenvolvido por Renato Nogueira 2021</p></div>




            </div>
            //fim do programa
        )


    }


}


export default Quadro_11_12