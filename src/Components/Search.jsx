import PropTypes from 'prop-types'

const Search =( {userQuery, handleSearch} ) => {

    return (
    <>
        <p>Country Search:</p>
        <input
        type="text"
        placeholder="Search for a country"
        value={userQuery}
        onChange={handleSearch} 
        />
    </>
    )
} 

Search.propTypes = {
    userQuery: PropTypes.string.isRequired,
    handleSearch: PropTypes.func.isRequired
}

export default Search
