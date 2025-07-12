const allEvents = [
    {
      id: 1,
      name: "Hope Orphanage Visit",
      date: "2025-07-23",
      location: "Zindiro",
      category: "Charity Events",
      description: "Bring happiness to Hope Orphanage children"
    },
  ];

  function getQueryParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      search: urlParams.get('search')?.toLowerCase() || '',
      date: urlParams.get('date'),
      category: urlParams.get('category')
    };
  }

  function renderallEvents() {
    const list = document.getElementById("event-list");
    if (!list) return;

    const { search, date, category } = getQueryParams();

    let filteredallEvents = allEvents.filter(e => {
      const matchSearch = e.name.toLowerCase().includes(search);
      const matchDate = date ? e.date === date : true;
      const matchCategory = category ? e.category === category : true;
      return matchSearch && matchDate && matchCategory;
    });

    if (filteredallEvents.length === 0) {
      list.innerHTML = "<p>No available events in this category</p>";
      return;
    }

    list.innerHTML = filteredallEvents
      .map(
        (e) => `
      <div class="col-md-4">
        <div class="card" style="width: 18rem;">
        <img src="..." class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${e.name}</h5>
            <p class="card-text">${e.description}</p>
            <p class="card-text"><small>Date: ${e.date}</small></p>
            <a href="event-details.html?id=${e.id}" class="btn">More Info...</a>
          </div>
        </div>
      </div>
    `
      )
      .join("");
  }

  function renderEventDetails() {
    const container = document.getElementById("event-details");
    if (!container) return;

    const urlParams = new URLSearchParams(window.location.search);
    const eventId = parseInt(urlParams.get("id"));

    const event = allEvents.find(e => e.id === eventId);

    if (!event) {
      container.innerHTML = "<p>Event not found.</p>";
      return;
    }

    container.innerHTML = `
      <h2>${event.name}</h2>
      <p><strong>Date:</strong> ${event.date}</p>
      <p><strong>Location:</strong> ${event.location}</p>
      <p><strong>Category:</strong> ${event.category}</p>
      <p>${event.description}</p>
      <a href="event.html" class="btn btn-secondary mt-3">Back to Events</a>
    `;
  }

  window.onload = () => {
    renderallEvents();
    renderEventDetails();
  };
