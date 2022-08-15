import React from 'react'
import PropTypes from 'prop-types'
import Url from '../../Services/apiServer'


export default class DropDel extends React.Component {



    drop = (e) => {
        e.preventDefault();
        var id = e.dataTransfer.getData('id')
        e.target.appendChild(document.getElementById(id))



        fetch(Url + "Placas", {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                mode: 'no-cors',
               // Authorization: "Bearer " + localStorage.getItem('TOKEN_KEY')
            },
            body: JSON.stringify({
                "id": id


            })
        }
        )





    }


    allowDrop = (e) => {
        e.preventDefault();

    }




    render() {
        return (
            <div id={this.props.id} onDrop={this.drop} onDragOver={this.allowDrop} >
                {this.props.children}
            </div>
        )
    }
}




DropDel.propTypes = {
    id: PropTypes.string,
    children: PropTypes.node,

}