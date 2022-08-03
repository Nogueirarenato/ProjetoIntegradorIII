import React, { Component } from 'react'







class Menu extends Component {


    componentDidMount() {
        document.title = "CPTM - Menu"
        
    }

    abrir_7_10(){
        let route = './Visualizar710'
        this.props.history.push(route);    
    }
  
    abrir_8_9(){
        let route = './Visualizar89'
        this.props.history.push(route);    
    }

    abrir_11_12(){
        let route = './Visualizar1112'
        this.props.history.push(route);   
    }

  

    render() {
        return (
            <div id="containerPageMenu">

                <div id="containerLogin">
                    <h1 className="h1_login"> Quadro Digital</h1>
                    <h2 className="h2_Login">Presidente Altino</h2>


                    <form onSubmit>

                        <input className="buttonLogin buttonLogin-animated buttonLogin-white branco maior" id='1_menu' type="submit" value="Linhas 7 e 10" onClick={this.abrir_7_10.bind(this)} />
                        <input className="buttonLogin buttonLogin-animated buttonLogin-white branco maior" id='1_menu' type="submit" value="Linhas 8 e 9" onClick={this.abrir_8_9.bind(this)}/>
                        <input className="buttonLogin buttonLogin-animated buttonLogin-white branco maior" id='1_menu' type="submit" value="Linhas 11 e 12" onClick={this.abrir_11_12.bind(this)} />

                    </form>


                </div>
            </div>
        )

    }


} export default Menu



