import { NavLink } from "react-router-dom";

function SubMenu() {
  const [categories, setCategories] = useState([]);
  const [skinTypes, setSkinTypes] = useState([]);
  const [skinConcerns, setSkinConcerns] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch("/api/v1/category/list");
      const data = await response.json();
      console.log("Catégories récupérées :", data);
      setCategories(data);
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchSkinTypes() {
      const response = await fetch("/api/v1/skintype/list");
      const data = await response.json();
      setSkinTypes(data);
    }
    fetchSkinTypes();
  }, []);

  useEffect(() => {
    async function fetchSkinConcerns() {
      const response = await fetch("/api/v1/skinconcern/list");
      const data = await response.json();
      setSkinConcerns(data);
    }
    fetchSkinConcerns();
  }, []);
}

export default SubMenu;
