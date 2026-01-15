import React from "react";

function ToyCard({ toy, deleteToy, likeToy }) {
  return (
    <div className="card" data-testid="toy-card">
      <h2>{toy.name}</h2>
      <img
        src={toy.image}
        alt={toy.name}
        className="toy-avatar"
        onError={(e) => e.target.src = "https://via.placeholder.com/300x300?text=No+Image"}
      />
      <p>{toy.likes} Likes </p>
      <button className="like-btn" onClick={() => likeToy(toy.id)}>
        Like &lt;3
      </button>
      <button className="del-btn" onClick={() => deleteToy(toy.id)}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;