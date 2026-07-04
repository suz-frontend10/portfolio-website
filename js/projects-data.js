const projectsData = {
  "learning-management": {
    title: "Learning Management & Academic Automation System",
    subtitle: "A career-aligned student hub featuring an AI mock interviewer, webcam proctoring, and LaTeX resume compiler.",
    category: "Full Stack & AI Integration",
    timeline: "Aug 2025 - Dec 2025",
    role: "Full Stack Developer",
    tech: ["React", "Spring Boot", "PostgreSQL", "Drizzle ORM", "TanStack Query", "OpenAI APIs"],
    image: "assets/images/project_taskflow.png", // Reusing the SaaS dashboard mockup
    github: "https://github.com/suz-frontend10/learning-management-system",
    demo: "https://lms-demo.susanna.dev",
    summary: "Designed and deployed a full-stack career-aligned Learning Management System that matches students with voice-interactive AI recruiters for mock interviews, enforces secure webcam proctoring, and automates LaTeX resume compilation via a Spring Boot microservice.",
    
    problem: "Traditional academic management tools focus purely on document sharing and grading, leaving students unprepared for actual technical recruitment cycles. Students struggle to build resumes that pass ATS checks and lack real-time feedback on their technical coding interview capabilities.",
    
    solution: "Developed a modern academic hub that embeds an AI Technical Recruiter. The recruiter interviews candidates via text-to-speech, analyzes audio-video feeds for secure mock sessions, and uses a Spring Boot microservice to compile standard LaTeX templates into PDF resumes. The system caches API endpoints via TanStack Query for optimal performance.",
    
    architecture: {
      description: "Decoupled web architecture optimizing rendering speeds and server CPU usage during heavy concurrent AI proctoring sessions.",
      components: [
        { name: "React Frontend", role: "SPA using TanStack Query for caching API endpoints, custom video canvas hooks for proctoring feeds, and speech-to-text recorders." },
        { name: "Java Spring Boot Microservice", role: "Handles heavy computations, LaTeX file building, and integrates with OpenAI API chains for generating structured recruiter feedback." },
        { name: "PostgreSQL Database", role: "Stores student data, interview history, scores, and resume models, queried efficiently via Drizzle ORM." }
      ]
    },
    
    algorithms: {
      name: "Proctoring Frame Check & Caching",
      description: "To prevent browser main thread lag during speech-to-text recording, the video proctoring frame analysis runs inside a background Web Worker. Endpoint responses are cached dynamically using TanStack Query, reducing DB query loads.",
      code: `// Caching Recruiter Feedback with TanStack Query
const useRecruiterFeedback = (interviewId) => {
  return useQuery({
    queryKey: ['feedback', interviewId],
    queryFn: async () => {
      const { data } = await axios.get(\`/api/interviews/\${interviewId}/feedback\`);
      return data;
    },
    staleTime: 1000 * 60 * 10, // Cache feedback for 10 minutes
    refetchOnWindowFocus: false
  });
}`
    },
    
    challenges: [
      {
        title: "Video Proctoring Frame Analysis CPU Block",
        description: "Capturing and analyzing webcam frame structures in the browser regularly caused the main thread to freeze, introducing stutter to the recording UI.",
        solution: "Moved the image processing loop off the main thread. Video frame pixel arrays are enqueued and transferred directly to a background Web Worker using OffscreenCanvas, keeping the React UI responsive at a locked 60 FPS."
      },
      {
        title: "LaTeX PDF Compilation Speed",
        description: "Compiling LaTeX documents dynamically inside a Java process is CPU-intensive and slow, leading to compilation response delays of over 5 seconds.",
        solution: "Built a lightweight decoupled LaTeX microservice wrapped in Docker. The service uses pre-compiled template packages and caches intermediate auxiliary logs, reducing compilation time to under 1.2 seconds."
      }
    ],
    
    results: [
      "Successfully supported voice-interactive mock interviews with low voice-to-text latency.",
      "Reduced LaTeX PDF compilation overhead by 75% using service caching.",
      "Optimized query speeds using PostgreSQL indices and Drizzle relational queries."
    ],
    
    future: [
      "Integrating facial emotion recognition to evaluate candidate confidence.",
      "Automatic resume-to-job description matching score (ATS grader)."
    ],
    
    lessons: "This project taught me how to manage asynchronous API pipelines, leverage Web Workers for high-computation UI tasks, and optimize database read times using modern ORM query structures."
  },
  
  "indoor-navigation": {
    title: "Landmark-Based Indoor Navigation System",
    subtitle: "A high-precision indoor navigation platform using QR codes, landmarks, and graph-routing algorithms.",
    category: "Full Stack & Algorithms",
    timeline: "Jan 2026 - May 2026",
    role: "Lead Developer (Algorithm Design & Full Stack)",
    tech: ["React Native", "Node.js", "Express", "MongoDB", "Dijkstra's Algorithm", "Canvas API"],
    image: "assets/images/project_indoor_nav.png",
    github: "https://github.com/suz-frontend10/indoor-navigation-system",
    demo: "https://indoor-nav-demo.susanna.dev",
    summary: "Built a responsive mobile-friendly web application to solve the indoor GPS-blind spot problem, utilizing QR code landmark calibration and custom graph-routing logic to provide step-by-step routing in large institutional complexes.",
    
    problem: "GPS signals decay significantly inside concrete and steel structures, leaving users without navigation inside complex buildings like university campuses, hospitals, and convention centers. Traditional solutions like Bluetooth Low Energy (BLE) beacons are expensive to deploy, calibrate, and maintain. Visitors frequently get lost, leading to missed appointments and inefficiency.",
    
    solution: "Developed a low-cost, high-reliability web app that uses static QR codes printed as 'landmarks' at key intersections. When scanned, the app registers the user's precise location and orientation, loads a local node graph of the building floor plan, and calculates the shortest path to their destination. The UI displays an interactive vector floor plan with a dynamic path line and step-by-step navigation cues.",
    
    architecture: {
      description: "The system utilizes a lightweight decoupled architecture to ensure fast load times and fluid canvas rendering on low-end mobile devices.",
      components: [
        { name: "Frontend Client", role: "React Native wrapper rendering a specialized HTML5 Canvas component for drawing floor plans, paths, and user indicators with high framerate." },
        { name: "REST API Server", role: "Express.js backend providing endpoints for building maps, searching rooms, and downloading light graph representations of floor plans." },
        { name: "Graph Engine", role: "Custom JavaScript micro-service running on the client to perform real-time path calculation, avoiding roundtrip latency to the server during active navigation." },
        { name: "Database", role: "MongoDB storing node coordinates, edges (hallways), landmarks (QR code links), and metadata for points of interest (offices, labs, emergency exits)." }
      ]
    },
    
    algorithms: {
      name: "Dijkstra's Algorithm & Coordinate Scaling",
      description: "The core routing uses a modified Dijkstra's algorithm implemented in pure JavaScript for zero-latency path adjustments on the client. To ensure paths align perfectly with variable image sizes, a coordinate scaling matrix maps abstract graph nodes to the HTML5 Canvas viewport dimensions.",
      code: `// Dynamic Pathfinding Engine (Dijkstra)
function findShortestPath(graph, startNode, endNode) {
  let distances = {};
  let prev = {};
  let pq = new PriorityQueue();

  distances[startNode] = 0;
  pq.enqueue(startNode, 0);

  graph.nodes.forEach(node => {
    if (node.id !== startNode) distances[node.id] = Infinity;
    prev[node.id] = null;
  });

  while (!pq.isEmpty()) {
    let { element: currNode } = pq.dequeue();

    if (currNode === endNode) break; // Reached target

    let neighbors = graph.getNeighbors(currNode);
    for (let neighbor of neighbors) {
      let alt = distances[currNode] + neighbor.weight;
      if (alt < distances[neighbor.id]) {
        distances[neighbor.id] = alt;
        prev[neighbor.id] = currNode;
        pq.enqueue(neighbor.id, alt);
      }
    }
  }
  return reconstructPath(prev, endNode);
}`
    },
    
    challenges: [
      {
        title: "HTML5 Canvas Coordinate Scaling Across Devices",
        description: "Different smartphones have varying screen aspect ratios and resolutions. Simply overlaying coordinates caused paths to align poorly on smaller screens.",
        solution: "Implemented a normalized coordinate system. Maps are saved in a grid of 1000x1000 arbitrary units. Upon load, the client calculates scale factors: X_scale = canvas_width / 1000 and Y_scale = canvas_height / 1000. All draw operations are dynamically multiplied by these scales, ensuring perfect alignment on all devices."
      },
      {
        title: "Dynamic Rerouting Without Network Delay",
        description: "If a user takes a wrong turn and scans a different QR code landmark, sending a request back to the server for rerouting created a lag that ruined the user experience.",
        solution: "Moved the graph traversal engine to the client side. The client downloads the complete floor plan graph (only ~15KB of JSON) upon first entry. When a new landmark is scanned, the path is recalculated locally in less than 5 milliseconds, yielding an instantaneous UI update."
      }
    ],
    
    results: [
      "Deployed a pilot version across the engineering department building (3 floors, 45 rooms).",
      "Achieved average path computation time of under 3ms on client devices.",
      "Reduced navigation queries to the front desk by an estimated 65% during department orientation events.",
      "Zero hardware maintenance costs compared to BLE beacon alternatives."
    ],
    
    future: [
      "Integration of WebXR for basic augmented-reality arrow overlays using the smartphone camera.",
      "Adding multi-floor elevator/stairway transition logic with vertical weight penalties.",
      "Automated QR code generator script for administrators mapping new buildings."
    ],
    
    lessons: "This project taught me how to bridge abstract mathematical theories (Graph Theory, Dijkstra) with practical front-end rendering engines. I learned the importance of client-side computing for fast, network-independent mobile experiences and gained deep experience managing spatial data structures in MongoDB."
  },
  
  "expense-tracker": {
    title: "Expense - Tracker",
    subtitle: "A Java Swing GUI desktop application for offline budgeting, expense tracking, and statistical aggregation.",
    category: "Desktop Application",
    timeline: "Jan 2026 - Feb 2026",
    role: "Java Developer",
    tech: ["Java", "Swing GUI", "File IO", "Serialization", "Object-Oriented Design"],
    image: "assets/images/project_smart_reviewer.png", // Reusing reviewer mockup
    github: "https://github.com/suz-frontend10/expense-tracker",
    demo: "https://github.com/suz-frontend10/expense-tracker", // Direct repo details
    summary: "Developed a Java Swing GUI application designed to add, delete, and track daily budgeting logs and transactions offline with automatic total calculations.",
    
    problem: "Modern expense logging apps require continuous internet access and expose personal financial details to cloud databases. Users need a simple, offline-first desktop solution that is extremely fast, private, and simple to use.",
    
    solution: "Created a desktop application built in Java. It features a graphical Swing panel with FlatLaf styling, allowing users to input transactions, filter entries by categories, and run automatic sum totals in real-time, backed by local file serialization.",
    
    architecture: {
      description: "Model-View-Controller (MVC) modular architecture separating user data storage from GUI rendering elements.",
      components: [
        { name: "View Layout (Swing)", role: "Responsible for drawing transaction logs, lists, input panels, and updating sum fields dynamically." },
        { name: "Controller Manager", role: "Handles action events, validates fields, and directs operations between data and interface modules." },
        { name: "Model Store", role: "Transaction objects containing serialization markers to store and load data directly to local disk storage." }
      ]
    },
    
    algorithms: {
      name: "Local Serialization & Search Filters",
      description: "Implements Java Object Serialization streams to write arrays of transaction objects directly to a binary file, resolving data structure queries in sub-milliseconds locally.",
      code: `// Loading Transactions from Local Disk
public List<Transaction> loadTransactions(String filename) {
    try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(filename))) {
        return (List<Transaction>) ois.readObject();
    } catch (FileNotFoundException e) {
        return new ArrayList<>(); // Return empty list if first run
    } catch (IOException | ClassNotFoundException e) {
        e.printStackTrace();
        return new ArrayList<>();
    }
}`
    },
    
    challenges: [
      {
        title: "Swing Layout Stiffness on High-DPI Screens",
        description: "The default Java Swing look-and-feel renders poorly on modern high-resolution laptop screens, resulting in tiny text and clipped buttons.",
        solution: "Integrated FlatLaf (Flat Light Look and Feel), a modern theme manager for Java. Used GridBagLayout with flexible weight configurations to make the window adapt fluidly to desktop resizing."
      },
      {
        title: "Object Serialization Class Compatibility",
        description: "Adding new attributes (like 'category tag') to the Transaction class broke compatibility with older saved binary files, throwing InvalidClassExceptions.",
        solution: "Declared a static final serialVersionUID in the Transaction class. Implemented custom readObject methods to handle missing properties gracefully by assigning default values."
      }
    ],
    
    results: [
      "Successfully built a lightweight, responsive desktop tool with instant loading speeds.",
      "Achieved zero database connection dependencies, ensuring absolute privacy.",
      "Included dynamic category filtering and instant total calculation loops."
    ],
    
    future: [
      "Adding database compatibility via SQLite.",
      "CSV/Excel report export functionality."
    ],
    
    lessons: "Solidified my grasp of Swing components, Model-View-Controller styling, and input stream handling in Java. I learned the critical role of serialization version controls when building desktop products."
  }
};

// Export if running in node test environment, otherwise declare as global window variable
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { projectsData };
} else {
  window.projectsData = projectsData;
}
