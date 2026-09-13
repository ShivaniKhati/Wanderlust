const sampleListings = [
  {
    title: "Beachside Villa in Goa",
    description:
      "A beautiful villa near the beach, perfect for a relaxing Goa vacation with family and friends.",
    image: {
      filename: "goa-villa",
      url: "https://images.unsplash.com/photo-1587922546307-776227941871?auto=format&fit=crop&w=800&q=80"
    },
    price: 3500,
    location: "Goa",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [74.1240, 15.2993]
    }
  },

  {
    title: "Mountain Retreat in Manali",
    description:
      "A cozy mountain stay surrounded by beautiful hills, fresh air and peaceful nature.",
    image: {
      filename: "manali-retreat",
      url: "https://images.unsplash.com/photo-1517825738774-7de9363a0062?auto=format&fit=crop&w=800&q=80"
    },
    price: 2800,
    location: "Manali, Himachal Pradesh",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [77.1521, 31.8766]
    }
  },

  {
    title: "Royal Stay in Jaipur",
    description:
      "Experience the royal charm of Rajasthan with a comfortable stay near historic forts and palaces.",
    image: {
      filename: "jaipur-stay",
      url: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80"
    },
    price: 3200,
    location: "Jaipur, Rajasthan",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [75.7878, 26.9196]
    }
  },

  {
    title: "Backwater Houseboat in Kerala",
    description:
      "Enjoy a peaceful stay surrounded by the beautiful Kerala backwaters and tropical nature.",
    image: {
      filename: "kerala-houseboat",
      url: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80"
    },
    price: 4500,
    location: "Alappuzha, Kerala",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [76.3388, 9.4981]
    }
  },

  {
    title: "Luxury Cottage in Kashmir",
    description:
      "A peaceful cottage with stunning mountain views and a relaxing atmosphere in beautiful Kashmir.",
    image: {
      filename: "kashmir-cottage",
      url: "https://images.unsplash.com/photo-1566837497312-7be4f7c70f96?auto=format&fit=crop&w=800&q=80"
    },
    price: 4000,
    location: "Srinagar, Kashmir",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [74.7974, 34.0837]
    }
  },

  {
    title: "Lake View Home in Udaipur",
    description:
      "A beautiful stay with a relaxing atmosphere near the famous lakes and palaces of Udaipur.",
    image: {
      filename: "udaipur-home",
      url: "https://images.unsplash.com/photo-1599661046827-dacff0c6f1c4?auto=format&fit=crop&w=800&q=80"
    },
    price: 3000,
    location: "Udaipur, Rajasthan",
    country: "India",
    geometry: {
      type: "Point",
      coordinates: [73.6911, 24.5725]
    }
  }
];

module.exports = { data: sampleListings };