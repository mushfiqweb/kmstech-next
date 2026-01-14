---
title: "How the Internet Works: A Journey from Click to Screen"
description: "A deep dive into the infrastructure that powers the web, from DNS resolution to rendering."
date: "2024-05-20"
topics: ["Networking", "Web Architecture"]
visualization: "how-internet-works"
---

The internet is a decentralized "network of networks"—a vast web of disparate computer systems connected via standardized protocols to facilitate the instantaneous exchange of digital information. When you type a URL into a browser and hit enter, a multi-layered process occurs in milliseconds to deliver content from a server halfway across the world to your screen.

### Phase 1: DNS Resolution (The Global Phonebook)

Computers communicate using numerical IP addresses (e.g., 142.250.182.206), but humans rely on memorable domain names like google.com. The Domain Name System (DNS) acts as the internet’s phonebook, translating those names into machine-readable addresses.

**Local Cache Check**: Your browser and operating system first scan their internal memory to see if the IP address for that domain was recently saved.

**The Recursive Resolver**: If not found locally, a query is sent to a recursive DNS resolver (usually provided by your ISP). Think of this as a "librarian" tasked with finding a specific book in a massive library system.

**The Hierarchy (Root & TLD)**: If the resolver doesn't have the answer, it queries a Root Nameserver, which directs it to a Top-Level Domain (TLD) server based on the extension (e.g., .com or .org).

**The Authoritative Source**: The TLD server points the resolver to the Authoritative Nameserver for that specific domain. This server holds the final IP address—either an A record (IPv4) or an AAAA record (IPv6).

**Result**: The resolver returns the IP address to your browser, which caches it for future speed.

### Phase 2: The Handshake (Establishing Trust)

Once your browser has the IP address, it must establish a reliable connection to the web server via the Transport Layer.

**TCP 3-Way Handshake**: Most web traffic uses the Transmission Control Protocol (TCP) to ensure data arrives in order and without errors. This follows three steps:

1.  **SYN (Synchronize)**: The client asks to open a connection.
2.  **SYN-ACK (Synchronize-Acknowledge)**: The server agrees and sends its own signal.
3.  **ACK (Acknowledge)**: The client confirms, and the session is live.

**Security (TLS Handshake)**: For HTTPS sites, a TLS (Transport Layer Security) handshake follows. The browser and server exchange certificates to verify identities and generate session keys for encrypted, private communication.

**Modern Speed (QUIC/HTTP/3)**: Many modern sites use QUIC (built on UDP). This merges the transport and security handshakes into a single step, drastically reducing the "latency" or delay before data starts moving.

### Phase 3: Requesting and Routing Content

With a secure pipe established, the browser sends an HTTP GET request asking for the website's data.

**Packetization**: The server doesn't send the webpage as one giant file. Instead, it breaks the data into thousands of tiny packets. Each packet has a header containing the source and destination addresses.

**Routing & BGP**: Data doesn't follow a fixed path. Routers act as "traffic cops" at network intersections. On a global scale, the Border Gateway Protocol (BGP) manages how these packets hop between different Autonomous Systems (ASes), choosing the most efficient path based on network health and distance.

**The Physical Backbone**: These packets travel at nearly the speed of light through fiber-optic cables. Over 95% of transoceanic data flows through submarine communications cables on the ocean floor—the literal nervous system of the global economy.

### Phase 4: Assembly and Rendering

The server sends an HTTP response containing a status code (like 200 OK) and the raw code for the site.

**TCP Reassembly**: Because packets often take different routes, they may arrive out of order. The TCP protocol uses sequence numbers to put them back together perfectly.

**The Rendering Engine**: The browser reads the HTML (structure), CSS (styling), and JavaScript (interactivity) to paint the visual website you see.

**Optimization**: To speed up future visits, the browser caches static elements like logos and images. It may also store a cookie, allowing the server to remember your login state or preferences.

### Summary: The Road Network Analogy

Think of the internet as a global highway system:

-   **IP Addresses** are the GPS coordinates.
-   **DNS** is the mapping service that turns "Home" into coordinates.
-   **Routers** are the traffic signals and interchanges.
-   **TCP/IP** are the rules of the road that ensure your "car" (data) arrives in one piece.
-   **The Web** is just one type of "delivery service" (like a mail carrier) that uses these roads to move information.

To get more information about the internet, you can visit the followins the gather info:
[https://roadmap.sh/guides/what-is-internet](https://roadmap.sh/guides/what-is-internet)
[https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/How_does_the_Internet_work](https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/How_does_the_Internet_work)
[https://cs.fyi/guide/how-does-internet-work](https://cs.fyi/guide/how-does-internet-work)
