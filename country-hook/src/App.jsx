import React, { useState, useEffect } from "react";
import axios from "axios";

const baseUrl = " https://studies.cs.helsinki.fi/restcountries/api";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (name !== "") {
      axios
        .get(`${baseUrl}/name/${name.toLowerCase()}`)
        .then((response) => {
          const data = response.data;
          if (data) {
            setCountry({ found: true, data });
          } else {
            setCountry({ found: false });
          }
        })
        .catch((error) => {
          console.error("Error fetching country data:", error);
          setCountry(null); // Handle error case as needed
        });
    } else {
      setCountry(null); // Reset country state if name is empty
    }
  }, [name]);

  return country;
};

const Country = ({ country }) => {
  console.log(country);
  if (!country) {
    return null;
  }

  if (!country.found) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.data.name.common} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img
        src={country.data.flags.png}
        height="100"
        alt={`flag of ${country.data.name}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
