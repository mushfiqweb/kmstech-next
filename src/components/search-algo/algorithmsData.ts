export interface SearchAlgorithm {
    id: string;
    name: string;
    category: 'Array' | 'Graph' | 'Pathfinding' | 'String' | 'HashTable';
    group: string;
    groupDescription: string;
    timeBest: string;
    timeWorst: string;
    spaceComplexity: string;
    concept: string;
    useCaseTitle: string;
    useCaseDescription: string;
    initialData?: number[];
}

export const ALGORITHM_GROUPS = [
    {
        name: '1. Sequential Search',
        description: 'These algorithms check elements one by one. They do not require the underlying data to be sorted.',
    },
    {
        name: '2. Interval Search',
        description: 'These algorithms take advantage of sorted data structures by repeatedly targeting the center or estimated position of the remaining search space, drastically reducing search time.',
    },
    {
        name: '3. Graph & Tree Search',
        description: 'These traverse nodes in a graph or tree systematically without any heuristic knowledge of the goal other than knowing how to generate next valid state nodes.',
    },
    {
        name: '4. Graph & Tree Search',
        description: 'These use a heuristic function h(n) (an educated guess or estimation function) to prioritize which nodes to explore, aiming to reach the goal faster.',
    },
    {
        name: '5. String Search Algorithms',
        description: 'These are specialized algorithms used to find occurrences of a specific substring pattern within a larger body of text.',
    },
    {
        name: '6. Specialized & Advanced Search',
        description: 'Advanced data structures and specialized computing paradigms designed for high-performance key-value retrieval or quantum parallelism.',
    },
];

