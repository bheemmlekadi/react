import React,{lazy,Suspense,useEffect,useState} from "react";
import { ReactDOM } from "react";
import {Provider} from 'react-redux';
import { RouterProvider,createBrowserRouter,Outlet } from "react-router-dom/dist";
import Header from './components/Header';
import About from './components/About';
import Body from './components/Body';
import Cart from './components/Cart';
import Error from './components/Error';
import Contact from './components/Contact';
import RestaurantMenu from './components/RestaurantMenu'
import appStore from '../utils/appStore';





const Grocery = lazy(()=>import("./components/Grocery"));
const About = lazy(() => import("./components/About"));

const AppLayout = () =>{
    const [userName,setUsername] = useState();

    //Authentication
    useEffect(() =>{
        //Make an API call and send username and password
        const data  ={
            name:"Akshay Saini",
        };
        setUsername(data.name);
     },[])

return (
    <Provider store={appStore}>
        <UserCOntext.Provider value ={{loggedInUser:userName,setUsername}}>
            <div className="app">
                <Header/>
                <Outlet/>
            </div>

        </UserCOntext.Provider>
    </Provider>
);

};

const appRouter = createBrowserRouter([
    {
        path:"/",
        element:<AppLayout/>,
        children:[
            {
                path:"/",
                element:<Body/>,

            },
            {
                path:"/about",
                element:(   
                    <Suspense fallback={<h1>Loading.....</h1>}>
                        <About/>
                    </Suspense>
                ),
            },
            {
                path:"/contact",
                element:<Contact/>,
            },
            {
                path:"/grocery",
                element:(
                    <Suspense fallback={<h1>Loading....</h1>}>
                        <Grocery/>
                    </Suspense>
                ),
            },
            {
                path:"/restaurant/:resId",
                element:<RestaurantMenu/>,
            },
            {
                path:"/cart",
                element:<Cart/>,
            },
        ],
        errorElement:<Error/>,
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter}/>);