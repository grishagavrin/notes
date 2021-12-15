import useInput from "./hooks/useInput";
function App() {
  const username = useInput("");
  const password = useInput("");

  return (
    <>
      <input {...username} type="text" placeholder="username" />
      <input {...password} type="text" placeholder="password" />
      <button onClick={() => console.log(username.value, password.value)}>
        Click
      </button>
    </>
  );
}
export default App;

//--Custom hook useInput --//
export default function useInput(initValue) {
  const [value, setValue] = useState(initValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return {
    value,
    onChange,
  };
}
