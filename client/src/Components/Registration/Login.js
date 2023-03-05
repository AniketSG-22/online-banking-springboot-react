import React, {useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from "axios"
import { toast } from 'react-hot-toast'
import  {useBankingSystem} from "../Context/UserContext"

const Login = () => {

  const navigateTo = useNavigate();
      const [email,setEmail] = useState("");
      const [password, setPassword] =useState("");

      // extracting and using context API hereusing destructuring
      const {BASE_URL, setUser: setUserDetails, userDetails} = useBankingSystem();
    
  
     
        const submitLogin = async (e) =>{
            
          try {
            e.preventDefault();
            const data = {
              email,
              password
            };
             const resp = await axios.post(`${BASE_URL}/api/v1/login`, data);

            console.log(resp);


              //Setting the ContextAPI state so that it can be used anywhere in the component tree
            setUserDetails(resp.data.user)

            //testing the set ContextAPI state here
            console.log("login successfull for user: ",userDetails);

            // save token in session storage
           sessionStorage.setItem("jwtToken", resp.data.jwtToken);
           if (resp.status === 200) {
            navigateTo("/dashboard");
            console.log(resp.data.jwtToken);
            toast.success("Login Successfull!");
           } 
           
           
           if(resp.status !== 200 || resp.status === 401){
            toast.error("Invalid Crenditals!")
           }

          } catch (error) {
            console.log(error);
            toast.error("Invalid Credentials!")
          }
             
            
        }


  return (
    <>
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="text-center font-bold text-2xl">Log in</div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={submitLogin} className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <NavLink to={"/signup"} className="font-medium text-indigo-600 hover:text-indigo-500">
                Don't have Account, Sign Up
                </NavLink >
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </>
  )
}

export default Login