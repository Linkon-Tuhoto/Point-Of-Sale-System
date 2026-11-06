import { useState } from "react";
import { Plus, Search, Trash2, X } from "lucide-react";
import DashboardLayout from "../layout/DashboardLayout";
import StatCard from "./StatCard";
import { formatMoney, getSavedData, saveData } from "../../utils/demoData";

function DataPage({ title, subtitle, navigation, accountName, accountRole, workspace, storageKey, initialData = [], fields = [], columns = [], stats = [], addLabel = "Add new" }) {
  const [items, setItems] = useState(() => getSavedData(storageKey, initialData));
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({});

  function updateField(name, value) { setForm({ ...form, [name]: value }); }
  function addItem(e) {
    e.preventDefault();
    const newItem = { id: `${Date.now()}`, ...form, createdAt: new Date().toISOString() };
    const updated = [...items, newItem];
    setItems(updated);
    saveData(storageKey, updated);
    setForm({});
    setShowForm(false);
  }
  function deleteItem(id) {
    if (!window.confirm("Delete this record from the demo?")) return;
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    saveData(storageKey, updated);
  }

  const filtered = items.filter((item) => Object.values(item).join(" ").toLowerCase().includes(search.toLowerCase()));

  return <DashboardLayout title={title} subtitle={subtitle} navigation={navigation} accountName={accountName} accountRole={accountRole} workspace={workspace}>
    {stats.length > 0 && <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map((stat) => <StatCard key={stat.title} {...stat} />)}</div>}
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 p-5"><div><h3 className="font-semibold text-[#172B4D]">{title} list</h3><p className="mt-1 text-xs text-slate-500">{items.length} records · Demo data saved in this browser</p></div><button onClick={() => { setForm({}); setShowForm(true); }} className="inline-flex items-center gap-2 rounded-lg bg-[#172B4D] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#243D62]"><Plus size={17} />{addLabel}</button></div>
      <div className="border-b border-slate-100 p-4"><div className="flex max-w-md items-center gap-2 rounded-lg border border-slate-300 px-3 py-2.5"><Search size={17} className="text-slate-400" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={`Search ${title.toLowerCase()}...`} className="w-full text-sm outline-none" /></div></div>
      <div className="overflow-x-auto"><table className="w-full min-w-[650px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr>{columns.map((column) => <th key={column.key} className="px-5 py-4 font-medium">{column.label}</th>)}<th className="px-5 py-4 text-right font-medium">Action</th></tr></thead><tbody className="divide-y divide-slate-100">{filtered.map((item) => <tr key={item.id} className="hover:bg-slate-50">{columns.map((column) => <td key={column.key} className="px-5 py-4 text-slate-600">{column.key === "amount" ? formatMoney(item[column.key]) : column.key === "status" ? <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">{item[column.key] || "Active"}</span> : item[column.key] || "—"}</td>)}<td className="px-5 py-4 text-right"><button onClick={() => deleteItem(item.id)} title="Delete demo record" className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"><Trash2 size={16} /></button></td></tr>)}{filtered.length === 0 && <tr><td colSpan={columns.length + 1} className="px-5 py-12 text-center text-sm text-slate-500">No records found. Add a record or change your search.</td></tr>}</tbody></table></div>
    </div>

    {showForm && <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/40 p-4" onClick={() => setShowForm(false)}><div className="w-full max-w-lg rounded-2xl bg-white shadow-xl" onClick={(e) => e.stopPropagation()}><div className="flex items-center justify-between border-b border-slate-200 p-5"><div><h3 className="font-semibold text-[#172B4D]">{addLabel}</h3><p className="mt-1 text-xs text-slate-500">Enter the details below.</p></div><button onClick={() => setShowForm(false)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><X size={19} /></button></div><form onSubmit={addItem} className="space-y-4 p-5">{fields.map((field) => <div key={field.name}><label className="mb-2 block text-sm font-medium text-slate-700">{field.label}</label>{field.type === "select" ? <select required={field.required !== false} value={form[field.name] || ""} onChange={(e) => updateField(field.name, e.target.value)} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm"><option value="">Select {field.label.toLowerCase()}</option>{field.options.map((option) => <option key={option} value={option}>{option}</option>)}</select> : <input required={field.required !== false} type={field.type || "text"} min={field.type === "number" ? "0" : undefined} value={form[field.name] || ""} onChange={(e) => updateField(field.name, field.type === "number" ? Number(e.target.value) : e.target.value)} placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`} className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-[#355C7D]" />}</div>)}<div className="flex justify-end gap-3 border-t border-slate-100 pt-4"><button type="button" onClick={() => setShowForm(false)} className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-600">Cancel</button><button className="rounded-lg bg-[#172B4D] px-5 py-2.5 text-sm font-medium text-white">Save record</button></div></form></div></div>}
  </DashboardLayout>;
}
export default DataPage;
