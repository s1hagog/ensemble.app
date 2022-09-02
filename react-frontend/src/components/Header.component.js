// Simple Header component
const Header = ({ heading }) => {
    return (
        <div data-testid="test-ens-header" className="col">
            <h1>{heading}</h1>
        </div>
    )

}

export default Header;