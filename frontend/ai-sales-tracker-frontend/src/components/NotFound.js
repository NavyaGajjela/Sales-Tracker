import {Link} from "react-router-dom"

const NotFound=()=>{
    return(<div>
        <h1>Oops somthing went Wrong page Not found</h1>
        <button><Link to="/">Go to Home</Link></button>
    </div>)
}
export default NotFound