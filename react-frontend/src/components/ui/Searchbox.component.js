// Search box component for user movie search
const Searchbox = ({ value, setSearchMovie }) => {


    return (
        <div className="col col-sm-4" data-testid="test-ens-searchbox">
            <input
                className="form-control"
                value={value}
                onChange={(event) => setSearchMovie(event.target.value)}
                placeholder="Search Movie">
            </input>
        </div>
    );
};

export default Searchbox;