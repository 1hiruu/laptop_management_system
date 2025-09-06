export const users = [
    { username: "admin", password: "password123", email: "admin@example.com" }
  ];
  
  export const assets = [
    {
      id: 1,
      name: "Nico Andersan",
      email: "abc@example.com",
      deviceId: "PLT-00123",
      status: "assigned",
      ownership: "leased",
      location: "Coimbatore",
      createdDate: "23/08/2025"
    },
    {
      id: 2,
      name: "Nico Andersan",
      email: "abc@example.com",
      deviceId: "PLT-001",
      status: "assigned",
      ownership: "owned",
      location: "Rest Of India",
      createdDate: "22/08/2025"
    }
    // Add more assets as needed
  ];
  
  export const dashboardData = {
    totalAssets: 4,
    activeAssets: 2,
    unassigned: 1,
    defects: 1,
    assetDistribution: {
      assigned: 2,
      unassigned: 1,
      defect: 1
    },
    ownershipDistribution: {
      owned: 2,
      leased: 2
    },
    licenseDistribution: {
      basic: 1,
      standard: 0,
      emsE3: 0,
      pinochie: 1,
      reziyens: 0,
      kyureeus: 0
    }
  };