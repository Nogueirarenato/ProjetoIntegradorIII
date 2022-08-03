import React, { Component } from 'react'
import "../style/style.css"
import { render } from '@testing-library/react'
import PropTypes from 'prop-types'

import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Url from "../../Services/apiServer"





export default class Placa extends React.Component {


    constructor() {
        super();

        this.state = {

            mostrar: "none",
            observacao: "block",
            novaObservacao: ""

        }
    }

    mostarCampo() {
        this.setState({
            mostrar: 'flex',
            observacao: 'none'
        })
    }

    fecharCampo() {
        this.setState({
            mostrar: 'none',
            observacao: 'block',
            novaObservacao: ''
        })


    }



    atualizaObservacao(event) {
        this.setState({
            novaObservacao: event.target.value
        })
    }
    gravaObservacao(event) {
        event.preventDefault();



        fetch(Url + "Placas", {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem('TOKEN_KEY')
            },
            body: JSON.stringify({
                "id": this.props.id,
                "cor": "_",
                "cordofundo": "_",
                "cordotexto": "_",
                "etiqueta": "_",
                "hora": "_",
                "observacao": this.state.novaObservacao,
                "sinalanterior": "_",
                "sinalatual": "_"


            })
        }
        ).then(
            setTimeout(() => {
                window.location.reload()
                return false;
            }, 1000)

        ).catch(erro => console.log(erro))










    }




    sair() {
        window.location.reload()
    }


    renderTooltip(props) {








        return (



            <Tooltip id={this.props.id} {...props}>
                <p>Status  {this.props.texto}</p>
                <p></p>
                {this.state.novaObservacao}
                <p></p>
                <div style={{ display: this.state.observacao }}>
                    <p>{this.props.observacao}</p>
                    <button style={{ margin: '1vh' }} onClick={this.sair.bind(this)}>Sair</button><button style={{ margin: '1vh' }} onClick={this.mostarCampo.bind(this)}>Editar</button>
                </div>
                <div style={{ display: this.state.mostrar }}>
                    <form style={{ marginTop: '1vw' }}>
                        <input style={{ marginTop: '1vw' }} type="text" onChange={this.atualizaObservacao.bind(this)} />
                        <input style={{ marginTop: '1vw', marginRight: '3vw' }} type="button" value="sair" onClick={this.fecharCampo.bind(this)} />
                        <input type="button" value="gravar" onClick={this.gravaObservacao.bind(this)} />
                    </form>

                </div>







            </Tooltip>

        );
    }



    render() {





        return (

            <OverlayTrigger
                trigger="click"
                placement="right"
                delay={{ show: 250, hide: 2000 }}
                overlay={this.renderTooltip.bind(this)}
                id={this.props.id}
                cordaborda={this.props.cordaborda}
                cordofundo={this.props.cordofundo}
                texto={this.props.texto}
                cordoTexto={this.props.cordoTexto}
                sinalanterior={this.props.sinalanterior}
                observacao={this.props.observacao}
                sinalatual={this.props.sinalatual}
                ultimamovimentacao={this.props.ultimamovimentacao}
            >

                <div className={"newLabel"} style={{borderColor: 'black', borderWidth: '50px', marginRight: "2px" }}
                    id={this.props.id}
                    cordaborda={this.props.cordaborda}
                    cordofundo={this.props.cordofundo}
                    texto={this.props.texto}
                    cordoTexto={this.props.cordoTexto}
                    sinalanterior={this.props.sinalanterior}
                    observacao={this.props.observacao}
                    sinalatual={this.props.sinalatual}
                    ultimamovimentacao={this.props.ultimamovimentacao}

                >

                    <div className={"label"} style={{ backgroundColor: this.props.cordaborda}}></div>
                    <div className={"labelMeio"} style={{ backgroundColor: this.props.cordofundo, color: this.props.cordotexto, cursor: 'grab', fontSize: "1.1em" }}>{this.props.texto}</div>
                    <div className={"label"} style={{ backgroundColor: this.props.cordaborda }}></div>

                </div>

            </OverlayTrigger>
        )

    }







}


Placa.propTypes = {


    id: PropTypes.string,
    cordaborda: PropTypes.string,
    cordofundo: PropTypes.string,
    texto: PropTypes.string,
    cordoTexto: PropTypes.string,
    sinalanterior: PropTypes.string,
    observacao: PropTypes.string,
    sinalatual: PropTypes.string,
    ultimamovimentacao: PropTypes.string,


}
