import {Link} from 'react-router-dom';
import logo from '../img/RSHS_1_Logo.png';
import { useNavigate } from 'react-router-dom';
import { Delete } from '../hooks/authorize';

export default function Header() {
    const navigate = useNavigate();

    const navToHome = () => {
        navigate('/');
    }

    return (
        <div class="tw-top-0 tw-fixed tw-w-full tw-z-10">
          <nav class="navbar navbar-light tw-bg-steel-blue">
            <div class="container-fluid">
              <a class="navbar-brand">
                <img src={logo} width="40" alt="Logo" height="40" class="d-inline-block tw-cursor-pointer" onClick={navToHome}/>
                <label class="tw-pl-2 tw-font-rubik">Online Archive System</label>
              </a>

              <div class="tw-bg-steel-blue tw-rounded-lg">
              <button class="tw-rounded-full tw-h-[40px] tw-border-none tw-bg-transparent hover:tw-bg-gray-50 hover:tw-bg-opacity-[25%] tw-duration-500 hover:tw-rotate-180" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                  <i class="bi bi-list tw-text-3xl"></i>
              </button>
              </div>
              
              <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                  <Link class="nav-link active" aria-current="page" to="/">
                    <label class="tw-cursor-pointer">Home</label>
                  </Link>
                  <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">Manuscripts</a>
                  <ul class="dropdown-menu">
                    <li>
                      <Link class="dropdown-item" to="/category/lifescience">Life Science</Link>
                    </li>

                    <li>
                      <Link class="dropdown-item" to="/category/physicalscience">Physical Science</Link>
                    </li>

                    <li>
                      <Link class="dropdown-item" to="/category/socialscience">Social Science</Link>
                    </li>

                    <li>
                      <Link class="dropdown-item" to="/category/mathematics">Mathematics</Link>
                    </li>

                    <li>
                      <Link class="dropdown-item" to="/category/robotics">Robotics</Link>
                    </li>

                  </ul>
                  <Link class="nav-link active" aria-current="page" to="/login">
                    <label class="tw-cursor-pointer" onClick={() => {
                      Delete();
                      navigate("/login");
                      window.location.reload();}}>Sign Out</label>
                  </Link>
                </div>

                {/* <div class="navbar-nav">
                <Link class="" to="/">Sign Out</Link>
                </div> */}
              </div>
            </div>
          </nav>
      </div>
    )
}