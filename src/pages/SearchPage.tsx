import { useSearchRestaurants } from '@/api/RestaurantApi';
import CuisinesFilter from '@/components/CuisinesFilter';
import PaginationSelector from '@/components/PaginationSelector';
import SearchBar, { SearchForm } from '@/components/SearchBar';
import SearchResultInfo from '@/components/SearchResultInfo';
import SearchResultsCard from '@/components/SearchResultsCard';
import SortOptionDropDown from '@/components/SortOptionDropDown';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: '',
    page: 1,
    selectedCuisines: [],
    sortOption: 'bestMatch',
  });
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const { results, isLoading } = useSearchRestaurants(searchState, city);

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => {
      return { ...prevState, searchQuery: searchFormData.searchQuery, page: 1 };
    });
  };

  const resetSearch = () => {
    setSearchState((prevState) => {
      return { ...prevState, searchQuery: '', page: 1 };
    });
  };

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => {
      return { ...prevState, selectedCuisines, page: 1 };
    });
  };

  const setPage = (page: number) => {
    setSearchState((prevState) => {
      return { ...prevState, page: page };
    });
  };

  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({ ...prevState, sortOption, page: 1 }));
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (!results?.data || !city) {
    return <span>No results found</span>;
  }

  return (
    <div className=' grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5'>
      <div id='cuisines-list'>
        <CuisinesFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
          isExpanded={isExpanded}
          onExpandedClick={() =>
            setIsExpanded((prevIsExpanded) => !prevIsExpanded)
          }
        />
      </div>
      <div id='main-content' className='flex flex-col gap-5'>
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeHolder='Search by cuisine or Restaurant Name'
          onReset={resetSearch}
        />
        <div className='flex justify-between flex-col gap-3 lg:flex-row'>
          <SearchResultInfo total={results.pagination.total} city={city} />
          <SortOptionDropDown
            sortOption={searchState.sortOption}
            onChange={(value) => setSortOption(value)}
          />
        </div>
        {results.data.map((restaurant, index) => (
          <SearchResultsCard key={index} restaurant={restaurant} />
        ))}
        {results?.data.length > 0 && (
          <PaginationSelector
            page={results.pagination.page}
            pages={results.pagination.pages}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
};

export default SearchPage;
