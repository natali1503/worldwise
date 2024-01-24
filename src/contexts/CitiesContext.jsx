import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
const BASE_URL = "http://localhost:7000/";
const CitiesContext = createContext();
/* eslint-disable */
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, loading: true };
    case "cities/loading":
      return { ...state, loading: false, cities: action.payload };
    case "city/loading":
      return { ...state, loading: false, currentCity: action.payload };
    case "city/create":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/delete":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities.filter((city) => city.id !== action.payload)],
        currentCity: {},
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      new Error("Неизвестный тип");
  }
}
const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};
function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}cities`);
        const data = await res.json();
        dispatch({ type: "cities/loading", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "Произошла ошибка при загрузке данных",
        });
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}cities/${id}`);
        const data = await res.json();
        dispatch({ type: "city/loading", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "Произошла ошибка при добавлении данных",
        });
      }
    },
    [currentCity.id]
  );
  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}cities/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-type": "application/json" },
      });
      const data = await res.json();
      dispatch({ type: "city/create", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "Произошла ошибка при загрузке данных",
      });
    }
  }
  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/delete", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "Произошла ошибка при удалении данных",
      });
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
        error,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext используется вне CitiesProvider");
  return context;
}
export { useCities, CitiesProvider };
