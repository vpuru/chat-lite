import io from "socket.io-client";

const socket = io("ws://localhost:5000/", { transports: ["websocket"] });

export { socket };
