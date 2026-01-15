import React, { useState, useEffect } from "react";
import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  // Fetch all toys on component mount
  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched toys:", data); // Debug log
        setToys(data);
      })
      .catch((error) => console.error("Error fetching toys:", error));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function addToy(newToy) {
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToy),
    })
      .then((response) => response.json())
      .then((toy) => setToys([...toys, toy]))
      .catch((error) => console.error("Error adding toy:", error));
  }

  function deleteToy(id) {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setToys(toys.filter((toy) => toy.id !== id));
      })
      .catch((error) => console.error("Error deleting toy:", error));
  }

  function likeToy(id) {
    const toy = toys.find((t) => t.id === id);
    const updatedLikes = toy.likes + 1;

    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: updatedLikes }),
    })
      .then((response) => response.json())
      .then((updatedToy) => {
        setToys(toys.map((t) => (t.id === id ? updatedToy : t)));
      })
      .catch((error) => console.error("Error liking toy:", error));
  }

  console.log("Current toys state:", toys); // Debug log

  return (
    <>
      <Header />
      {showForm ? <ToyForm addToy={addToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} deleteToy={deleteToy} likeToy={likeToy} />
    </>
  );
}

export default App;