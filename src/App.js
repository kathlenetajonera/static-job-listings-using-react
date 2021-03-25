import Header from "./Header";
import MainContainer from './MainContainer';
import FilterBar from "./FilterBar";
import './css/App.css';

function App() {
  return (
    <div className="App">
      <Header />
      {/* { filters.length === 0 ? '' : <FilterBar /> }
      <FilterBar /> */}
      <MainContainer />
    </div>
  );
}

export default App;
