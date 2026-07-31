
### 1. Sequential Search

These algorithms check elements one by one. They do not require the data to be sorted.

* **Linear Search:** The simplest approach. It checks every single item in a list sequentially until the target is found.

### 2. Interval Search

These algorithms take advantage of sorted data structures by repeatedly targeting the center of the remaining search space, drastically reducing the time it takes to find an item.

* **Binary Search:** Divides the sorted array in half repeatedly, checking if the target is in the left or right half.
* **Jump Search:** Skips ahead by fixed steps (blocks) and then performs a linear search within the block where the target might reside.
* **Interpolation Search:** Similar to how humans search a dictionary; it estimates the position of the target based on its value relative to the highest and lowest values.
* **Exponential Search:** Finds a range where the element is present by doubling the index, then performs a binary search within that range.
* **Fibonacci Search:** Uses Fibonacci numbers to divide the array into unequal parts instead of halves.
* **Ternary Search:** A divide-and-conquer algorithm that divides the array into three parts rather than two.

### 3. Graph & Tree Search

These traverse nodes in a graph or tree without any knowledge of the "goal" other than how to generate the next nodes.

* **Breadth-First Search:** Explores all immediate neighbors of a node before moving to the next level (uses a Queue).
* **Depth-First Search (DFS):** Explores as far down a single branch as possible before backtracking (uses a Stack).
* **Uniform-Cost Search (Dijkstra's Algorithm):** Expands the node with the lowest path cost from the start node, guaranteeing the shortest path in weighted graphs.
* **Iterative Deepening Depth-First Search (IDDFS):** Combines the space-efficiency of DFS with the completeness of BFS by repeatedly running DFS with increasing depth limits.
* **Bidirectional Search:** Runs two simultaneous searches—one forward from the initial state and one backward from the goal—hoping they meet in the middle.

### 4. Graph & Tree Search

These use a "heuristic" (an educated guess or estimation function) to prioritize which nodes to explore, aiming to reach the goal faster.

* **A* (A-Star) Search:** Combines Uniform-Cost Search and Best-First Search by calculating both the exact cost to reach a node and the estimated cost to the goal.
* **Greedy Best-First Search:** Expands the node that is estimated to be closest to the goal, ignoring the cost taken to get there.
* **Beam Search:** An optimization of Best-First Search that only keeps a predetermined number of best nodes at each level to save memory.
* **Hill Climbing:** A local search algorithm that continuously moves in the direction of increasing value (or decreasing cost) to find the peak/solution.
* **Simulated Annealing:** A probabilistic technique that sometimes accepts worse solutions early on to avoid getting trapped in "local optima" (false peaks).
* **Minimax Search:** Used heavily in AI for two-player turn-based games (like Chess) to find the optimal move by minimizing the possible loss.

### 5. String Search Algorithms

These are specialized algorithms used to find occurrences of a specific substring (pattern) within a larger body of text.

* **Naive String Search:** Checks for the pattern at every single position in the text.
* **Knuth-Morris-Pratt:** Uses a precomputed table to avoid redundant comparisons when a mismatch occurs.
* **Boyer-Moore:** Compares the pattern from right to left and uses two heuristics (bad character and good suffix) to skip sections of the text safely.
* **Rabin-Karp:** Uses a rolling hash function to quickly filter out positions that cannot possibly match the pattern.
* **Aho-Corasick:** Constructs a finite state machine to search for multiple string patterns simultaneously in linear time.

### 6. Specialized & Advanced Search

* **Hash Table Search:** Uses a hash function to map keys to an array index, allowing for constant-time $O(1)$ lookups in average cases.
* **Grover's Algorithm:** A quantum algorithm that searches an unsorted database of $N$ items in $O(\sqrt{N})$ time, providing a quadratic speedup over classical linear search.
