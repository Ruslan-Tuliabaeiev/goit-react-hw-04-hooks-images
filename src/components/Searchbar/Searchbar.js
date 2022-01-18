import  { useState } from 'react';
import style from '../style.module.css';

export function Searchbar({onSubmit}) {
const [serchFoto, setSerchFoto] = useState('')

 const  handleSubmit = event => {
     event.preventDefault();     
if(serchFoto.trim() === ''){
  alert('Введите название поиска')
  return;
}
     onSubmit(serchFoto);
     setSerchFoto('')
   }
   const handleNameChange = event => {
    setSerchFoto(event.currentTarget.value.toLowerCase() )
   }


  return (

<header className={style.Searchbar} >
  <form className={style.SearchForm}  onSubmit={handleSubmit}>
    <button className={style.SearchFormbutton} type="submit" >
      <span className={style.SearchFormbuttonlabel} >Search</span> 
    </button>

    <input className={style.SearchForminput}
      // class="input"
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos" 
      name="serchFoto"
      value={serchFoto}
      onChange={handleNameChange}

    />
  </form>
</header>
)
}

  








