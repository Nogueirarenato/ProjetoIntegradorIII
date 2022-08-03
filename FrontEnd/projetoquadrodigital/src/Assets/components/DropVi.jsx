import React from 'react'
import PropTypes from 'prop-types'
import Url from '../../Services/apiServer'


export default class Drop extends React.Component {



    drop = (e) => {
        e.preventDefault();
        let dNow = new Date()
        var id = e.dataTransfer.getData('id')
        if (id === 'trash2') return (null)
        var cor = e.dataTransfer.getData('cor')
        var cordofundo = e.dataTransfer.getData('cordofundo')
        var cordotexto = e.dataTransfer.getData('cordotexto')
        var etiqueta = e.dataTransfer.getData('etiqueta')
        var hora = dNow.getDate() + "/" + (dNow.getMonth() + 1) + "/" + dNow.getFullYear() + " " + dNow.getHours() + ":" + dNow.getMinutes();
        var observacao = e.dataTransfer.getData('observacao')
        var sinalanterior = e.dataTransfer.getData('sinalanterior')
        var sinalatual = e.dataTransfer.getData('sinalatual')
        sinalanterior = sinalatual;
        sinalatual = this.props.id
        e.target.appendChild(document.getElementById(id))


        fetch(Url + "Placas", {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem('TOKEN_KEY')
            },
            body: JSON.stringify({
                "id": id,
                "cor": cor,
                "cordofundo": cordofundo,
                "cordotexto": cordotexto,
                "etiqueta": etiqueta,
                "hora": hora,
                "observacao": observacao,
                "sinalanterior": sinalanterior,
                "sinalatual": sinalatual


            })
        }
        )





    }


    allowDrop = (e) => {
        e.preventDefault();

    }




    render() {
        return (
            <div id={this.props.id} draggable="false" style={this.props.style} style={{ width: "'200%'", height: "'200%'", display: 'flex', color: '#00000000', margin: '0' }}>
                {this.props.children}
            </div>
        )
    }
}




Drop.propTypes = {
    id: PropTypes.string,
    children: PropTypes.node,

}