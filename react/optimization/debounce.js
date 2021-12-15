import useDebounce from "./hooks/useDebounce";
function App() {
  const [value, setValue] = useState("");
  const debouncedSearch = useDebounce(search, 1000);

  function search(query) {
    fetch(`https://jsonplaceholder.typicode.com/todos?_query=` + query)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
      });
  }

  const onChange = (e) => {
    setValue(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <div>
      <input type="text" value={value} onChange={onChange} />
    </div>
  );
}
export default App;

//--Custom hook useDebounce --//
export default function useDebounce(callback, delay) {
  const timer = useRef();
  const debouncedCallback = useCallback(
    (...args) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
  return debouncedCallback;
}

