import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createBusiness, createBranch, getBusinesses, getBranches } from "../api/businessApi";
import { useAuth } from "./AuthContext";
const BusinessContext = createContext(null);
const idOf = (item) => item?.id || item?._id;
export function BusinessProvider({ children }) {
  const { user } = useAuth();
  const [businesses,setBusinesses]=useState([]), [branches,setBranches]=useState([]);
  const [business,setBusiness]=useState(null), [branch,setBranch]=useState(null);
  const [loadingBusinesses,setLoadingBusinesses]=useState(false), [loadingBranches,setLoadingBranches]=useState(false);
  const [error,setError]=useState(""), [branchError,setBranchError]=useState("");
  async function refreshBusinesses() {
    setLoadingBusinesses(true); setError("");
    try { const list=await getBusinesses(); setBusinesses(list); setBusiness(current=>list.find(x=>idOf(x)===idOf(current))||list[0]||null); return list; }
    catch(e) { setError(e.response?.data?.message||e.message); setBusinesses([]); setBusiness(null); throw e; }
    finally { setLoadingBusinesses(false); }
  }
  useEffect(()=>{ if(!user){setBusinesses([]);setBranches([]);setBusiness(null);setBranch(null);return;} refreshBusinesses().catch(()=>{}); },[user]);
  useEffect(()=>{
    let active=true;
    async function load(){ const id=idOf(business); if(!id){setBranches([]);setBranch(null);setBranchError("");return;}
      setLoadingBranches(true);setBranchError("");
      try { const list=await getBranches(id);if(!active)return;setBranches(list);setBranch(current=>list.find(x=>idOf(x)===idOf(current))||list.find(x=>x.isMainBranch)||list[0]||null); }
      catch(e){if(active){setBranches([]);setBranch(null);setBranchError(e.response?.data?.message||e.message);}}
      finally{if(active)setLoadingBranches(false);}
    }
    load();return()=>{active=false;};
  },[business]);
  async function addBusiness(values){const created=await createBusiness(values);const list=await refreshBusinesses();setBusiness(list.find(x=>idOf(x)===idOf(created))||created);return created;}
  async function addBranch(values){const id=idOf(business);if(!id)throw new Error("Create or select a business first.");const created=await createBranch(id,values);const list=await getBranches(id);setBranches(list);setBranch(list.find(x=>idOf(x)===idOf(created))||list[0]||null);return created;}
  const value=useMemo(()=>({businesses,branches,business,branch,setBusiness,setBranch,loadingBusinesses,loadingBranches,error,branchError,refreshBusinesses,addBusiness,addBranch}),[businesses,branches,business,branch,loadingBusinesses,loadingBranches,error,branchError]);
  return <BusinessContext.Provider value={value}>{children}</BusinessContext.Provider>;
}
export function useBusiness(){const value=useContext(BusinessContext);if(!value)throw new Error("useBusiness must be used inside BusinessProvider");return value;}
