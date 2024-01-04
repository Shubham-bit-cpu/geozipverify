import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/header.css';
const Header = () => {
    return (
        <>

            <div className="row header ">
                <div className="col-4">
                    <div className="wrapper">
                        <h1 className="headerheading">Search Zipcodes</h1>
                    </div>
                </div>
                <div className="col-4">
                    <div className="wrapper">
                        <h1 className="headerheading">Geozipverify</h1>
                    </div>
                </div>
                <div className="col-4">
                    <div className="wrapper">
                        <h1 className="headerheading"> Verify formatting</h1>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Header;
