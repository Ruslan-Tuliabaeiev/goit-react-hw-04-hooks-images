

import {  useEffect, useState  } from 'react';
import {Searchbar} from './components/Searchbar/Searchbar';
//import SerchFotoInfo from './components/SerchFotoInfo';
import { ImageGallery } from './components/ImageGallery/ImageGallery';
import { Button } from './components/Button/Button';
import {Spinner } from './components/Loader/Loader';
import { Modal } from './components/Modal/Modal';
import mapper from './components/maper/maper';


function App()  {
 const [serchFoto, setSerchFoto] = useState('')
//  const [error, setError] = useState(null)
 const [status, setStatus] = useState('')
 const [loading, setLoading] = useState(false)
 const [result, setResult] = useState([])
 const [page, setPage] = useState(1)
 const [shouModal, setShouModal] = useState(false)
 const [elemModal, setElemModal] = useState([])

 useEffect(() => {


  if(!serchFoto)  {return;}

  fetch(`https://pixabay.com/api/?q=${serchFoto}&page=${page}&key=24011003-4a9e2bf62a6e3281e228c94d5&image_type=photo&orientation=horizontal&per_page=12`)
 
.then(response => response.json())
  

.then(({hits}) => {
  if(hits.length === 0 ) {
    //  alert('Erorr')
 setStatus ('rejected')
    return
  }
 
    setResult( prevState => [...prevState, ...mapper(hits) ]); setStatus('resollved');
setLoading(false);})

}, [page, serchFoto])

 const handleFormSubmit = (serch) => {
  setSerchFoto(serch); setStatus('panding'); setPage(1); setResult([]);

  }

const nextPage = () => {
    setPage(prevState => prevState + 1);
    setLoading(true);
 }

const closeModal = () => {
  setShouModal(prevState => !prevState)
 }   
    
 const clickOnImage = event => {
  const src = event.target.getAttribute('data-url')
const alt = event.target.getAttribute('alt')
  setShouModal(true);  
 setElemModal({src, alt});

}



     
  const bth = !(result.length < 12) 
  
          return( 
     <div>
   <Searchbar onSubmit={handleFormSubmit}/>
  
   {status === 'resollved' && <>{ <ImageGallery
    result={result}
    clickImage={clickOnImage}
    /> }
   {bth && <Button nextPage={nextPage} loading={loading}  > 
  
   </Button>}
  
  
   </>}
  
     {status === 'panding' && <div><h2>loading...<Spinner /></h2> </div>}
  
        {status === 'idle' && <div>введите название поиска</div> }   
  
       {status === 'rejected' && <div><h1>Error</h1></div>}
  
   {shouModal && (<Modal alt={elemModal.alt } src={elemModal.src} onClose={closeModal}/>) } 
          </div>
        )
    
    

   


}

export default App;




