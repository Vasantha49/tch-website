function CategoryFilter({ events, onFilter }) {
  const categories = ["All", "Festival", "Cultural", "Kids", "Sports", "Meetup"];

  function filter(category) {
    if (category === "All") {
      onFilter(events);
    } else {
      onFilter(events.filter((e) => e.category === category));
    }
  }

  return (
    <div className="category-filter">
      {categories.map((cat) => (
        <button key={cat} onClick={() => filter(cat)}>
          {cat}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;