export const SEARCH_ALGORITHMS: SearchAlgorithm[] = [
    // 1. Sequential Search
    {
        id: 'linear-search',
        name: 'Linear Search',
        category: 'Array',
        group: '1. Sequential Search',
        groupDescription: 'Checks elements one by one without requiring pre-sorted data.',
        timeBest: 'O(1)',
        timeWorst: 'O(n)',
        spaceComplexity: 'O(1)',
        concept: 'Linear Search (Sequential Search) is the simplest search technique. It checks every single item in a list sequentially from index 0 to index n-1 until the target element is found or the end of the collection is reached. Because it makes no assumptions about data ordering or pre-indexing, it works on both unsorted arrays and linked lists, executing in O(n) worst-case time and O(1) space.',
        useCaseTitle: 'Unindexed Log & Event Stream Filtering',
        useCaseDescription: 'Used by server log diagnostics (such as grep and tail utilities) when scanning unindexed raw server log files line by line to discover rare critical error signatures (e.g., "CRITICAL_500_INTERNAL_ERROR"). When log records are generated dynamically in real-time streams, linear scanning remains the only reliable method to verify every entry without incurring index maintenance overhead.',
        initialData: [12, 45, 67, 23, 89, 34, 91, 55, 78, 10]
    },

    // 2. Interval Search
    {
        id: 'binary-search',
        name: 'Binary Search',
        category: 'Array',
        group: '2. Interval Search',
        groupDescription: 'Repeatedly divides the search space in half on sorted arrays.',
        timeBest: 'O(1)',
        timeWorst: 'O(log n)',
        spaceComplexity: 'O(1)',
        concept: 'Binary Search operates on pre-sorted arrays using a divide-and-conquer strategy. It maintains low and high pointers, computing the midpoint index mid = Math.floor((low + high) / 2). If the midpoint value matches the target, the search completes. If the target is smaller, high shifts to mid - 1; if larger, low shifts to mid + 1. By halving the search space in every iteration, Binary Search reduces 1,000,000 items to ~20 comparisons, achieving logarithmic O(log n) time complexity.',
        useCaseTitle: 'Git Bisect Regression & Bug Tracking',
        useCaseDescription: 'Git bisect uses binary search across a repository\'s commit history to locate which commit introduced a breaking bug. By checking out the midpoint commit between a known "good" commit and a "bad" commit, Git bisect eliminates half of the revision history per step. In codebase histories containing 50,000 commits, Git bisect pinpoints the exact breaking commit in only 16 test iterations.',
        initialData: [10, 23, 34, 45, 55, 67, 78, 89, 91, 99]
    },
    {
        id: 'jump-search',
        name: 'Jump Search',
        category: 'Array',
        group: '2. Interval Search',
        groupDescription: 'Skips ahead by fixed block sizes before linear scanning.',
        timeBest: 'O(1)',
        timeWorst: 'O(√n)',
        spaceComplexity: 'O(1)',
        concept: 'Jump Search optimizes searches on sorted arrays by skipping fixed-size blocks of m = √n elements. The algorithm checks elements at indices 0, m, 2m, 3m... until it encounters an element greater than or equal to the target. Once the target interval [km, (k+1)m] is bounded, it steps backward to perform a localized linear search within that block. Jump Search achieves optimal O(√n) time complexity, making it faster than Linear Search while avoiding the arbitrary random-access overhead of Binary Search.',
        useCaseTitle: 'Database Storage Block & SSD Page Indexing',
        useCaseDescription: 'High-performance relational databases (PostgreSQL, SQLite) utilize Jump Search logic when scanning contiguous sorted disk blocks on SSD storage. Because fetching contiguous disk blocks sequentially is faster than making random memory seeks across B-Tree nodes, jumping across block boundaries of size √n allows database engines to isolate target records while minimizing expensive disk read head movements.',
        initialData: [5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 115, 125, 135, 145, 155]
    },
    {
        id: 'interpolation-search',
        name: 'Interpolation Search',
        category: 'Array',
        group: '2. Interval Search',
        groupDescription: 'Estimates target position using value distribution ratios.',
        timeBest: 'O(1)',
        timeWorst: 'O(n)',
        spaceComplexity: 'O(1)',
        concept: 'Interpolation Search improves upon Binary Search for sorted arrays whose elements are uniformly distributed. Instead of picking the exact midpoint, it calculates a probe position using linear interpolation: pos = low + Math.floor(((target - arr[low]) * (high - low)) / (arr[high] - arr[low])). This mimics how humans open a physical dictionary near the letter "Z" rather than at the middle. For uniform data, Interpolation Search achieves an average-case time complexity of O(log(log n)), finding targets in 2-3 probes across millions of items.',
        useCaseTitle: 'Telecommunication Customer Lexicon & Timestamp Lookup',
        useCaseDescription: 'Used in billing databases and telecommunication log indexing where data entries (such as chronological call records or sequential account IDs) are evenly incremented. By estimating exact memory offset locations directly from numerical key values, database engines achieve instant O(log log n) record retrieval, bypassing unnecessary iterative split operations.',
        initialData: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
    },
    {
        id: 'exponential-search',
        name: 'Exponential Search',
        category: 'Array',
        group: '2. Interval Search',
        groupDescription: 'Doubles search bounds exponentially before running Binary Search.',
        timeBest: 'O(1)',
        timeWorst: 'O(log n)',
        spaceComplexity: 'O(1)',
        concept: 'Exponential Search is designed for sorted, unbounded, or infinite arrays where the total size n is unknown in advance. It starts with a bound size of 1 and doubles it exponentially (1, 2, 4, 8, 16...) as long as arr[bound] is less than the target value. Once a bound index exceeds the target, it establishes a finite search interval [bound/2, bound] and executes a standard Binary Search within those bounds, guaranteeing O(log i) time complexity where i is the target index.',
        useCaseTitle: 'Unbounded Real-Time Stream Telemetry & Infinite Logs',
        useCaseDescription: 'Widely used in high-frequency trading networks, IoT sensor networks, and real-time streaming architectures (like Apache Kafka) where data records stream continuously without a fixed upper array bound. Exponential search quickly pinpoints the exact boundary containing the requested event timestamp before running binary search within that localized window.',
        initialData: [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024]
    },
    {
        id: 'ternary-search',
        name: 'Ternary Search',
        category: 'Array',
        group: '2. Interval Search',
        groupDescription: 'Splits search space into three parts using dual midpoints.',
        timeBest: 'O(1)',
        timeWorst: 'O(log3 n)',
        spaceComplexity: 'O(1)',
        concept: 'Ternary Search is a divide-and-conquer algorithm that splits a sorted array or unimodal function into three equal segments using two midpoints: mid1 = low + (high - low) / 3 and mid2 = high - (high - low) / 3. It checks if the target equals arr[mid1] or arr[mid2]. Depending on comparisons, it discards 2/3 of the search space in each step. While its time complexity is O(log3 n), it is uniquely suited for continuous unimodal mathematical optimization.',
        useCaseTitle: 'Unimodal Optimization & Maximum Profit Calculation',
        useCaseDescription: 'Extensively applied in financial quantitative modeling and graphics rendering to find the peak (maximum) or valley (minimum) point of unimodal mathematical functions—such as calculating the exact price point that maximizes corporate revenue, or finding optimal focal distances in computer graphics camera shading.',
        initialData: [12, 24, 36, 48, 60, 72, 84, 96, 108, 120, 132, 144]
    },

    // 3. Graph & Tree Search (Uninformed/Blind)
    {
        id: 'breadth-first-search',
        name: 'Breadth-First Search (BFS)',
        category: 'Graph',
        group: '3. Graph & Tree Search',
        groupDescription: 'Level-by-level traversal using Queue (FIFO) for unweighted shortest paths.',
        timeBest: 'O(V + E)',
        timeWorst: 'O(V + E)',
        spaceComplexity: 'O(V)',
        concept: 'Breadth-First Search (BFS) is an uninformed graph traversal algorithm that explores nodes level by level in concentric ripples. Starting from a source node, it enqueues all adjacent unvisited neighbors into a First-In-First-Out (FIFO) Queue. It pops nodes one by one, visiting all distance-1 neighbors, then distance-2 neighbors, and so on. BFS guarantees finding the unweighted shortest path between any two vertices in O(V + E) time.',
        useCaseTitle: 'Social Network Degree of Separation & Peer Discovery',
        useCaseDescription: 'Powers social recommendation graphs on platforms like LinkedIn ("1st, 2nd, and 3rd-degree connections") and Facebook friend recommendations. BFS is also used in P2P network discovery protocols (BitTorrent) to locate nearby seeders within a specific hop radius.',
        initialData: []
    },
    {
        id: 'depth-first-search',
        name: 'Depth-First Search (DFS)',
        category: 'Graph',
        group: '3. Graph & Tree Search',
        groupDescription: 'Deep branch-by-branch traversal using Stack (LIFO) or recursion.',
        timeBest: 'O(V + E)',
        timeWorst: 'O(V + E)',
        spaceComplexity: 'O(V)',
        concept: 'Depth-First Search (DFS) explores a graph or tree by plunging as deep as possible along each branch before backtracking. Using a Last-In-First-Out (LIFO) Stack or call-stack recursion, DFS visits an unvisited neighbor, immediately moves to that neighbor\'s child, and continues down the branch until it hits a dead end, at which point it backtracks to explore remaining branches. DFS excels at cycle detection and topological sorting in O(V + E) time.',
        useCaseTitle: 'Package Dependency Graph & Circuit Deadlock Detection',
        useCaseDescription: 'Used by package managers (pnpm, npm, Cargo) for topological sorting of build dependencies and detecting circular dependency cycles (e.g., Package A depending on B, B depending on C, and C depending on A). It is also the core engine in compiler abstract syntax tree (AST) traversal.',
        initialData: []
    },
    {
        id: 'dijkstra-search',
        name: 'Dijkstra\'s Algorithm',
        category: 'Pathfinding',
        group: '3. Graph & Tree Search',
        groupDescription: 'Uniform-Cost Search for weighted graphs with non-negative costs.',
        timeBest: 'O((V+E) log V)',
        timeWorst: 'O((V+E) log V)',
        spaceComplexity: 'O(V)',
        concept: 'Dijkstra\'s Algorithm (Uniform-Cost Search) computes the exact shortest path from a single source vertex to all other vertices in a weighted graph with non-negative edge costs. It maintains a tentative distance table initialized to infinity and a Min-Priority Queue. At each step, Dijkstra extracts the unvisited vertex with the smallest accumulated distance, relaxes all outgoing edges to its neighbors, and marks the vertex as settled in O((V + E) log V) time.',
        useCaseTitle: 'GPS Navigation Routing & OSPF Network Packet Switching',
        useCaseDescription: 'Forms the core backbone of global GPS routing services (Google Maps, Waze, Apple Maps) to calculate the shortest driving routes across road networks considering segment distance, speed limits, and toll costs. It is also embedded inside internet routers running Open Shortest Path First (OSPF) protocol to route data packets across network topologies.',
        initialData: []
    },

    // 4. Graph & Tree Search 
    {
        id: 'astar-search',
        name: 'A* Search Algorithm',
        category: 'Pathfinding',
        group: '4. Graph & Tree Search',
        groupDescription: 'Heuristic-guided pathfinding evaluating total score f(n) = g(n) + h(n).',
        timeBest: 'O(E)',
        timeWorst: 'O(V)',
        spaceComplexity: 'O(V)',
        concept: 'A* (A-Star) is an informed heuristic pathfinding algorithm that combines the exact path cost of Dijkstra\'s algorithm with the goal-oriented guidance of Greedy Best-First Search. For every node n, A* evaluates a fitness function f(n) = g(n) + h(n), where g(n) is the exact cost incurred from the start node to n, and h(n) is an admissible heuristic function (such as Euclidean or Manhattan distance) estimating the remaining cost to the goal.',
        useCaseTitle: 'Video Game AI Pathfinding & Robotics Navigation',
        useCaseDescription: 'The industry-standard pathfinding engine in game development (Unity, Unreal Engine) for moving non-player character (NPC) units, RTS armies, and autonomous vehicles around dynamic terrain obstacles in real-time 2D/3D grid maps.',
        initialData: []
    },

    // 5. String Search Algorithms
    {
        id: 'naive-string-search',
        name: 'Naive String Search',
        category: 'String',
        group: '5. String Search Algorithms',
        groupDescription: 'Checks for pattern occurrences at every single text position.',
        timeBest: 'O(n)',
        timeWorst: 'O(m * (n - m + 1))',
        spaceComplexity: 'O(1)',
        concept: 'Naive String Search checks for pattern matches by placing the pattern at index 0 of the text and comparing characters one by one. If a mismatch occurs, it shifts the pattern right by 1 position and starts comparing from the pattern\'s first character again. While simple and requiring O(1) space, its worst-case time complexity is O(m * (n - m + 1)) when text contains repetitive characters.',
        useCaseTitle: 'Simple Text Editors & Document Search',
        useCaseDescription: 'Used in basic text editors and small string buffer searches where patterns and texts are short, eliminating the memory and preprocessing overhead required by complex lookup tables.',
        initialData: []
    },
    {
        id: 'kmp-string-search',
        name: 'Knuth-Morris-Pratt (KMP)',
        category: 'String',
        group: '5. String Search Algorithms',
        groupDescription: 'Uses precomputed Longest Prefix Suffix (LPS) table to skip redundant checks.',
        timeBest: 'O(n)',
        timeWorst: 'O(n + m)',
        spaceComplexity: 'O(m)',
        concept: 'The Knuth-Morris-Pratt (KMP) algorithm optimizes string matching by avoiding re-examination of previously matched characters. It precomputes a Longest Prefix Suffix (LPS) array of length m. When a character mismatch occurs, KMP uses the LPS table to determine how many pattern characters can be safely skipped without rewinding the text pointer, achieving linear O(n + m) time complexity.',
        useCaseTitle: 'DNA Genomic Sequence Alignment & Pattern Matching',
        useCaseDescription: 'Critical in bioinformatics engines scanning massive genomic DNA sequence strings (containing billions of A, C, G, T base pairs) for gene mutation markers without redundant backward text pointer rewinds.',
        initialData: []
    },

    // 6. Specialized & Advanced Search
    {
        id: 'hash-table-search',
        name: 'Hash Table Search',
        category: 'HashTable',
        group: '6. Specialized & Advanced Search',
        groupDescription: 'Uses a hash function for constant-time O(1) average key lookups.',
        timeBest: 'O(1)',
        timeWorst: 'O(n)',
        spaceComplexity: 'O(n)',
        concept: 'Hash Table Search maps arbitrary search keys to array bucket indices using a deterministic hash function hash(key) % capacity. Upon looking up a key, the hash function computes the exact memory address index instantly, delivering average-case constant-time O(1) lookups. When hash collisions occur (two keys producing the same index), collisions are resolved via Separate Chaining or Open Addressing.',
        useCaseTitle: 'In-Memory Cache (Redis) & Database Indexing',
        useCaseDescription: 'Powers ultra-fast in-memory caching systems (Redis, Memcached), V8 JavaScript engine object property access, and relational database primary key index lookups where sub-millisecond O(1) key access is mandatory.',
        initialData: []
    }
];
