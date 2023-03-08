import React, { useEffect, useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from "../Utills/AxiosWithJWT.js"
import { toast } from 'react-hot-toast'
import { useBankingSystem } from "../Context/UserContext"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import NavbarDashboardAdmin from './NavbarDashboardAdmin'



const Accounts = () => {

    const navigateTo = useNavigate();

    const { BASE_URL, userDetails, setUser } = useBankingSystem();

    const [accountDetails, setAccountDetails] = useState();

    const [usersDetails, setUsersDetails] = useState();

    const setAccount = (details => {
        console.log("Main bhi Pagal  Hu: ", details);
        setAccountDetails(details);
    });


    const setUsers = (details => {
        console.log("Main Pagal Hu: ", details);
        setUsersDetails(details);
    });

    const en_dis_user = async (userId, userActive) => {
        try {

            const resp = await axios.put(`${BASE_URL}/api/v1/user/en_dis_user/${userId}`);
            toast.success("changed");
            getAllUsers();

        }
        catch (err) { }
    };

    const en_dis_acc = async (accountno, accActive) => {
        try {

            if (accActive) {
                const resp = await axios.put(`${BASE_URL}/account/accounts/suspend/${accountno}`);
                toast.success("Suspended");
            }
            else {
                const resp = await axios.put(`${BASE_URL}/account/accounts/activate/${accountno}`);
                toast.success("Activated");
            }
            getAllUsers();

        }
        catch (err) { }
    };


    const getAllUsers = async (e) => {

        try {
            //e.preventDefault();

            const resp = await axios.get(`${BASE_URL}/account/accounts`);

            console.log(resp);

            console.log("Data fetched Successfully");
            setUsers(...resp.data);
            // console.log(usersDetails);

            if (resp.status === 200) {

                toast.success("Here are the Accounts!");
            }

            if (resp.data == null) {
                toast.success("No Accounts found !");
            }

            if (resp.status !== 200 || resp.status === 401) {
                toast.error("Invalid Crenditals!")
            }

        } catch (error) {
            console.log(error);
            toast.error("Invalid Credentials fired!")
        }


    }
    console.log("im render");


    useEffect(() => {
        console.log("Welcome to useeffect!");

    }, [usersDetails, accountDetails]);

    return (
        <>
            <NavbarDashboardAdmin />
            <section className='min-h-[84vh] h-auto bg-blue-300 border pt-[2rem]'>
            <h1 className="ml-10 mt-0 mb-2 text-5xl font-medium leading-tight text-primary">Account Holders</h1>
                <div>
                    <button className="ml-10 w-[10rem] p-2 bg-[#f1f2f6] font-semibold rounded hover:bg-slate-600 hover:text-[#f1f2f6] bg-[#f1f2f6] duration-[0.5s]transition-all"
                        onClick={getAllUsers}>View Accounts</button>

                    <button
                        className="ml-2 w-[5rem] p-2 bg-[#f1f2f6] font-semibold rounded hover:bg-slate-600 hover:text-[#f1f2f6] bg-[#f1f2f6] duration-[0.5s]transition-all"
                        onClick={() => navigateTo("/admin/dashboard")}>Back </button>

                    {usersDetails ?
                    <div className='my-5 mx-10 bg-white rounded'>
                        <table className="ml-2 mt-5 mr-10 w-full text-sm text-left text-gray-500 dark:text-gray-400 text-center">
                            <thead className="text-xs p-8 m-8 text-gray-700 uppercase bg-gray-80 dark:bg-gray-700 dark:text-gray-400">
                                <tr className="mt-0 mb-2 p-8 mr-20 text-[1rem] font-medium leading-tight text-primary">
                                    <th>User Id</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Create Date</th>
                                    <th>View Accounts</th>
                                    <th>Enable/
                                        Disable</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usersDetails && usersDetails.map((user) =>
                                    <tr key={user.userId}>
                                        <td>{user.userId}</td>
                                        <td>{user.firstname} {user.lastname}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>{user.createdDate}</td>
                                        <td>
                                            <div>
                                                <Popup
                                                    trigger={<div><button onClick={() => console.log("Try poping up")
                                                        /*setAccountDetails(user.accounts);*/
                                                    }
                                                        className="button" >View </button></div>}
                                                    modal
                                                    nested>

                                                    {close => (
                                                        <div className="modal">
                                                            <button className="close" onClick={close}>
                                                                &times;
                                                            </button>
                                                            <div className="header"> {user.firstname} </div>
                                                            <div className="content">

                                                                {user.accounts.length ?
                                                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                                                        <thead className="text-xs text-gray-700 uppercase bg-gray-80 dark:bg-gray-700 dark:text-gray-400">
                                                                            <tr className="mt-0 mb-2 text-[1rem] font-medium leading-tight text-primary">
                                                                                <th>Account No</th>
                                                                                <th>Balance</th>
                                                                                <th>Active</th>
                                                                                <th>Time Created</th>
                                                                                <th>Account Type</th>
                                                                                <th>Activate/Suspend</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {user.accounts && user.accounts.map((account) =>
                                                                                <tr key={account.accountno}>
                                                                                    <td>{account.accountno}</td>
                                                                                    <td>{account.balance}</td>
                                                                                    <td>{account.isactive ? "Y" : "N"}</td>
                                                                                    <td>{account.dateCreated + " | " + account.timeCreated}</td>
                                                                                    <td>{account.accountType}</td>
                                                                                    <td><button className={account.isactive ?
                                                                                        "text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                                                                        :
                                                                                        "text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"}
                                                                                        onClick={() => en_dis_acc(account.accountno, account.isactive)}>{account.isactive ? "Suspend" : "Activate"}</button></td>
                                                                                </tr>
                                                                            )}
                                                                        </tbody>
                                                                    </table> : "no data"}
                                                            </div>
                                                            <div className="actions">
                                                                <Popup
                                                                    trigger={<button className="button"> </button>}
                                                                    position="top center"
                                                                    nested>
                                                                    <span>Second pop up</span>
                                                                </Popup>
                                                                <button
                                                                    className="button"
                                                                    onClick={() => {
                                                                        console.log('modal closed ');
                                                                        close();
                                                                    }}
                                                                >
                                                                    Close
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Popup>
                                            </div>

                                        </td>
                                        <td><button className={user.enabled ?
                                            "text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                            :
                                            "text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"}
                                            onClick={() => { en_dis_user(user.userId, user.enabled); }
                                            }>{user.enabled ? "Disable" : "Enable"}</button></td>

                                    </tr>
                                )}
                            </tbody>
                        </table> </div>
                        
                        : <div className='ml-10'><span>...</span></div>}
                        



                </div>
            </section>
        </>
    )
}

export default Accounts