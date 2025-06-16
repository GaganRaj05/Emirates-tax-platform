import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPopper } from "@popperjs/core";
import TaxUpload from "components/Cards/TaxUpload";
import { useAuth } from "context/AuthContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
const IndexDropdown = () => {
  // dropdown props
  const [isTaxUploadOpen, setIsTaxUploadOpen] = useState(false);
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const {user} = useAuth();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  const navigate = useHistory();

  const handleClick = () => {
    if(!user) {
      navigate.push('/auth/login');
       toast.success('Login to use this feature')
    }
    else {
      navigate.push('/admin/dashboard',{role:'user',user_id:user.id});
    }
  }
  const handleUploadClick = () => {
    if(!user) {
      navigate.push('/auth/login');
       toast.success('Login to use this feature')
    }
    else {
      setIsTaxUploadOpen(true);
    }
  }
  return (
    <>
      <a
        className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        Check our Features
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <span
          className={
            "text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400"
          }
        >
          Features 
        </span>
        <p
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          style={{cursor:'pointer'}}
          onClick={()=>handleClick()}
        >
          Dashboard
        </p>
          <p           className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700" style={{cursor:'pointer'}} onClick={()=>handleUploadClick()}>          Upload Tax Docs
</p>
    
        
        <div className="h-0 mx-4 my-2 border border-solid border-blueGray-100" />
        <span
          className={
            "text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400"
          }
        >
          Auth 
        </span>
        <Link
          to="/auth/login"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
        >
          Login
        </Link>
        <Link
          to="/auth/register"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
        >
          Register
        </Link>
        
      </div>
      {isTaxUploadOpen && <TaxUpload onClose = {()=>setIsTaxUploadOpen(false)}/>}
    </>
  );
};

export default IndexDropdown;
