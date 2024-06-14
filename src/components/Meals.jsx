import { useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import useHttp from "../hooks/useHTTP";
import Error from "./Error";
const requestConfig = {};
export default function Meals() {
  const {
    data: mealData,
    isLoading,
    error
  } = useHttp("http://localhost:3000/meals", requestConfig, []);
  // const [mealData, setMealData] = useState([]);
  // useEffect(() => {
  //   async function fetchMeals() {
  //     const response = await fetch("http://localhost:3000/meals");
  //     const fetchedData = await response.json();
  //     console.log(fetchedData);
  //     setMealData(fetchedData);
  //   }
  // try {
  //   fetchMeals();
  // fetch ('http://localhost:3000/meals').then((response)=>{
  //     if(!response.ok){
  //         throw new Error("error fetching details")
  //     }
  //     return response.json()
  // })
  //     .then((fetchedData)=>{
  //         console.log(fetchedData)
  //     setMealData(fetchedData)
  // })
  // console.log(data)
  // } catch (error) {
  //   console.log(error.message);
  // }
  // }, []);
  if (isLoading){
    return <p className="center"> Fetching Meals....</p>
  }
  if(error){
    return <Error title="Failed to fetch Meals" message={error}></Error>
  }
  return (
    // <div>
    <ul id="meals">
      {mealData.length > 0 &&
        mealData.map((meal) => <MenuItem key={meal.id} meal={meal}></MenuItem>)}
    </ul>
    // </div>
  );
}
