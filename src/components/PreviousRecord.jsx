import "./login.css";
import { useState } from "react";
import { useForm, Controller, useFieldArray, useWatch } from "react-hook-form";
import axios from "axios";
import userIcon from "../assets/icons/user.svg";

const  PreviousRecord=()=> {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()

  
    const onSubmit = (formData)=>{

        console.log(formData)
        /*

axios.post("http://localhost:3001/api/register",{name:"",value:""}).then((res)=>
console.log("response from the server")

).catch((e)=>console.log("error occured"))

*/


  
  };


  return (
    <div className="login-main-div">
    
      <div className="form-div div-props">

        <a href="/">GO HOMEPAGE</a>
        <div className="s-tit">
          <p>CHECK PREVIOUS RECORD FROM OTHER HOSPITALS</p>
        </div>
       
        <form className="login-form" >
          <div className="i-f">
            <div className="login-input-div">
              <div className={`login-elements-div `}>
                <img src={userIcon} />
                <input
                  type="text"
                  {...register("ghanacard", { required: "This is required" })}
                  placeholder="GHANA CARD ID"
                />

{errors.ghanacard && <small style={{color:"red"}}>This is required</small> }
              </div>
            </div>
          
          </div>

          <div className="button-div">
            <button type="button" onClick={handleSubmit(onSubmit)}>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PreviousRecord;
