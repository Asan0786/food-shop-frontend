import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
       <div className="py-5 mb-4 bg-light rounded-3 mt-1">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Order Your Favourite food here</h1>
          <p className="col-md-8 fs-4">Discover the best foods and drinks in Delhi</p>
          <Link to="/exlorer" className="btn btn-primary btn-lg">Explorer</Link>
        </div>
       
       </div>
    </div>
  )
}

export default Header;
