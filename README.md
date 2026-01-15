# Toy Tale - React CRUD Application

A React application for managing a toy collection. This interactive app allows users to view, add, like, and donate toys through a clean and intuitive interface.

## Features

- View all toys in the collection on page load
- Add new toys through an interactive form
- Like toys to increase their popularity
- Donate (delete) toys to GoodWill
- Automatic fallback for broken images
- Full CRUD operations with JSON server backend

## Technologies Used

- **React** - Frontend framework with Hooks
- **Vite** - Build tool and development server
- **JSON Server** - Mock REST API for backend
- **JavaScript (ES6+)** - Programming language
- **CSS3** - Styling

## Learning Objectives

This project demonstrates proficiency in:

- Using the `useEffect` hook for data fetching on component mount
- Managing component state with `useState`
- Implementing full CRUD operations (Create, Read, Update, Delete)
- Making GET, POST, PATCH, and DELETE requests to a REST API
- Props drilling and component communication
- Handling asynchronous operations
- Event handling in React
- Conditional rendering based on state
- Form handling with controlled components

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd toy-tale
```

2. Install dependencies:
```bash
npm install
```

3. Start the JSON server (backend):
```bash
npm run server
```
This will run your backend on `http://localhost:3001`

4. In a new terminal, start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to the local development URL (typically `http://localhost:5173`)

## Usage

### Viewing Toys
- All toys are automatically loaded when the app starts
- Each toy card displays the name, image, number of likes, and action buttons

### Adding a New Toy
1. Click the "Add a Toy" button to reveal the form
2. Fill out the form with:
   - Toy name
   - Image URL
3. Click "Create New Toy"
4. The new toy will appear in the collection immediately with 0 likes

### Liking a Toy
- Click the "Like <3" button on any toy card
- The like count increases by 1
- Changes are saved to the backend

### Donating a Toy
- Click the "Donate to GoodWill" button on any toy card
- The toy is removed from the collection
- Changes are saved to the backend

## Testing

Run the test suite:
```bash
npm run test
```

Verify your backend is working by visiting:
```bash
http://localhost:3001/toys
```

## Code Highlights

### Fetching All Toys on Mount
```jsx
useEffect(() => {
  fetch("http://localhost:3001/toys")
    .then((response) => response.json())
    .then((data) => setToys(data))
    .catch((error) => console.error("Error fetching toys:", error));
}, []);
```
Fetches all toys when the component mounts.

### Adding a New Toy (POST Request)
```jsx
function addToy(newToy) {
  fetch("http://localhost:3001/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newToy),
  })
    .then((response) => response.json())
    .then((toy) => setToys([...toys, toy]));
}
```
Sends new toy data to the backend and updates state.

### Liking a Toy (PATCH Request)
```jsx
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
    });
}
```
Increments likes and maintains toy order in the collection.

### Deleting a Toy (DELETE Request)
```jsx
function deleteToy(id) {
  fetch(`http://localhost:3001/toys/${id}`, {
    method: "DELETE",
  })
    .then(() => {
      setToys(toys.filter((toy) => toy.id !== id));
    });
}
```
Removes toy from backend and updates state.

### Image Fallback Handler
```jsx
<img
  src={toy.image}
  alt={toy.name}
  className="toy-avatar"
  onError={(e) => e.target.src = "https://via.placeholder.com/300x300?text=No+Image"}
/>
```
Displays placeholder image if the toy's image fails to load.

## API Reference

**Base URL:** `http://localhost:3001`


## Project Structure
```
toy-tale/
├── src/
│   ├── components/
│   │   ├── App.jsx              # Main app component with state management
│   │   ├── Header.jsx           # App header with logo
│   │   ├── ToyForm.jsx          # Form for adding new toys
│   │   ├── ToyContainer.jsx     # Container for toy cards
│   │   └── ToyCard.jsx          # Individual toy display with actions
│   ├── main.jsx                 # Application entry point
│   └── index.css                # Global styles
├── db.json                      # JSON server database
├── package.json                 # Project dependencies
└── README.md                    # Project documentation
```

## Development Workflow

This project was built using a feature-branch Git workflow:

1. **Feature: Display All Toys** - Implemented GET request and rendering
2. **Feature: Add a Toy** - Implemented POST request and form handling
3. **Feature: Donate a Toy** - Implemented DELETE request
4. **Feature: Like a Toy** - Implemented PATCH request

Each feature was developed on its own branch, tested, then merged to main via Pull Request.

## Future Enhancements

- [ ] Add search/filter functionality by toy name
- [ ] Implement sorting options (by name, likes)
- [ ] Add edit functionality to update toy details
- [ ] Include toy categories or tags
- [ ] Add image upload capability
- [ ] Implement user authentication
- [ ] Add animation effects for adding/removing toys
- [ ] Create a wishlist feature
- [ ] Add toy availability status
- [ ] Include toy descriptions and details

## Author

**Shobinn Clark** - Full-Stack Software Engineering Student at Flatiron School

## Acknowledgments

- Flatiron School for the React CRUD lab assignment
- Toy Story characters for the demo data
