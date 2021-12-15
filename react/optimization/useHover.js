import useHover from "./hooks/useHover";
function App() {
  const ref = useRef();
  const isHovering = useHover(ref);
  console.log(isHovering);

  return (
    <div>
      <div
        ref={ref}
        style={{
          width: 300,
          height: 300,
          background: "red",
        }}
      ></div>
    </div>
  );
}
export default App;

//--Custom hook useHover --//
export default function useHover(ref) {
  const [isHovering, setHovering] = useState(false);
  const on = () => setHovering(true);
  const off = () => setHovering(false);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const node = ref.current;
    node.addEventListener("mouseenter", on);
    node.addEventListener("mousemove", on);
    node.addEventListener("mouseleave", off);

    return () => {
      node.removeEventListener("mousemove", on);
      node.removeEventListener("mouseenter", on);
      node.removeEventListener("mouseleave", off);
    };
  }, []);

  return isHovering;
}


