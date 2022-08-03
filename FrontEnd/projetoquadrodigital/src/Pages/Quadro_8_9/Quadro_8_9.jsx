
import React from 'react'
import { Component } from 'react';
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





class Quadro_8_9 extends React.Component {

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
                sinalatual: "oitoNove",
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

            <div>

<table draggable="false" className="tableizer-table" responsive size="sm" style={{ textAlign: "center", minWidth: "96vw", maxWidth: '98vw', marginLeft: "2vw", marginTop: "2vh" }} >
                    <thead><tr><th colSpan="5">Oeste PÁTIO Leste</th><th colSpan="10">CIRCULAÇÃO</th><th colSpan="8">MANUTENÇÃO</th></tr></thead><tbody>




                        <tr><td className="sinaisFixos bgYellowRed">*201*</td>
                        
                        <td className="bgYellow" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}>
                            <Drop id="201 a">. {this.state.placas.map(item => {
                                if (item.sinalatual === "201 a") {



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




                            <td className="bgYellow"><Drop id="201 b">. {this.state.placas.map(item => {
                                if (item.sinalatual === "201 b") {


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










                            <td className="sinaisFixos bgYellow">313</td>


                            <td className="sinaisFixos bgYellow">L1</td>
                            <td colSpan="5" className="tabelaPatiotitulo">Linha 9</td>
                            <td colSpan="5" className="tabelaPatiotitulo">Linha 8</td>
                            <td className="sinaisFixos bgGreenWhite">MT1</td>

                           









                            <td className="bgGreenWhite" style={{borderRight: "1px solid rgba(0, 0, 0, 1)", borderRightStyle: 'dotted', borderLeftStyle: 'dotted'}}><Drop id="MT1 b">. {this.state.placas.map(item => {
                                if (item.sinalatual === "MT1 b") {


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









                            <td className="bgGreenWhite" style={{borderRight: "1px solid rgba(0,0, 0, 1)", borderRightStyle: 'dotted', borderLeftStyle: 'dotted'}}><Drop id="MT1 c" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "MT1 c") {


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





                            <td className="bgGreen" style={{borderRightStyle: 'dotted', borderLeftStyle: 'dotted'}}><Drop id="MT1 d" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "MT1 d") {


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







                            <td className="sinaisFixos bgGreen">RVA-INS</td>


                            <td className="bgGreen" colSpan="2"><Drop id="m1">. {this.state.placas.map(item => {
                                if (item.sinalatual === "m1") {


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





 
                            
                            </tr>
                        <tr><td className="sinaisFixos bgYellow">202</td>


                            <td className="bgYellow" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="202 a" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "202 a") {


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





                            <td className="bgYellow"><Drop id="202 b" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "202 b") {


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







                            
                            <td className="sinaisFixos bgYellow" colSpan="2">Linha do Bicudo</td>
                            <td className="sinaisFixos bgBlue">1</td>
                           

                            <td className="bgBlue"><Drop id="L9 b1" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 b1") {


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



                            <td className="sinaisFixos bgBlue">19</td>
                            <td className="bgBlue" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="L9 c1">. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 c1") {


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

                            <td className="bgBlue"><Drop id="L9 d1">. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 d1") {


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




                            <td className="sinaisFixos bgBlue">1</td>
      

                            <td className="bgBlue"><Drop id="L8 b1" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 b1") {


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







                            <td className="sinaisFixos bgBlue" >19</td>

                            <td className="bgBlue" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="L8 c1" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}>. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 c1") {


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



                            <td className="bgBlue"><Drop id="L8 d1" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 d1") {


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





                            <td className="sinaisFixos bgGreenWhite">MT2</td>




                            


                            <td className="bgGreenWhite" style={{borderRight: "1px solid rgba(0, 0, 0, 1)", borderRightStyle: 'dotted', borderLeftStyle: 'dotted'}}><Drop id="MT2 b" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "MT2 b") {


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




                            <td className="bgGreenWhite" style={{borderRight: "1px solid rgba(0, 0, 0, 1)", borderRightStyle: 'dotted', borderLeftStyle: 'dotted'}}><Drop id="MT2 c" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "MT2 c") {


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




                            <td className="bgGreen" style={{borderRightStyle: 'dotted', borderLeftStyle: 'dotted'}}><Drop id="MT2 d">. {this.state.placas.map(item => {
                                if (item.sinalatual === "MT2 d") {


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




                            <td className="sinaisFixos bgGreen">RVB-R1</td>


                            <td className="bgGreen" colSpan="2"><Drop id="m2" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "m2") {


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




                            
                            </tr>
                        <tr><td className="sinaisFixos bgYellow">203</td>


                            <td className="bgYellow" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="203 a" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "203 a") {


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




                            <td className="bgYellow"><Drop id="203 b">. {this.state.placas.map(item => {
                                if (item.sinalatual === "203 b") {


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






                            <td className="sinaisFixos bgYellow">314</td>

                            <td className="sinaisFixos bgYellow">L3</td>
                            <td className="sinaisFixos bgBlue">2</td>
 






                            <td className="bgBlue"><Drop id="L9 b2" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 b2") {


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



                            <td className="sinaisFixos bgBlue">20</td>



                            <td className="bgBlue" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="L9 c2">. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 c2") {


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



                            <td className="bgBlue"><Drop id="L9 d2" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 d2") {


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






                            <td className="sinaisFixos bgBlue">2</td>



      




                            <td className="bgBlue"><Drop id="L8 b2">. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 b2") {


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




                            <td className="sinaisFixos bgBlue">20</td>



                            <td className="bgBlue" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="L8 c2" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 c2") {


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



                            <td className="bgBlue"><Drop id="L8 d2" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 d2") {


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






                            <td className="sinaisFixos bgGreenWhite">MT3</td>


                          

                            <td className="bgGreenWhite" style={{borderRight: "1px solid rgba(0, 0, 0, 1)", borderRightStyle: 'dotted', borderLeftStyle: 'dotted'}}><Drop id="MT3 b" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "MT3 b") {


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




                            <td className="bgGreenWhite" style={{borderRight: "1px solid rgba(0, 0, 0, 1)", borderRightStyle: 'dotted', borderLeftStyle: 'dotted'}}><Drop id="MT3 c">. {this.state.placas.map(item => {
                                if (item.sinalatual === "MT3 c") {


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




                            <td className="bgGreen" style={{borderRightStyle: 'dotted', borderLeftStyle: 'dotted'}}><Drop id="MT3 d" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "MT3 d") {


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





                            <td className="sinaisFixos bgGreen">RC</td>



                            <td className="bgGreen" colSpan="2"><Drop id="m3">. {this.state.placas.map(item => {
                                if (item.sinalatual === "m3") {


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




                            
                            </tr>
                        <tr><td className="sinaisFixos bgYellow">204</td>
                            <td className="bgYellow" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="204 a" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "204 a") {


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
                            <td className="bgYellow"> <Drop id="204 b" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "204 b") {


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
                            <td className="sinaisFixos bgYellow">315</td>
                            <td className="sinaisFixos bgYellow">L4</td>
                            <td className="sinaisFixos bgBlue">3</td>
                             <td className="bgBlue"><Drop id="L9 b3">. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 b3") {


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
                            <td className="sinaisFixos bgBlue">21</td>
                            <td className="bgBlue" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="L9 c3">. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 c3") {


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
                            <td className="bgBlue"><Drop id="L9 d3" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 d3") {


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






                            <td className="sinaisFixos bgBlue">3</td>


               
                            <td className="bgBlue"><Drop id="L8 b3" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 b3") {


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



                            <td className="sinaisFixos bgBlue">21</td>

                            <td className="bgBlue" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}> <Drop id="L8 c3" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 c3") {


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





                            <td className="bgBlue"><Drop id="L8 d3">. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 d3") {


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



                            <td className="sinaisFixos bgGreenWhite">MT4</td>


                         

                            <td className="bgGreenWhite" style={{borderRight: "1px solid rgba(0,0, 0, 1)", borderRightStyle: 'dotted', borderLeftStyle: 'dotted'}}><Drop id="MT4 b" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "MT4 b") {


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




                            <td className="bgGreenWhite" style={{borderRight: "1px solid rgba(0, 0, 0, 1)", borderRightStyle: 'dotted', borderLeftStyle: 'dotted'}}><Drop id="MT4 c" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "MT4 c") {


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




                            <td className="bgGreen" style={{borderRightStyle: 'dotted', borderLeftStyle: 'dotted'}}><Drop id="MT4 d">. {this.state.placas.map(item => {
                                if (item.sinalatual === "MT4 d") {


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




                            <td className="sinaisFixos bgGreen">RVD-R2</td>


                            <td className="bgGreen" colSpan="2"><Drop id="m4" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "m4") {


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



                            
                            
                            </tr>
                        <tr><td className="sinaisFixos bgYellow">205</td>


                            <td className="bgYellow" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="205 a" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "205 a") {


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




                            <td className="bgYellow"><Drop id="205 b" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "205 b") {


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




                            <td className="sinaisFixos bgYellow">316</td>


                            <td className="sinaisFixos bgYellow">L5</td>

                            <td className="sinaisFixos bgBlue">4</td>

        


                            <td className="bgBlue"><Drop id="L9 b4">. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 b4") {


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







                            <td className="sinaisFixos bgBlue">22</td>

                            <td className="bgBlue" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="L9 c4">. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 c4") {


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



                            <td className="bgBlue"><Drop id="L9 d4" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 d4") {


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




                            <td className="sinaisFixos bgBlue">4</td>

    

                            <td className="bgBlue"><Drop id="L8 b4" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 b4") {


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



                            <td className="sinaisFixos bgBlue">22</td>

                            <td className="bgBlue" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="L8 c4" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 c4") {


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






                            <td className="bgBlue"><Drop id="L8 d4">. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 d4") {


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



                            <td className="sinaisFixos bgGreenWhite">MT5</td>



                         


                            <td className="bgGreenWhite" style={{borderRight: "1px solid rgba(0, 0, 0, 1)", borderRightStyle: 'dotted', borderLeftStyle: 'dotted'}}><Drop id="MT5 b" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "MT5 b") {


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




                            <td className="bgGreenWhite" style={{borderRight: "1px solid rgba(0, 0, 0, 1)", borderRightStyle: 'dotted', borderLeftStyle: 'dotted'}}><Drop id="MT5 c" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "MT5 c") {


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




                            <td className="bgGreen" style={{borderRightStyle: 'dotted', borderLeftStyle: 'dotted'}}><Drop id="MT5 d" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "MT5 d") {


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



                            <td className="sinaisFixos bgGreen">RVE-R3</td>

                            <td className="bgGreen" colSpan="2"><Drop id="m5" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "m5") {


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

                            
                            
                            </tr>
                        <tr><td className="sinaisFixos bgYellow">206</td>


                            <td className="bgYellow" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="206 a" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "206 a") {


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



                            <td className="bgYellow"><Drop id="206 b" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "206 b") {


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




                            <td className="sinaisFixos bgYellow">317</td>

                            <td className="sinaisFixos bgYellow">L6</td>
                            <td className="sinaisFixos bgBlue">5</td>
   
                            <td className="bgBlue"><Drop id="L9 b5" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 b5") {


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




                            <td className="sinaisFixos bgBlue">23</td>
                            <td className="bgBlue" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="L9 c5" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 c5") {


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



                            <td className="bgBlue"><Drop id="L9 d5" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 d5") {


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

                            <td className="sinaisFixos bgBlue">5</td>

     

                            <td className="bgBlue"><Drop id="L8 b5">. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 b5") {


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



                            <td className="sinaisFixos bgBlue">23</td>


                            <td className="bgBlue" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="L8 c5" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 c5") {


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

                            <td className="bgBlue"><Drop id="L8 d5" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 d5") {


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


                            <td className="sinaisFixos bgGreenWhite">MT6</td>
                          


                            <td className="bgGreenWhite" style={{borderRight: "1px solid rgba(0, 0, 0, 1)", borderRightStyle: 'dotted', borderLeftStyle: 'dotted'}}><Drop id="MT6 b">. {this.state.placas.map(item => {
                                if (item.sinalatual === "MT6 b") {


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




                            <td className="bgGreenWhite" style={{borderRight: "1px solid rgba(0, 0, 0, 1)", borderRightStyle: 'dotted', borderLeftStyle: 'dotted'}}><Drop id="MT6 c">. {this.state.placas.map(item => {
                                if (item.sinalatual === "MT6 c") {


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




                            <td className="bgGreen" style={{borderRightStyle: 'dotted', borderLeftStyle: 'dotted'}}><Drop id="MT6 d">.{this.state.placas.map(item => {
                                if (item.sinalatual === "MT6 d") {


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


                            <td className="sinaisFixos bgGreen">RVF-Resp</td>


                            <td className="bgGreen" colSpan="2"><Drop id="m6" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "m6") {


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
     
                            </tr>
                        <tr><td className="sinaisFixos bgYellow">207</td>



                            <td className="bgYellow" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="207 a">. {this.state.placas.map(item => {
                                if (item.sinalatual === "207 a") {


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


                            <td className="bgYellow"><Drop id="207 b">. {this.state.placas.map(item => {
                                if (item.sinalatual === "207 b") {


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



                            <td className="sinaisFixos bgYellow">318</td>

                            <td className="sinaisFixos bgYellow">L7</td>


                            <td className="sinaisFixos bgBlue">6</td>

     

                            <td className="bgBlue"><Drop id="L9 b6" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 b6") {


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



                            <td className="sinaisFixos bgBlue">24</td>


                            <td className="bgBlue" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="L9 c6" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 c6") {


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

                            <td className="bgBlue"><Drop id="L9 d6" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 d6") {


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



                            <td className="sinaisFixos bgBlue">6</td>

     
                            <td className="bgBlue"><Drop id="L8 b6" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 b6") {


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




                            <td className="sinaisFixos bgBlue">24</td>

                            <td className="bgBlue" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="L8 c6" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 c6") {


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


                            <td className="bgBlue"><Drop id="L8 d6" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 d6") {


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


                            <td className="sinaisFixos bgGreenWhite">MT7</td>



         
                            <td className="bgGreenWhite" style={{borderRight: "1px solid rgba(0, 0, 0, 1)", borderRightStyle: 'dotted', borderLeftStyle: 'dotted'}}><Drop id="MT7 b" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "MT7 b") {


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



                            <td className="bgGreenWhite" style={{borderRight: "1px solid rgba(0, 0, 0, 1)", borderRightStyle: 'dotted', borderLeftStyle: 'dotted'}}><Drop id="MT7 c" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "MT7 c") {


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



                            <td className="bgGreen" style={{borderRightStyle: 'dotted', borderLeftStyle: 'dotted'}} ><Drop id="MT7 d" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "MT7 d") {


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



                            <td className="sinaisFixos bgGreen">Re-Mecanica</td>

                            <td className="bgGreen" colSpan="2"><Drop id="m7" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "m7") {


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

                   </tr>
                        <tr><td className="sinaisFixos bgYellow">208</td>


                            <td className="bgYellow" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="208 a" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "208 a") {


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


                            <td className="bgYellow"><Drop id="208 b" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "208 b") {


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


                            <td className="sinaisFixos bgYellow">319</td>


                            <td className="sinaisFixos bgYellow">L8</td>
                            <td className="sinaisFixos bgBlue">7</td>


     
                            <td className="bgBlue"><Drop id="L9 b7" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 b7") {


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




                            <td className="sinaisFixos bgBlue">25</td>

                            <td className="bgBlue" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="L9 c7" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 c7") {


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


                            <td className="bgBlue"><Drop id="L9 d7" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 d7") {


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




                            <td className="sinaisFixos bgBlue">7</td>


       

                            <td className="bgBlue"><Drop id="L8 b7">. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 b7") {


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



                            <td className="sinaisFixos bgBlue">25</td>


                            <td className="bgBlue" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="L8 c7" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 c7") {


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




                            <td className="bgBlue"><Drop id="L8 d7">. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 d7") {


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



                            <td className="sinaisFixos bgGreenWhite">MT8</td>


     

                            <td className="bgGreenWhite" style={{borderRight: "1px solid rgba(0, 0, 0, 1)", borderRightStyle: 'dotted', borderLeftStyle: 'dotted'}}><Drop id="MT8 b">. {this.state.placas.map(item => {
                                if (item.sinalatual === "MT8 b") {


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
                                else { return (null) }


                            })}</Drop></td>






                            <td className="bgGreenWhite" style={{borderRight: "px solid rgba(0, 0, 0, 1)", borderRightStyle: 'dotted', borderLeftStyle: 'dotted'}}><Drop id="MT8 c" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "MT8 c") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="bgGreen" style={{borderRightStyle: 'dotted', borderLeftStyle: 'dotted'}}><Drop id="MT8 d">. {this.state.placas.map(item => {
                                if (item.sinalatual === "MT8 d") {


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
                                else { return (null) }


                            })}</Drop></td>
                            <td className="sinaisFixos bgGreen">Re-Elét.</td>
                            <td className="bgGreen" colSpan="2"><Drop id="m8">. {this.state.placas.map(item => {
                                if (item.sinalatual === "m8") {


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
                                else { return (null) }


                            })}</Drop></td>
                            
                            </tr>
                        <tr><td className="sinaisFixos bgYellow">209</td>



                            <td className="bgYellow" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="209 a" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "209 a") {


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
                                else { return (null) }


                            })}</Drop></td>





                            <td className="bgYellow"><Drop id="209 b">. {this.state.placas.map(item => {
                                if (item.sinalatual === "209 b") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="sinaisFixos bgYellow">320</td>
                            <td className="sinaisFixos bgYellow">L9</td>
                            <td className="sinaisFixos bgBlue">8</td>
   

                            <td className="bgBlue"><Drop id="L9 b8" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 b8") {


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
                                else { return (null) }


                            })}</Drop></td>


                            <td className="sinaisFixos bgBlue">26</td>


                            <td className="bgBlue" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="L9 c8">. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 c8") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="bgBlue"><Drop id="L9 d8" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 d8") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="sinaisFixos bgBlue">8</td>

   


                            <td className="bgBlue"><Drop id="L8 b8" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 b8") {


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
                                else { return (null) }


                            })}</Drop></td>


                            <td className="sinaisFixos bgBlue">26</td>
                            <td className="bgBlue" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="L8 c8">. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 c8") {


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
                                else { return (null) }


                            })}</Drop></td>

                            <td className="bgBlue"><Drop id="L8 d8" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 d8") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="sinaisFixos bgGreen">MG1-16</td>

            

                            <td className="bgGreen" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="p2" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "p2") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="bgGreen" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="p3" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "p3") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="bgGreen"><Drop id="p4" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "p4") {


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
                                else { return (null) }


                            })}</Drop></td>


                            <td className="sinaisFixos bgGreen">Fiscalização</td>
                            <td className="bgGreen"colSpan="2"><Drop id="m9" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "m9") {


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
                                else { return (null) }


                            })}</Drop></td>

    
                            </tr>
                        <tr><td className="sinaisFixos bgYellow">211</td>

                            <td className="bgYellow" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="211 a" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "211 a") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="bgYellow"><Drop id="211 b" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "211 b") {


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
                                else { return (null) }


                            })}</Drop></td>


                            <td className="sinaisFixos bgYellow">322</td>
                            <td className="sinaisFixos bgYellow">L11</td>

                            <td className="sinaisFixos bgBlue">9</td>


   




                            <td className="bgBlue"><Drop id="L9 b9">. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 b9") {


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
                                else { return (null) }


                            })}</Drop></td>




                            <td className="sinaisFixos bgBlue" >27</td>


                            <td className="bgBlue" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="L9 c9" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 c9") {


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
                                else { return (null) }


                            })}</Drop></td>


                            <td className="bgBlue"><Drop id="L9 d9" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 d9") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="sinaisFixos bgBlue">9</td>



   



                            <td className="bgBlue"><Drop id="L8 b9" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 b9") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="sinaisFixos bgBlue">27</td>



                            <td className="bgBlue" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="L8 c9">. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 c9") {


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
                                else { return (null) }


                            })}</Drop></td>

                            <td className="bgBlue"><Drop id="L8 d9" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 d9") {


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
                                else { return (null) }


                            })}</Drop></td>


                            <td className="sinaisFixos bgGreen">MG2</td>


                

                            <td className="bgGreen" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="p6" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "p6") {


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
                                else { return (null) }


                            })}</Drop></td>




                            <td className="bgGreen" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="p7" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "p7") {


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
                                else { return (null) }


                            })}</Drop></td>




                            <td className="bgGreen"><Drop id="p8" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "p8") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="sinaisFixos bgGreen">Escalon.</td>

                            <td className="bgGreen" colSpan="2"><Drop id="m10" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "m10") {


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
                                else { return (null) }


                            })}</Drop></td>

     
                            
                            </tr>
                        <tr><td className="sinaisFixos bgYellowRed">*212*</td>


                            <td className="bgYellow" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="212 a">. {this.state.placas.map(item => {
                                if (item.sinalatual === "212 a") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="bgYellow"><Drop id="212 b" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "212 b") {


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
                                else { return (null) }


                            })}</Drop></td>




                            <td className="sinaisFixos bgYellow">323</td>


                            <td className="sinaisFixos bgYellow">L12</td>


                            <td className="sinaisFixos bgBlue">10</td>

     

                            <td className="bgBlue"><Drop id="L 9 b10" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L 9 b10") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="sinaisFixos bgBlue">28</td>


                            <td className="bgBlue" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="L9 c10" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 c10") {


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
                                else { return (null) }


                            })}</Drop></td>


                            <td className="bgBlue"><Drop id="L9 d10" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 d10") {


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
                                else { return (null) }


                            })}</Drop></td>
                            <td className="sinaisFixos bgBlue">10</td>





     
                            <td className="bgBlue"><Drop id="L8 b10" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 b10") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="sinaisFixos bgBlue">28</td>



                            <td className="bgBlue" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="L8 c10" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 c10") {


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
                                else { return (null) }


                            })}</Drop></td>


                            <td className="bgBlue"><Drop id="L8 d10" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 d10") {


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
                                else { return (null) }


                            })}</Drop></td>




                            <td className="sinaisFixos bgGreen">MG3-15</td>


          


                            <td className="bgGreen" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="p10">. {this.state.placas.map(item => {
                                if (item.sinalatual === "p10") {


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
                                else { return (null) }


                            })}</Drop></td>




                            <td className="bgGreen" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="p11" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "p11") {


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
                                else { return (null) }


                            })}</Drop></td>


                            <td className="bgGreen"><Drop id="p12" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "p12") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="sinaisFixos bgGreen">ATC</td>


                            <td className="bgGreen" colSpan="2"><Drop id="m11" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "m11") {


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
                                else { return (null) }


                            })}</Drop></td>



                            
                            </tr>
                        <tr><td className="sinaisFixos bgYellow">232</td>



                            <td className="bgYellow" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="232 a" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "232 a") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="bgYellow"><Drop id="232 b" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "232 b") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="sinaisFixos bgYellow">249</td>


                            <td className="sinaisFixos bgYellow">Plataforma</td>

                            <td className="sinaisFixos bgBlue">11</td>


   

                            <td className="bgBlue"><Drop id="L9 b11">. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 b11") {


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
                                else { return (null) }


                            })}</Drop></td>




                            <td className="sinaisFixos bgBlue">29</td>


                            <td className="bgBlue" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="L9 c11" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 c11") {


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
                                else { return (null) }


                            })}</Drop></td>


                            <td className="bgBlue"><Drop id="L9 d11" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 d11") {


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
                                else { return (null) }


                            })}</Drop></td>




                            <td className="sinaisFixos bgBlue">11</td>


   

                            <td className="bgBlue"><Drop id="L8 b11" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 b11") {


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
                                else { return (null) }


                            })}</Drop></td>






                            <td className="sinaisFixos bgBlue">29</td>



                            <td className="bgBlue" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="L8 c11" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 c11") {


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
                                else { return (null) }


                            })}</Drop></td>




                            <td className="bgBlue"><Drop id="L8 d11" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 d11") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="sinaisFixos bgGreen">MG4-14</td>


      



                            <td className="bgGreen" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="p14" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "p14") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="bgGreen" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="p15" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "p15") {


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
                                else { return (null) }


                            })}</Drop></td>





                            <td className="bgGreen"><Drop id="p16" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "p16") {


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
                                else { return (null) }


                            })}</Drop></td>




                            <td className="sinaisFixos bgGreen">Check List</td>



                            <td className="bgGreen" colSpan="2"><Drop id="m12" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "m12") {


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
                                else { return (null) }


                            })}</Drop></td>


               
                            
                            </tr>
                        <tr><td className="sinaisFixos bgYellow">234</td>


                            <td className="bgYellow" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="234 a">. {this.state.placas.map(item => {
                                if (item.sinalatual === "234 a") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="bgYellow"><Drop id="234 b" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "234 b") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="sinaisFixos bgYellow">213</td>


                            <td className="bgYellow"></td>

                            <td className="sinaisFixos bgBlue">12</td>

      
                            <td className="bgBlue"><Drop id="L9 b12" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 b12") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="sinaisFixos bgBlue">30</td>



                            <td className="bgBlue" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="L9 c12" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 c12") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="bgBlue"><Drop id="L9 d12">. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 d12") {


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
                                else { return (null) }


                            })}</Drop></td>


                            <td className="sinaisFixos bgBlue">12</td>


      


                            <td className="bgBlue"><Drop id="L8 b12" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 b12") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="sinaisFixos bgBlue">30</td>



                            <td className="bgBlue" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="L8 c12" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 c12") {


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
                                else { return (null) }


                            })}</Drop></td>




                            <td className="bgBlue"><Drop id="L8 d12" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 d12") {


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
                                else { return (null) }


                            })}</Drop></td>




                            <td className="sinaisFixos bgGreen">MG5</td>



           




                            <td className="bgGreen"style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="p18" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "p18") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="bgGreen" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="p19" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "p19") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="bgGreen"><Drop id="p20" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "p20") {


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
                                else { return (null) }


                            })}</Drop></td>


                            <td className="sinaisFixos bgGreen">HVAC</td>


                            <td className="bgGreen" colSpan="2"><Drop id="m13" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "m13") {


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
                                else { return (null) }


                            })}</Drop></td>
         
                            </tr>
                        <tr><td className="sinaisFixos bgYellow">309</td>



                            <td className="bgYellow" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="309 a">. {this.state.placas.map(item => {
                                if (item.sinalatual === "309 a") {


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
                                else { return (null) }


                            })}</Drop></td>




                            <td className="bgYellow"><Drop id="309 b" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "309 b") {


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
                                else { return (null) }


                            })}</Drop></td>




                            <td className="sinaisFixos bgYellow">309</td>

                            <td className="sinaisFixos bgYellow">Galpão</td>


                            <td className="sinaisFixos bgBlue">13</td>

     




                            <td className="bgBlue"><Drop id="L9 b13" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 b13") {


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
                                else { return (null) }


                            })}</Drop></td>




                            <td className="sinaisFixos bgBlue">31</td><td className="bgBlue" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="L9 c13" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 c13") {


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
                                else { return (null) }


                            })}</Drop></td>






                            <td className="bgBlue"><Drop id="L9 d13" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 d13") {


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
                                else { return (null) }


                            })}</Drop></td>




                            <td className="sinaisFixos bgBlue">13</td>

      


                            <td className="bgBlue"><Drop id="L8 b13" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 b13") {


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
                                else { return (null) }


                            })}</Drop></td>




                            <td className="sinaisFixos bgBlue">31</td>


                            <td className="bgBlue" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="L8 c13" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 c13") {


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
                                else { return (null) }


                            })}</Drop></td>






                            <td className="bgBlue"><Drop id="L8 d13" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 d13") {


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
                                else { return (null) }


                            })}</Drop></td>





                            <td className="sinaisFixos bgGreen">MG6-13</td>


      


                            <td className="bgGreen" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="p22" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "p22") {


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
                                else { return (null) }


                            })}</Drop></td>




                            <td className="bgGreen" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="p23" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "p23") {


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
                                else { return (null) }


                            })}</Drop></td>





                            <td className="bgGreen"><Drop id="p24" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "p24") {


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
                                else { return (null) }


                            })}</Drop></td>




                            <td className="sinaisFixos bgGreen">Portas</td>


                            <td className="bgGreen" colSpan="2"><Drop id="m14" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "m14") {


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
                                else { return (null) }


                            })}</Drop></td>

            
                            </tr>
                        <tr><td className="sinaisFixos bgYellowRed">*140*</td>



                            <td className="bgYellow" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="140 a" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "140 a") {


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
                                else { return (null) }


                            })}</Drop></td>




                            <td className="bgYellow"><Drop id="140 b">. {this.state.placas.map(item => {
                                if (item.sinalatual === "140 b") {


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
                                else { return (null) }


                            })}</Drop></td>


                            <td className="sinaisFixos bgYellow">215</td>
                            <td className="sinaisFixos bgYellow">LA1</td>
                            <td className="sinaisFixos bgBlue">14</td>
    


                            <td className="bgBlue"><Drop id="L9 b14">. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 b14") {


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
                                else { return (null) }


                            })}</Drop></td>


                            <td className="sinaisFixos bgBlue">32</td>
                            <td className="bgBlue" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="L9 c14" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 c14") {


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
                                else { return (null) }


                            })}</Drop></td>


                            <td className="bgBlue"><Drop id="L9 d14" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 d14") {


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
                                else { return (null) }


                            })}</Drop></td>


                            <td className="sinaisFixos bgBlue">14</td>

  

                            <td className="bgBlue"><Drop id="L8 b14" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 b14") {


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
                                else { return (null) }


                            })}</Drop></td>


                            <td className="sinaisFixos bgBlue">32</td>


                            <td className="bgBlue" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="L8 c14" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 c14") {


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
                                else { return (null) }


                            })}</Drop></td>

                            <td className="bgBlue"><Drop id="L8 d14" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 d14") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="sinaisFixos bgGreen">MG7- 12</td>


       


                            <td className="bgGreen" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="p26" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "p26") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="bgGreen" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="p27" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "p27") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="bgGreen"><Drop id="p28" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "p28") {


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
                                else { return (null) }


                            })}</Drop></td>


                            <td className="sinaisFixos bgGreen">Dedetização</td>

                            <td className="bgGreen" colSpan="2"><Drop id="m15" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "m15") {


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
                                else { return (null) }


                            })}</Drop></td>

               
                            </tr>
                        <tr><td className="sinaisFixos bgYellow">144</td>

                            <td className="bgYellow" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="144 a" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "144 a") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="bgYellow"><Drop id="144 b" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "144 b") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="sinaisFixos bgYellow">242</td>
                            <td className="sinaisFixos bgYellow">LA2</td>
                            <td className="sinaisFixos bgBlue">15</td>
         


                            <td className="bgBlue"><Drop id="L9 b15" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 b15") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="sinaisFixos bgBlue">33</td>


                            <td className="bgBlue" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="L9 c15" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 c15") {


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
                                else { return (null) }


                            })}</Drop></td>


                            <td className="bgBlue"><Drop id="L9 d15" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 d15") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="sinaisFixos bgBlue">15</td>


     


                            <td className="bgBlue"><Drop id="L8 b15">. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 b15") {


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
                                else { return (null) }


                            })}</Drop></td>




                            <td className="sinaisFixos bgBlue">33</td>


                            <td className="bgBlue" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="L8 c15" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 c15") {


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
                                else { return (null) }


                            })}</Drop></td>




                            <td className="bgBlue"><Drop id="L8 d15" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 d15") {


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
                                else { return (null) }


                            })}</Drop></td>





                            <td className="sinaisFixos bgGreen">MG8</td>

              


                            <td className="bgGreen" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="p30" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "p30") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="bgGreen" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="p31" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "p31") {


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
                                else { return (null) }


                            })}</Drop></td>




                            <td className="bgGreen"><Drop id="p32" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "p32") {


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
                                else { return (null) }


                            })}</Drop></td>


                            <td className="sinaisFixos bgGreen">Usinagem</td>


                            <td className="bgGreen"colSpan="2"><Drop id="m16" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "m16") {


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
                                else { return (null) }


                            })}</Drop></td>

               
                            </tr>
                        <tr><td className="sinaisFixos bgYellow">138</td>

                            <td className="bgYellow" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="138 a" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "138 a") {


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
                                else { return (null) }


                            })}</Drop></td>

                            <td className="bgYellow"><Drop id="138 b" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "138 b") {


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
                                else { return (null) }


                            })}</Drop></td>




                            <td className="sinaisFixos bgYellow">227</td>
                            <td className="sinaisFixos bgYellow">Escova</td>
                            <td className="sinaisFixos bgBlue">16</td>


   

                            <td className="bgBlue"><Drop id="L9 b16" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 b16") {


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
                                else { return (null) }


                            })}</Drop></td>


                            <td className="sinaisFixos bgBlue">34</td>


                            <td className="bgBlue" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="L9 c16" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 c16") {


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
                                else { return (null) }


                            })}</Drop></td>


                            <td className="bgBlue"><Drop id="L9 d16" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 d16") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="sinaisFixos bgBlue">16</td>

         


                            <td className="bgBlue"><Drop id="L8 b16" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 b16") {


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
                                else { return (null) }


                            })}</Drop></td>


                            <td className="sinaisFixos bgBlue">34</td>


                            <td className="bgBlue" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="L8 c16" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 c16") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="bgBlue"><Drop id="L8 d16" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 d16") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="sinaisFixos bgGreen">MG9-11</td>

  


                            <td className="bgGreen" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="p34" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "p34") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="bgGreen" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="p35" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "p35") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="bgGreen"><Drop id="p36" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "p36") {


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
                                else { return (null) }


                            })}</Drop></td>


                            <td className="sinaisFixos bgGreen">Limpeza LM</td>


                            <td className="bgGreen" colSpan="2"><Drop id="m17" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "m17") {


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
                                else { return (null) }


                            })}</Drop></td>


                        </tr>
                        <tr><td className="sinaisFixos bgYellow">238</td>


                            <td className="bgYellow" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="238 a">. {this.state.placas.map(item => {
                                if (item.sinalatual === "238 a") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="bgYellow"><Drop id="238 b" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "238 b") {


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
                                else { return (null) }


                            })}</Drop></td>


                            <td className="sinaisFixos bgYellow">226</td>

                            <td className="sinaisFixos bgYellow">Paredão</td>
                            <td className="sinaisFixos bgBlue">17</td>
         


                            <td className="bgBlue"><Drop id="L9 b17" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 b17") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="sinaisFixos bgBlue">35</td>


                            <td className="bgBlue" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="L9 c17">. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 c17") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="bgBlue"><Drop id="L9 d17" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 d17") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="sinaisFixos bgBlue">17</td>

   

                            <td className="bgBlue"><Drop id="L8 b17" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 b17") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="sinaisFixos bgBlue">35</td>

                            <td className="bgBlue" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="L8 c17" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 c17") {


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
                                else { return (null) }


                            })}</Drop></td>


                            <td className="bgBlue"><Drop id="L8 d17" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 d17") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="sinaisFixos bgGreen">Torno</td>

 

                            <td className="bgGreen" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="p38" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "p38") {


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
                                else { return (null) }


                            })}</Drop></td>


                            <td className="bgGreen" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="p39" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "p39") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="bgGreen"><Drop id="p40">. {this.state.placas.map(item => {
                                if (item.sinalatual === "p40") {


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
                                else { return (null) }


                            })}</Drop></td>


                            <td className="sinaisFixos bgGreen">Vandalismo</td>

                            <td className="bgGreen" colSpan="2"><Drop id="m18" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "m18") {


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
                                else { return (null) }


                            })}</Drop></td>
              </tr>
                        <tr><td className="sinaisFixos bgYellowRed">*245*</td>

                            <td className="bgYellow" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="245 a" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "245 a") {


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
                                else { return (null) }


                            })}</Drop></td>

                            <td className="bgYellow"><Drop id="245 b" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "245 b") {


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
                                else { return (null) }


                            })}</Drop></td>

                            <td className="sinaisFixos bgYellow">240</td>

                            <td className="sinaisFixos bgYellow">Almox</td>
                            <td className="sinaisFixos bgBlue">18</td>
       

                            <td className="bgBlue"><Drop id="L9 b18" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 b18") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="sinaisFixos bgBlue">36</td>
                            <td className="bgBlue" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="L9 c18" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 c18") {


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
                                else { return (null) }


                            })}</Drop></td>




                            <td className="bgBlue"><Drop id="L9 d18" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L9 d18") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="sinaisFixos bgBlue">18</td>

  
                            <td className="bgBlue"><Drop id="L8 b18" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 b18") {


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
                                else { return (null) }


                            })}</Drop></td>


                            <td className="sinaisFixos bgBlue">36</td>


                            <td className="bgBlue" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="L8 c18" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 c18") {


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
                                else { return (null) }


                            })}</Drop></td>


                            <td className="bgBlue"><Drop id="L8 d18" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "L8 d18") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="sinaisFixos bgGreen">Infiltração</td>

      
                            <td className="bgGreen" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="p42" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "p42") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="bgGreen" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="p43" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "p43") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="bgGreen"><Drop id="p44">. {this.state.placas.map(item => {
                                if (item.sinalatual === "p44") {


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
                                else { return (null) }


                            })}</Drop></td>

                            <td className="sinaisFixos bgGreen">Assopramento</td>

                            <td className="bgGreen" colSpan="2"><Drop id="m19">. {this.state.placas.map(item => {
                                if (item.sinalatual === "m19") {


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
                                else { return (null) }


                            })}</Drop></td>

              
                            </tr>
                        <tr><td className="sinaisFixos bgYellow">210</td>


                            <td className="bgYellow" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="210 a" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "210 a") {


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
                                else { return (null) }


                            })}</Drop></td>


                            <td className="bgYellow"><Drop id="210 b">. {this.state.placas.map(item => {
                                if (item.sinalatual === "210 b") {


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
                                else { return (null) }


                            })}</Drop></td>


                            <td className="bgYellow sinaisFixos ">321</td>
                                
                            

                            <td className="bgYellow" colSpan="8"><Drop id="210 d" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "210 d") {


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
                                else { return (null) }


                            })}</Drop></td>


   

                            <td colSpan="3" className="tabelaPatiotitulo">A.Bueno</td>

                            <td className="sinaisFixos bgGreen"> Testes</td>
   
                            <td className="bgGreen" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="p46" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "p46") {


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
                                else { return (null) }


                            })}</Drop></td>

                            <td className="bgGreen" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="p47">. {this.state.placas.map(item => {
                                if (item.sinalatual === "p47") {


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
                                else { return (null) }


                            })}</Drop></td>


                            <td className="bgGreen"><Drop id="p48" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "p48") {


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
                                else { return (null) }


                            })}</Drop></td>


                            <td className="sinaisFixos bgGreen">Retrabalho</td>

                            <td className="bgGreen" colSpan="2"><Drop id="m20" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "m20") {


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
                                else { return (null) }


                            })}</Drop></td>
                  </tr>
                        <tr>
                       
                                         
                        <td className="sinaisFixos bgYellow">156</td>


