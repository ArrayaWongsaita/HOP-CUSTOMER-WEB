import { useContext } from "react";
import { SocketIoContext } from "../contexts/SocketIoContext";



export default function useSocket() {
  return (
    useContext(SocketIoContext)
  )
}
