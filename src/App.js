import { useState } from 'react';
import './App.css';

const initialState={name:'',price:0}

const App= ()=> {
  
  const [isLoading,setIsLoading]=useState(false)
  const [product,setproduct]=useState(initialState)

  const handleChange=(e)=>{
    //console.log({Evento:e.target.value})
    const fieldValue=e.target.value
    const fieldName=e.target.name
    setproduct({...product,[fieldName]:[fieldValue]})
  }

  const handleSubmit=(e)=>{
    e.preventDefault()    
    if(!product.name){
      console.log('Tienes que llenar el campo Nombre')
      return
    }
    fetch('http://localhost:4000/api/v1/products',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(product),
    })
    .then((res)=>res.json())
    .then((data)=>{
      if(data.ok){
        console.log("producto creado exitosamente!")
        setproduct(initialState)
        
      } else{
        console.log(data.message)
      }
      setIsLoading(false)
    })
    .catch((err)=>{
      console.log(err)
      setIsLoading(false)
    })
  } 

  return (
    <div className="App">
      <h1>Nuevo Producto</h1>
      <form onSubmit={handleSubmit}>
        <input 
          onChange={handleChange}
          value={product.name}
          type='text' 
          name='name' 
          placeholder='Nombre del producto...'/>
        <input
          onChange={handleChange}
          value={product.price}
          type='number' 
          name='price'
          placeholder='Precio del producto '/>
        <button>{isLoading?'Creando producto...':'Crear producto'}</button>
      </form>
    </div>
  );
}

export default App;

