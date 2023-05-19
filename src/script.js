import './styles.css'
import  TextoBtn from './componentes/scriptReact'
import React, {useState,useEffect} from 'react'

async function baralhoDeCarta(){
  try{
  
  let baralho = await new Promise(async function (resolve, reject) {
     
      let itemDaApi = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
      
      if(itemDaApi.ok) {
          let apiFormatada = await itemDaApi.json();
          resolve(apiFormatada)
      } 
      else {
          reject('Erro na função criarBaralho. Erro: ' + itemDaApi.status);
      }
           
  });
      
  let carta = await new Promise(async function (resolve, reject) {
      
      let itemDaApi = await fetch(`https://deckofcardsapi.com/api/deck/${baralho.deck_id}/draw/?count=1`);
       
        if (itemDaApi.ok) {    
          let apiFormatada = itemDaApi.json()          
          resolve(apiFormatada)
        } 
        else {
          reject('Erro na função tirandoUmaCarta. Erro: ' + itemDaApi.status);
        }
         
  })
      
  return carta
  
  }
  
  catch(error){
      console.error(error)
      alert("Aconteceu um erro volte mais tarde.")
  }
}

function App(){

let [objCarta,setObjCarta] = useState()
   
useEffect( ()=>{   
    async function pegandoCarta(){
      let carta = await baralhoDeCarta()
      setObjCarta(carta)
    }   
    pegandoCarta()
},[])

return(
<>
{
 objCarta? (
    <img src = {objCarta.cards[0].image}/>
 ) : (
     ""
   )
}
</>  

)

}
export default App


  
























