
const Searchbox = (props) => {


    return (
        <div className="col col-sm-4">
            <input 
              className="form-control" 
              value={props.value}
              onChange={(event) => props.setSearchMovie(event.target.value)}
              placeholder="Search Movie">
            </input>
        </div>
    );
};

export default Searchbox;