import React from 'react'
import PropTypes from 'prop-types'




export default class Drag extends React.Component {

    drag = (e) => {
        e.dataTransfer.setData('id', e.target.id);
        e.dataTransfer.setData('cor', this.props.cor)
        e.dataTransfer.setData('cordofundo', this.props.cordofundo)
        e.dataTransfer.setData('cordotexto', this.props.cordotexto)
        e.dataTransfer.setData('etiqueta', this.props.etiqueta)
        e.dataTransfer.setData('hora', this.props.hora)
        e.dataTransfer.setData('observacao', this.props.observacao)
        e.dataTransfer.setData('sinalanterior', this.props.sinalanterior)
        e.dataTransfer.setData('sinalatual', this.props.sinalatual)


        console.log("drag ", e.target.id)
        console.log("sinal anterior", this.props.sinalanterior)

    }


    noAllowDrop = (e) => {
        e.stopPropagation();
    }


    render() {
        return (
            <div
                id={this.props.id}
                cor={this.props.cor}
                cordofundo={this.props.cordofundo}
                cordotexto={this.props.cordotexto}
                etiqueta={this.props.etiqueta}
                hora={this.props.hora}
                observacao={this.props.observacao}
                sinalanterior={this.props.sinalanterior}
                sinalatual={this.props.sinalatual}


                draggable='true' onDragStart={this.drag}

                onDragOver={this.noAllowDrop} >
                {this.props.children}


            </div >
        )

    }







}


Drag.propTypes = {


    id: PropTypes.string,
    children: PropTypes.node,

}
