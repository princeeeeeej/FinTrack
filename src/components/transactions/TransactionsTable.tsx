import { useState, useMemo, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { MoreVertical, Pencil, Trash2, X, Check } from "lucide-react";
import { userAtom } from "@/store/atoms";
import { formatDate } from "@/utils/formatters";
import { ITEMS_PER_PAGE } from "@/constants";
import Pagination from "@/components/common/Pagination";
import type { Transaction } from "@/types";

interface TransactionTableProps {
  transactions: Transaction[];
  onDelete: (id: string) => Promise<void>;
  onUpdate: (id: string, updates: Partial<Transaction>) => Promise<void>;
  categories: string[];
}

interface EditFormState {
  description: string;
  category: string;
  amount: string;
  type: "income" | "expense";
  date: string;
}

const TransactionsTable = ({
  transactions,
  onDelete,
  onUpdate,
  categories,
}: TransactionTableProps) => {
  const user = useRecoilValue(userAtom);
  const [openId, setOpenId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [editingTxn, setEditingTxn] = useState<Transaction | null>(null);
  const [editForm, setEditForm] = useState<EditFormState>({
    description: "",
    category: "",
    amount: "",
    type: "expense",
    date: "",
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { visibleTransactions, totalPages } = useMemo(() => {
    const sorted = [...transactions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
    const visibleTransactions = sorted.slice(
      (page - 1) * ITEMS_PER_PAGE,
      page * ITEMS_PER_PAGE
    );
    return { visibleTransactions, totalPages };
  }, [transactions, page]);

  const isAdmin = user === "admin";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpenId(null);
      }
    };
    if (openId) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openId]);

  const handleToggleMenu = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleEditClick = (txn: Transaction) => {
    setEditingTxn(txn);
    setEditForm({
      description: txn.description,
      category: txn.category,
      amount: txn.amount.toString(),
      type: txn.type,
      date: txn.date,
    });
    setOpenId(null);
  };

  const handleEditSave = async () => {
    if (!editingTxn) return;
    const parsedAmount = parseFloat(editForm.amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) return;

    setIsSaving(true);
    await onUpdate(editingTxn.id, {
      description: editForm.description.trim(),
      category: editForm.category,
      amount: parsedAmount,
      type: editForm.type,
      date: editForm.date,
    });
    setIsSaving(false);
    setEditingTxn(null);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteConfirmId(id);
    setOpenId(null);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirmId) return;
    setIsDeleting(true);
    await onDelete(deleteConfirmId);
    setIsDeleting(false);
    setDeleteConfirmId(null);
  };

  const renderDropdown = (txnId: string, txn: Transaction) => {
    if (!isAdmin) return null;

    return (
      <div className="relative" ref={openId === txnId ? dropdownRef : null}>
        <button
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          onClick={() => handleToggleMenu(txnId)}
          aria-label="Transaction actions"
        >
          <MoreVertical className="h-4 w-4 text-gray-400" />
        </button>
        {openId === txnId && (
          <div className="absolute right-0 top-8 bg-white shadow-xl border border-gray-200 rounded-xl py-1 w-36 z-20 animate-in fade-in duration-150">
            <button
              onClick={() => handleEditClick(txn)}
              className="flex items-center gap-2.5 w-full px-3 py-2 text-[13px] text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <Pencil className="h-3.5 w-3.5 text-gray-400" />
              Edit
            </button>
            <div className="border-t border-gray-100 mx-2" />
            <button
              onClick={() => handleDeleteClick(txnId)}
              className="flex items-center gap-2.5 w-full px-3 py-2 text-[13px] text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col p-3 sm:p-4 w-full rounded-2xl bg-white mb-6 border border-gray-300">
        <div className="flex items-start">
          <h2 className="font-medium text-lg">Transactions</h2>
        </div>

        <div className="flex flex-col gap-2 mt-3 sm:hidden">
          {visibleTransactions.map((txn) => (
            <div
              key={txn.id}
              className="flex items-center justify-between border border-gray-200 rounded-xl px-3 py-2.5 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  className={`cursor-pointer shrink-0 ${!isAdmin ? "invisible" : ""}`}
                  aria-label={`Select transaction ${txn.id}`}
                />
                <div className="flex flex-col">
                  <span className="text-[13px] font-medium">
                    {txn.category}
                  </span>
                  <span className="text-[11px] text-gray-400 mt-0.5">
                    {formatDate(txn.date)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex flex-col items-end">
                  <span
                    className={`text-[13px] font-semibold ${
                      txn.type === "income"
                        ? "text-emerald-600"
                        : "text-red-500"
                    }`}
                  >
                    {txn.type === "income" ? "+" : "-"}₹{txn.amount}
                  </span>
                  <span
                    className={`text-[11px] capitalize mt-0.5 ${
                      txn.type === "income"
                        ? "text-emerald-500"
                        : "text-red-400"
                    }`}
                  >
                    {txn.type}
                  </span>
                </div>
                {renderDropdown(txn.id, txn)}
              </div>
            </div>
          ))}
        </div>

        <div className="hidden sm:block border border-gray-200 w-full rounded-2xl mt-3 overflow-auto">
          <table className="w-full table-fixed border-collapse min-w-[900px]">
            <colgroup>
              <col style={{ width: "50px" }} />
              <col style={{ width: "12%" }} />
              <col style={{ width: "14%" }} />
              <col style={{ width: "auto" }} />
              <col style={{ width: "18%" }} />
              <col style={{ width: "14%" }} />
              <col style={{ width: "12%" }} />
              <col style={{ width: "60px" }} />
            </colgroup>
            <thead className="text-sm bg-gray-100 text-[#989898]">
              <tr>
                <th className="px-3 py-2 text-center">
                  <input
                    type="checkbox"
                    className={`cursor-pointer ${!isAdmin ? "invisible" : ""}`}
                    aria-label="Select all transactions"
                  />
                </th>
                <th className="px-3 py-2 text-left">Transaction ID</th>
                <th className="px-3 py-2 text-left">Date</th>
                <th className="px-3 py-2 text-left">Description</th>
                <th className="px-3 py-2 text-left">Category</th>
                <th className="px-3 py-2 text-left">Amount</th>
                <th className="px-3 py-2 text-left">Type</th>
                <th className="px-3 py-2 text-center"></th>
              </tr>
            </thead>
            <tbody className="text-[13px] font-medium">
              {visibleTransactions.map((txn) => (
                <tr
                  key={txn.id}
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-3 py-3 text-center">
                    <input
                      type="checkbox"
                      className={`cursor-pointer ${!isAdmin ? "invisible" : ""}`}
                      aria-label={`Select transaction ${txn.id}`}
                    />
                  </td>
                  <td className="px-3 py-3 truncate">{txn.id}</td>
                  <td className="px-3 py-3">{formatDate(txn.date)}</td>
                  <td className="px-3 py-3 truncate">{txn.description}</td>
                  <td className="px-3 py-3">{txn.category}</td>
                  <td
                    className={`px-3 py-3 ${
                      txn.type === "income"
                        ? "text-emerald-600"
                        : "text-red-500"
                    }`}
                  >
                    {txn.type === "income" ? "+" : "-"}₹{txn.amount}
                  </td>
                  <td
                    className={`px-3 py-3 capitalize ${
                      txn.type === "income"
                        ? "text-emerald-600"
                        : "text-red-500"
                    }`}
                  >
                    {txn.type}
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex justify-center items-center">
                      {renderDropdown(txn.id, txn)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </div>

      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setDeleteConfirmId(null)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 w-full max-w-sm mx-4 animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                <Trash2 className="h-5 w-5 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Delete Transaction
              </h3>
              <p className="text-sm text-gray-500">
                Are you sure you want to delete this transaction? This action
                cannot be undone.
              </p>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-500 rounded-xl hover:bg-red-600 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {editingTxn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setEditingTxn(null)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-lg mx-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Pencil className="h-4 w-4 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Edit Transaction
                </h3>
              </div>
              <button
                onClick={() => setEditingTxn(null)}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4 text-gray-400" />
              </button>
            </div>

            <div className="p-5 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-gray-600">
                  Description
                </label>
                <input
                  type="text"
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm((f) => ({ ...f, description: e.target.value }))
                  }
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  placeholder="Transaction description"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-gray-600">
                    Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={editForm.amount}
                    onChange={(e) =>
                      setEditForm((f) => ({ ...f, amount: e.target.value }))
                    }
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-gray-600">
                    Type
                  </label>
                  <div className="flex rounded-xl border border-gray-200 overflow-hidden">
                    <button
                      onClick={() =>
                        setEditForm((f) => ({ ...f, type: "income" }))
                      }
                      className={`flex-1 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                        editForm.type === "income"
                          ? "bg-emerald-500 text-white"
                          : "bg-white text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      Income
                    </button>
                    <button
                      onClick={() =>
                        setEditForm((f) => ({ ...f, type: "expense" }))
                      }
                      className={`flex-1 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                        editForm.type === "expense"
                          ? "bg-red-500 text-white"
                          : "bg-white text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      Expense
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-gray-600">
                    Category
                  </label>
                  <select
                    value={editForm.category}
                    onChange={(e) =>
                      setEditForm((f) => ({ ...f, category: e.target.value }))
                    }
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white cursor-pointer appearance-none"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-gray-600">
                    Date
                  </label>
                  <input
                    type="date"
                    value={editForm.date}
                    onChange={(e) =>
                      setEditForm((f) => ({ ...f, date: e.target.value }))
                    }
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 p-5 border-t border-gray-100">
              <button
                onClick={() => setEditingTxn(null)}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                disabled={
                  isSaving ||
                  !editForm.description.trim() ||
                  !editForm.amount ||
                  parseFloat(editForm.amount) <= 0
                }
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Check className="h-4 w-4" />
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TransactionsTable;
