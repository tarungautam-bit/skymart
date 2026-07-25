import React, { useEffect, useState } from 'react'
import { useLoaderData, useParams, useNavigate, NavLink } from 'react-router'
import { axiosInstance } from '../../public/config/axiosInstance';
import Loading from "../components/Loading";
import ProductCard from '../components/ProductCard';


const ShopPage = () => {

  const getAllCategories = useLoaderData()
  const { category } = useParams()   // grabs category from the URL, e.g. /shop/electronics
  const navigate = useNavigate()

  const [selectedCategory, setSelectedCategory] = useState(category || null);
  const [searchData, setSearchData] = useState(null)

  const [productsdata, setProductsData] = useState([]);
  const [filteredProductsdata, setFilterProductsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProductsData = async () => {
    try {
      setLoading(true);
      let url = selectedCategory ? `products/category/${selectedCategory}` : `products`

      let res = await axiosInstance.get(url);
      setProductsData(res.data.products);
      setFilterProductsData(res.data.products);
    } catch (e) {
      console.log('error', e)
    } finally {
      setLoading(false);
    }
  }

  const filteredData = () => {
    let result = productsdata.filter((val) => {
      return val.title.toLowerCase().includes(searchData.toLowerCase())
    });

    setFilterProductsData(result);
  }

 
  useEffect(() => {
    setSelectedCategory(category || null);
  }, [category]);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    // "All Categories" option should carry an empty value
    if (!value) {
      setSelectedCategory(null);
      navigate('/user/shop');
    } else {
      setSelectedCategory(value);
      navigate(`/user/shop/${value}`);
    }
  }

  useEffect(() => {
    if (searchData === null) return;
    let interval = setTimeout(() => { filteredData(); }, 700)

    return () => { clearTimeout(interval); }

  }, [searchData]);

  useEffect(() => { getProductsData(); }, [selectedCategory]);

  if(loading) return <Loading/>
  return (
    <div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        <h1 className="text-3xl sm:text-4xl font-bold">
          {selectedCategory
            ? getAllCategories.find(c => c.slug === selectedCategory)?.name || 'Products'
            : 'All Products'}
        </h1>
        <p className="text-gray-400 mt-1.5 text-sm sm:text-base">
          {filteredProductsdata?.length || 0} products found
        </p>
      </div>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center gap-2.5 bg-surface border border-gray-800 rounded-2xl px-4 sm:px-5 py-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m1.85-5.4a7.25 7.25 0 11-14.5 0 7.25 7.25 0 0114.5 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              className="bg-transparent outline-none text-sm w-full placeholder:text-gray-500"
              onChange={(e) => setSearchData(e.target.value)}
            />
          </div>

          <div className="relative">
            <select
              className="bg-surface border border-gray-800 rounded-2xl pl-5 pr-10 py-3 text-sm w-full sm:w-48 cursor-pointer focus:outline-none"
              value={selectedCategory || ''}
              onChange={handleCategoryChange}
            >
              <option value="" className='text-black'>All Categories</option>
              {getAllCategories.map((val) => (
                <option value={val.slug} key={val.slug} className='text-black'>{val.name}</option>
              ))}
            </select>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

        </div>
      </div>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

        {loading && (
          <p className="text-gray-400 text-sm">Loading products...</p>
        )}

        {!loading && filteredProductsdata?.length === 0 && (
          <p className="text-gray-400 text-sm">No products found.</p>
        )}

        {!loading && filteredProductsdata?.length > 0 && (
         
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
            {filteredProductsdata.map((product) => (
             <ProductCard product={product}/>
            ))}
          </div>
        
        )}
      </div>

    </div>
  )
}

export default ShopPage