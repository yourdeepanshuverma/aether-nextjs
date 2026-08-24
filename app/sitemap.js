const BASE_URL = "https://aetherrfid.com";

// Helper to build a full URL
const url = `${BASE_URL}${path}`;

export default function sitemap() {
  const lastModified = new Date();

  return [
    // ----- Home -----
    {
      url: url("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },

    // ----- Products: RFID -----
    {
      url: url("/products/rfid/tags"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: url("/products/rfid/hardware"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    // ----- Products: IoT -----
    {
      url: url("/products/iot/gps-gnss"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: url("/products/iot/data-loggers"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: url("/products/iot/lorawan-sensors"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    // ----- Products: Software Solutions -----
    {
      url: url("/products/software/retail-automation"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: url("/products/software/assets-tracking"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: url("/products/software/warehouse-management"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: url("/products/software/facility-management"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: url("/products/software/factory-automation"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    // ----- Technologies -----
    {
      url: url("/technologies/rfid"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: url("/technologies/iot"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: url("/technologies/barcodes"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },

    // ----- Industry -----
    {
      url: url("/industries/retail"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: url("/industries/manufacturing"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: url("/industries/logistics"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: url("/industries/ecommerce-quickcommerce"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: url("/industries/renewable-energy"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },

    // ----- About -----
    {
      url: url("/about/company-overview"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: url("/about/team"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: url("/about/career"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.5,
    },

    // ----- Blogs / Content -----
    {
      url: url("/blogs"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: url("/case-studies"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: url("/updates"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.6,
    },

    // ----- Contact -----
    {
      url: url("/contact-us"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];
}
