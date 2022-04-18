import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Loader from '../Loader/Loader';
import Paginate from '../Paginator/Paginate'

import './Giphy-Table.css'

const GiphyTable = () => {

  const limit = 10;

  const [allData, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await axios(
          "https://api.giphy.com/v1/gifs/trending",
          {
            params: { api_key: 'wTeUtrawdB8ZGnARgwYknskWUsSW4155' }
          });
        const data = results.data.data;
        setData(data);
        setFilteredData(data.slice(0, 10));
      } catch (err) {
        setIsError(true);
      }
    }
    fetchData();
  }, [])

  const pageSelected = pageNumber => {
    setCurrentPage(pageNumber);
    let startAt, endAt, filteredAfterPaginationData;
    if (pageNumber === 1) {
      startAt = 0;
      endAt = limit;
    } else {
      startAt = (pageNumber * limit) - limit;
      endAt = startAt + limit;
    }
    filteredAfterPaginationData = allData.slice(startAt, endAt);
    setFilteredData(filteredAfterPaginationData);
  }

  const renderTable = () => {
    if (isLoading) {
      return <div className='loader'><Loader /></div>
    }

    return <div className='table-wrapper'>
      <table className='table'>
        <thead>
          <tr>
            <th>Gifs</th>
          </tr>
        </thead>
        <tbody>
          {filteredData && filteredData.map(value =>
            <tr key={value.id}>
              <th>
                <img alt={value.id} src={value.images.fixed_height.url} />
              </th>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  }

  const renderSearch = () => {
    return <React.Fragment>
      <div className='search-wrapper'>
        <input value={search} onChange={handleSearchChange}
          type='text'
          placeholder='Search'
          className='form-control'
        />
        <button
          onClick={handleSubmit}
          type='submit'
          disabled={search === '' || search.trim().length === 0}
          className='btn btn-primary mx-2'>
          Search
        </button>
      </div>

    </React.Fragment>
  }

  const renderPaginator = () => {
    return <React.Fragment>
      <Paginate
        pageSelected={pageSelected}
        currentPage={currentPage}
        itemsPerPage={10}
        totalItems={allData.length}
      />
    </React.Fragment>
  }

  const handleSearchChange = event => {
    setSearch(event.target.value)
  }

  const handleSubmit = async event => {
    event.preventDefault();
    setIsError(false);
    setIsLoading(true);
    try {
      const results = await axios("https://api.giphy.com/v1/gifs/search", {
        params: {
          api_key: 'wTeUtrawdB8ZGnARgwYknskWUsSW4155',
          q: search
        }
      })
      const data = results.data.data;
      setData(data);
      setFilteredData(data.slice(0, 10));
    } catch (err) {
      setIsError(true);
    }
    setIsLoading(false);
  }

  return (
    <React.Fragment>
      <div className='wrapper'>
        {renderSearch()}
        {renderTable()}
        {renderPaginator()}
      </div>
    </React.Fragment>
  )
}

export default GiphyTable;
