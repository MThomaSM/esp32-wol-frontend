import {Await, defer, useLoaderData, useNavigate, useParams} from "react-router-dom";
import {computersByDevice, startlistLoad} from "../util/loaders";
import Authenticated from "../components/Authenticated";
import ComputersTable from "../components/Computers/StartlistComputersTable";
import {Suspense, useEffect} from "react";
import Loader from "../components/Loader";
import StartlistTable from "../components/Startlist/Table";

const Startlist = () => {
  const { startlist, computers } = useLoaderData();
    const navigate = useNavigate();
    const { deviceUuid } = useParams();
    useEffect(() => {
        const interval = setInterval(() => {
            navigate("");
        }, 5000); // Interval 5 sekúnd v milisekundách
        return () => clearInterval(interval); // Cleanup funkcia
    }, [deviceUuid, navigate]);


    return (
      <Authenticated>
          <Suspense fallback={(<Loader/>)}>
              <Await resolve={startlist}>
                  {startlist => <StartlistTable startlist={startlist}/> }
              </Await>
          </Suspense>
        <h5>Podrobný setup</h5>
          <Suspense fallback={(<Loader/>)}>
              <Await resolve={computers}>
                  {computers => <ComputersTable computers={computers}/> }
              </Await>
          </Suspense>
      </Authenticated>
  )
}

export default Startlist;

export const startlistLoader = ({params}) => {

  return defer({
        computers: computersByDevice(params.deviceUuid),
        startlist: startlistLoad(params.deviceUuid)
    }
  )
}