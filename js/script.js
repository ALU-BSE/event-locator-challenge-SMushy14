const allEvents = [
  {
    id: 1,
    name: "Hope Orphanage Visit",
    date: "2025-07-12",
    location: "Zindiro",
    category: "Charity Events",
    description:
      "Bring happiness to Hope Orphanage children by spending time and sharing love with the amazing kids. Activities will include games, art, singing, bible studying, and lunch together.",
  },
  {
    id: 1,
    name: "Afro Music Fusion",
    date: "2025-07-14",
    location: "Kinyinya",
    category: "Music Festivals",
    description:
      "Come Enjoy wonderful afro music from creative DJ's in Rwanda. Several DJ's will be there including DJ Ace. Entry fee is 5k RWF. Place is Lemon Bar Kigali",
  },
  {
    id: 1,
    name: "CAF semifinals(Rwanda and Nigeria)",
    date: "2025-07-15",
    location: "Amahoro Stadium",
    category: "Sports Events",
    description:
      "Come and cheer for your favorite team this Tuesday, in a match between Rwanda and Nigeria at Amahoro Stadium in Remera. Enrty fee is 2k RWF and you can book online via amahorostadium.co.kgl",
  },
  {
    id: 1,
    name: "Future of Africa centre visit",
    date: "2025-07-12",
    location: "Kackiru",
    category: "Charity Events",
    description:
      "Future of Africa is a centre that help street youths in Kigali and create a new brighter future for them. Come with us this Saturday to meet these youths and bring a smile and hope on their faces.",
  },
  {
    id: 1,
    name: "RNB and Soul Music Festival",
    date: "2025-07-16",
    location: "Remera",
    category: "Music Festivals",
    description:
      "Are you a lover of RNB or Souls music? Then this is your chance to vibe with other people. Come this Saturday and enjoy good RNB and Souls music from the best DJ. There is no entry fee but no idle sitting. See you there",
  },
  {
    id: 1,
    name: "NBL Finals! (Rwanda VS Kenya)",
    date: "2025-07-17",
    location: "BK Arena",
    category: "Sports Events",
    description:
      "The day we've been all waiting for is finally here. Come at BK Arena this thursday to cheer for you favorite final team. Tickets available online at bkarena.co.kgl",
  },
  {
    id: 1,
    name: "AI Immersion",
    date: "2025-07-16",
    location: "African Leadership University, Bumongo",
    category: "Tech Events",
    description:
      "Ever thought of AI taking over the world? Well, come this wednesday to Africa Leadership University to meet experts in Artificial Intelligence and dive deeper into the world of AI.",
  },
  {
    id: 1,
    name: "Startup to Business",
    date: "2025-07-12",
    location: "Gisenyi",
    category: "Business Events",
    description:
      "Entrepreneurship is having guts to put things at risk but with a strong faith of success. Come this Monday to meet different business experts and learn how to turn your startup to a profitable business",
  },
  {
    id: 1,
    name: "Movie Night",
    date: "2025-07-14",
    location: "Nyabugogo",
    category: "Movie Events",
    description:
      "Having Monday fever? Well who said you cant cool things off on a Monday? Join us this Monday for a short movie night at Nyabugogo to cool things off. Entry fee in just 1K RWF. Drinks available for free.",
  },
  {
    id: 1,
    name: "Programming 1o1",
    date: "2025-07-17",
    location: "Remera",
    category: "Tech Events",
    description: "Are you a beginner in tech but still want to pursue your career in tech? You're at the right path. Come to learn more about programming and ways to make your career path come true.",
  },
];

function getQueryParams() {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    search: urlParams.get("search")?.toLowerCase() || "",
    date: urlParams.get("date"),
    category: urlParams.get("category"),
  };
}

function renderallEvents() {
  const list = document.getElementById("event-list");
  if (!list) return;

  const { search, date, category } = getQueryParams();

  let filteredallEvents = allEvents.filter((e) => {
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
        <div class="col-12 col-sm-6 col-lg-3 mb-4">
          <div class="card h-100">
            <img src="..." class="card-img-top" alt="Event image">
            <div class="card-body">
              <h5 class="card-title">${e.name}</h5>
              <p id="short-desc-${e.id}" class="card-text">
                ${e.description.slice(0, 45)}...
              </p>
              <p id="full-desc-${e.id}" class="card-text d-none">
                ${e.description}
              </p>
              <p class="card-text"><small><strong>Date: </strong>${e.date}</small></p>
              <a href="event-details.html?id=${
                e.id
              }" class="btn btn-outline-secondary btn-sm ms-2">
                More Info...
              </a>
            </div>
          </div>
        </div>
      `
    )
    .join("");
}

function toggleDescription(id) {
  const shortDesc = document.getElementById(`short-desc-${id}`);
  const fullDesc = document.getElementById(`full-desc-${id}`);
  const toggleBtn = event.target;

  const isHidden = fullDesc.classList.contains("d-none");

  shortDesc.classList.toggle("d-none", isHidden);
  fullDesc.classList.toggle("d-none", !isHidden);

  toggleBtn.textContent = isHidden ? "View Less Details" : "View More Details";
}

function renderEventDetails() {
  const container = document.getElementById("event-details");
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const eventId = parseInt(urlParams.get("id"));

  const event = allEvents.find((e) => e.id === eventId);

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
      <a href="events.html" class="btn btn-secondary mt-3">Back to Events</a>
    `;
}

window.onload = () => {
  renderallEvents();
  renderEventDetails();
};
