import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from '../../store/action/productAction';
import LoadingPage from "../LoadingPage/LoadingPage";
import { Link, useNavigate } from 'react-router-dom';
import { IoArrowBackOutline } from "react-icons/io5";

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.products); 
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      setSearched(false);
      return;
    }
    // Only search if query is not empty
    const filtered = items.filter(item =>
      typeof item.name === "string" &&
      item.name.toLowerCase().includes(query.trim().toLowerCase())
    );
    setResults(filtered);
    setSearched(true);
  }, [query, items]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    setSearched(true);
  };
  const backBUtton=()=>{
    navigate(-1)
  }
  return (
    <div className='w-full min-h-screen bg-gradient-to-br relative  p-6'>
      <button onClick={()=>backBUtton()} className='  fixed top-[10%] md:top-[20%] px-6 py-2 rounded bg-yellow-400 active:scale-90 text-black font-semibold hover:bg-yellow-300 transition  cursor-pointer text-xl '>Back</button>
      <div className="search-items mt-10 p-4 max-w-2xl mx-auto">
        <form
          className='w-full bg-[#1C1D20]  p-4 rounded-lg border border-[#897cec]'
          onSubmit={handleSearch}
        >
          <div className="flex gap-2">
            <input
              className='flex-1 p-2 rounded outline-none text-white bg-[#23242a] placeholder-[#897cec] border border-[#897cec] focus:ring-2 focus:ring-[#897cec] transition'
              type="text"
              placeholder="Search for products..."
              value={query}
              onChange={handleInputChange}
              autoFocus
            />
            <button
              type="submit"
              className="bg-[#897cec] text-white px-4 py-2 rounded-xl font-bold hover:bg-[#5641F3] transition-colors"
            >
              Search
            </button>
          </div>
        </form>
        <div className="mt-6 min-h-[200px]">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <LoadingPage />
            </div>
          ) : (
            <>
              {results.length > 0 ? (
                <ul className="bg-[#23242a] rounded shadow p-4 border border-[#897cec] grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {results.map((product) => (
                    <Link to={`/shop/${product.id}`}
                      key={product.id}
                      className="flex items-center gap-4 p-3 bg-[#18181b] rounded-lg border border-[#897cec] hover:shadow-lg transition"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-md border border-[#897cec] bg-[#23242a]"
                        loading="lazy"
                        onError={e => { e.target.src = "https://via.placeholder.com/64x64?text=No+Image"; }}
                      />
                      <div>
                        <div className="text-white font-semibold text-lg">{product.name}</div>
                        <div className="text-yellow-400 font-bold text-base mt-1">₹{product.price}</div>
                        {product.category && (
                          <div className="text-xs text-gray-400 mt-1">{product.category}</div>
                        )}
                      </div>
                    </Link>
                  ))}
                </ul>
              ) : searched && query.trim() ? (
                <div className="text-gray-400 mt-4 text-center">No results found.</div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
