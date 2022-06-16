
import Note from './Note';

export const Home=(props) => {
 const  {showAlert} = props
  return (
    <>
    
      <Note showAlert={showAlert}/>      
    </>
  )
}

export default Home
