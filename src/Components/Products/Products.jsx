import React, {useContext, useState, useEffect} from 'react'
import './Products.css'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { Context } from '../../Context/Context';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Banner from '../Banner/Banner';
import ProductDetail from './ProductDetail';


 import ProductCard from './ProductCard';
 import { filterProductsByCategory, getProducts, getSingleProduct } from '../../firebase/firebase';

 



 const Products = () => {


  const {cart, setCart} = useContext(Context)
   const [singleProd, setSingleProd] = useState([]);
   const [myProds, setMyProds] = useState([]);
   const { Id } = useParams();
   const [loading, setLoading] = useState(true);
   const { categoryId } = useParams();



   useEffect(() => {
    const fetchProducts = async () => {
        try {

          if (Id) { // Verifica si hay un productId
            const singleProd = await getSingleProduct(Id); // Obtén el producto específico
            setSingleProd(singleProd);
            setMyProds([]);
            console.log('dentro del detail')

          } else if (categoryId) {
          const products = await filterProductsByCategory(categoryId); // Usa categoryId aquí
          setMyProds(products);
          setSingleProd([])
      } else {
        const allProducts = await getProducts(); // Obtén todos los productos si no hay categoryId
        setMyProds(allProducts);
      }
    } catch (error) {
      console.error('Error al obtener productos:', error);
    } finally {
      setLoading(false);
    }
  };

    fetchProducts();
  }, [categoryId]); // Asegúrate de que el efecto se ejecute cuando categoryId cambie

  console.log(singleProd)
  console.log(Id)
  console.log(categoryId)

  if (loading) {
    return <p>Cargando productos...</p>; // Mensaje de carga
  }

   return (
    <>
    <Navbar/>
    <Banner/>

    <div className='card-container'>   

     {/* {singleProd && (
      <p>
    <ProductDetail key={singleProd.id} prod={singleProd}/>
        </p>
          )}  */}
      {myProds &&  (



        
         myProds.map((prod) => <ProductCard key={prod.id} prod={prod} />))}

{myProds !=  (



        
<h1>No hay prods</h1>)}
         
    </div>
     </>
   );







  

    // const {cart, setCart} = useContext(Context)
   
    const [products, setProducts] = useState([])
     const [categoria, setCategoria] = useState("");
    // const [loading, setLoading] = useState(true);

    // const { categoryId } = useParams();
    // const { id } = useParams();
    


   
    


  const buyProducts = (prod) => {

    toast.success("PRODUCTO SUMADO AL CARRO!!!", {
      autoClose: 5000,
      position: 'top-left',
       className: 'foo-bar',
      theme: 'dark'
   });

    setCart([...cart, prod])

  }
    
   



     const handleShowDetails =() =>{
        console.log('click')
        
         toast.success("PRODUCTO DISPONIBLE!!!", {
            autoClose: 5000,
            position: 'top-left',
             className: 'foo-bar',
            theme: 'dark'
         });
     }




     useEffect(() => {
      const fetchProducts = async () => {
          setLoading(true); // Iniciar el loading
          const response = await fetch('https://fakestoreapi.com/products');
          const data = await response.json();

          // Filtrar productos por categoría si categoryId está presente
          const filteredProducts = categoryId ? data.filter(product => product.category === categoryId) : data;
          setProducts(filteredProducts);
          setLoading(false); // Finalizar el loading
      };

      fetchProducts();
  }, [categoryId]); // Dependencia de categoryId para detectar cambios en la URL

  if (loading) {
      return <div>Cargando productos...</div>;
  }


    

  return (
   
    <div>

<Navbar/>
<Banner/>
    

            
            
        
    
    <div className='card-container' key={products.id}>




           
        {
            
        
            products?.map(prod => {

                console.log(categoria)
                
               return(
                
                   

                
                
                <div>
                    <div className="card" style={{width: '16rem'}} key={prod.id}>
                    <img src={prod.image} className="card-img-top"/>
                        <div className="card-body">
                            <h5 className="card-title">{prod.title}</h5>
                            <h5 className="price">💰 ${prod.price}</h5>
                            </div>
                            <button className="btn btn-primary" onClick={() => buyProducts(prod)}>🔸SUMAR AL CARRITO 🛒</button>
                        
                    <button className="btn btn-light" onClick={handleShowDetails}>🔸Consultar disponibilidad 📖 </button>
                    
                    <button className="btn btn-outline-info"> <Link to={`/products/${prod.id}`}>Más detalles</Link> </button>

                    
                 
                    
                    <ToastContainer/>
                    </div>
                
                
                    
                    
                </div>

                
               
               ) 
             
            })
        }   
       
    
      
    </div>
    </div>
  
  )


}





export default Products



