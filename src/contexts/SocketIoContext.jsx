/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { getAccessToken } from "../utils/local-storage";
import customerApi from "../apis/customerApi";

const ENDPOINT = import.meta.env.VITE_API_URL;

export const SocketIoContext = createContext();

export default function SocketIoContextProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkRouteRider = async () => {
      try {
        const res = await customerApi.checkCustomerRoute()
        console.log(res);
        if (res.data.id) {
          navigate(`/route/${res.data.id}`);
          return 
        }
        console.log("oK____________")
      } catch (error) {
        console.log(error);
      }
    };
    checkRouteRider()
  }, []);

  useEffect(() => {
    const socketIo = socketIOClient(ENDPOINT,{
      auth: {
        token: getAccessToken()
      }
    });
    setSocket(socketIo);

  }, [navigate]);
  const setSocketIoClient = ()=>{
    const socketIo = socketIOClient(ENDPOINT,{
      auth: {
        token: getAccessToken()
      }
    });
    setSocket(socketIo);

  }

  const setNewOrder = (newRoute) => {
    const newOrder =  {
      id:newRoute?.id,
      userId: newRoute?.customerId,
      locationA: {
        lat: +newRoute?.pickupLat,
        lng: +newRoute?.pickupLng,
        description: newRoute.pickupPlace
        
      },
      locationB: {
        lat: +newRoute?.desLat,
        lng: +newRoute?.desLng,
        description:newRoute?.desPlace
      },
      riderGPS: {
              // lat: 13.7553531,
              // lng: 100.,
              lat: +newRoute?.riderLat +0.1 ,
              lng: +newRoute?.riderLng  +0.1,
            },
      distanceInKm: newRoute?.distance,
      durationInMinutes: newRoute?.estTime,
      fare: newRoute?.rideFare,
      status: newRoute?.status,
      riderId: newRoute?.riderId,
      

    }
    console.log(newOrder)
   setOrder( newOrder )
  }

  const values = {
    setNewOrder ,
    order,
    socket,
    setSocketIoClient
  };

  return (
    <SocketIoContext.Provider value={values}>
      {children}
    </SocketIoContext.Provider>
  );
}