<td className="bgYellow" colspan="2"><Drop id="156 a" >. {this.state.placas.map(item => {
    if (item.sinalatual === "156 a") {


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
    else { return (null) }


})}</Drop></td>

<td className="sinaisFixos bgYellow">107</td>
<td className="bgYellow" colspan="8"><Drop id="156 c">. {this.state.placas.map(item => {
    if (item.sinalatual === "156 c") {


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
    else { return (null) }


})}</Drop></td>

         

                            




                            <td className="sinaisFixos bgBlue">1</td>



     


     

                            <td className="bgBlue" colSpan="2"><Drop id="ABU 3">. {this.state.placas.map(item => {
                                if (item.sinalatual === "ABU 3") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td colSpan="8" className="tabelaPatiotitulo">IMOBILIZADOS</td></tr>
                        <tr>
                            
                            
                               <td className="sinaisFixos bgYellow">236</td>
                            <td className="bgYellow noBorderL" colSpan="2"><Drop id="236 a">. {this.state.placas.map(item => {
                                if (item.sinalatual === "236 a") {


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
                                else { return (null) }


                            })}</Drop></td>
                            <td className="bgYellow sinaisFixos" style={{borderLeft: "5px solid rgba(6, 185, 6, 0)", borderRight: "5px solid rgba(6, 185, 6, 0)"}} colSpan="2">PITOCO</td>                    
                            <td className="bgYellow sinaisFixos" style={{borderLeft: "5px solid rgba(6, 185, 6, 0)", borderRight: "5px solid rgba(6, 185, 6, 0)"}}>214(meio)</td>
                            <td className="bgYellow" colspan="3"><Drop id="214 b" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "214 b") {


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
                                else { return (null) }


                            })}</Drop></td>
                            <td className="sinaisFixos bgYellow" style={{borderLeft: "5px solid rgba(6, 185, 6, 0)", borderRight: "5px solid rgba(6, 185, 6, 0)"}}>214</td>
                            <td className="bgYellow" colspan="2"><Drop id="214 e" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "214 e") {


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
                                else { return (null) }


                            })}</Drop></td>

 
                            
                            
                            
                            
                            
               
   







                            



                            <td className="sinaisFixos bgBlue">2</td>


        


             

                            <td className="bgBlue" colSpan="2"><Drop id="ABU 7" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "ABU 7") {


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
                                else { return (null) }


                            })}</Drop></td>


                             <td colSpan="8" className="bgGreen"><Drop id="IMO A" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "IMO A") {


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
                                else { return (null) }


                            })}</Drop></td></tr>
                        <tr><td className="sinaisFixos bgYellow" >233</td>

                            <td className="bgYellow"colSpan="2" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="233 a">. {this.state.placas.map(item => {
                                if (item.sinalatual === "233 a") {


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
                                else { return (null) }


                            })}</Drop></td>



                  

                            <td className="bgYellow sinaisFixos" colSpan="2">
                                SIEMENS
                                
                          
                            </td>




                            <td className="bgYellow sinaisFixos" style={{borderLeft: "5px solid rgba(6, 185, 6, 0)", borderRight: "5px solid rgba(6, 185, 6, 0)"}}>312(meio)                            
                            </td>



                            <td className="bgYellow" colSpan="3"style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="312 b" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "312 b") {


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
                                else { return (null) }


                            })}</Drop></td>




                            <td className="bgYellow sinaisFixos" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}>312
                                
                           
                            
                            </td>

                            <td className="bgYellow" colSpan="2"><Drop id="312 f" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "312 f") {


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
                                else { return (null) }


                            })}</Drop></td>



                            
                            <td className="sinaisFixos bgBlue">3</td>
    


             

                            <td className="bgBlue" colSpan="2"><Drop id="ABU 11" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "ABU 11") {


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
                                else { return (null) }


                            })}</Drop></td>






                            <td colSpan="8" className="bgGreen"><Drop id="IMO B" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "IMO B") {


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
                                else { return (null) }


                            })}</Drop></td></tr>


                        <tr><td className="sinaisFixos bgYellow">159</td>
                            <td className="bgYellow" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="teste a" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "teste a") {


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
                                else { return (null) }


                            })}</Drop></td>


                            <td className="bgYellow" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="teste b" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "teste b") {


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
                                else { return (null) }


                            })}</Drop></td>




                            <td className="bgYellow sinaisFixos" colSpan="2" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}} > Linha de Testes
                            </td>





                            <td className="bgYellow" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="teste d" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "teste d") {


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
                                else { return (null) }


                            })}</Drop></td>




                            <td className="bgYellow" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="teste f" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "teste f") {


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
                                else { return (null) }


                            })}</Drop></td>


                            <td className="bgYellow" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="teste g" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "teste g") {


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
                                else { return (null) }


                            })}</Drop></td>


                            <td className="bgYellow" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="teste h" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "teste h") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="bgYellow" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="teste i">. {this.state.placas.map(item => {
                                if (item.sinalatual === "teste i") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="bgYellow" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="teste j" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "teste j") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="sinaisFixos bgYellow">230</td>

                            <td className="sinaisFixos bgBlue">4</td >


        

      


                            <td className="bgBlue" colSpan="2"><Drop id="ABU 15" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "ABU 15") {


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
                                else { return (null) }


                            })}</Drop></td>




                            <td colSpan="8" className="bgGreen"><Drop id="IMO C" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "IMO C") {


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
                                else { return (null) }


                            })}</Drop></td></tr>



                        <tr><td className="sinaisFixos bgYellow">Barranco</td>

                            <td className="bgYellow" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="311 a1" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "311 a1") {


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
                                else { return (null) }


                            })}</Drop></td>


                         


                            <td className="bgYellow" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="311 a3" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "311 a3") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="bgYellow"><Drop id="311 a4" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "311 a4") {


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
                                else { return (null) }


                            })}</Drop></td>


                            <td className="bgYellow sinaisFixos">Barranco</td>
                            <td className="sinaisFixos bgGreen">Reserva</td>
                            <td colSpan="18" className="bgGreen"><Drop id="Res a" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "Res a") {


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
                                else { return (null) }


                            })}</Drop></td></tr>



                        <tr><td className="sinaisFixos bgYellow">Interm. 311</td>
                            <td className="bgYellow" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="311 a5" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "311 a5") {


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
                                else { return (null) }


                            })}</Drop></td>


                        
                            <td className="bgYellow" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="311 a7" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "311 a7") {


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
                                else { return (null) }


                            })}</Drop></td>


                            <td className="bgYellow"><Drop id="311 a8" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "311 a8") {


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
                                else { return (null) }


                            })}</Drop></td>


                            <td className="bgYellow sinaisFixos">Interm. 235</td>


                            <td className="sinaisFixos bgGreen">Reserva</td>

                            <td colSpan="18" className="bgGreen"><Drop id="Res b" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "Res b") {


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
                                else { return (null) }


                            })}</Drop></td></tr>
                        <tr><td className="sinaisFixos bgYellow">Bomba 311</td>



                            <td className="bgYellow" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="311 a9" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "311 a9") {


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
                                else { return (null) }


                            })}</Drop></td>






                            <td className="bgYellow" style={{borderRight: "5px solid rgba(6, 185, 6, 0)"}}><Drop id="311 a11" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "311 a11") {


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
                                else { return (null) }


                            })}</Drop></td>



                            <td className="bgYellow"><Drop id="311 a12" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "311 a12") {


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
                                else { return (null) }


                            })}</Drop></td>

                            <td className="bgYellow sinaisFixos">Bomba 235</td>

                            <td className="sinaisFixos bgGreen">Reserva</td>
                            <td colSpan="18" className="bgGreen"><Drop id="Res c" >. {this.state.placas.map(item => {
                                if (item.sinalatual === "Res c") {


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
                                else { return (null) }


                            })}</Drop></td></tr>



                    </tbody></table>
                          
                    <div><p style={{marginLeft:'2vw'}}>{this.state.contador}</p></div>


























                <div style={{ margin: '5vw', marginTop: "10" }}>
                    <h2>Criar Nova Placa</h2>

                    <div>

                        {
                            this.state.placas.map(item => {
                                if (item.sinalatual === 'oitoNove') {


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
                            <option value="" disabled selected >Linhas</option>
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

                        <div><p style={{textAlign: 'right'}}>Desenvolvido por Renato Nogueira 2020</p></div>
            </div>




        )


    }


}


export default Quadro_8_9;