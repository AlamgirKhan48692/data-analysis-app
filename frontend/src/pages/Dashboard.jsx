import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaCloudUploadAlt,
  FaSignOutAlt,
  FaFileAlt,
} from "react-icons/fa";

import {
  uploadDataset,
  getDatasets,
} from "../services/dataset";

import DatasetSummary from "../components/dataset/DatasetSummary";
import DatasetPreview from "../components/dataset/DatasetPreview";
import DatasetHistory from "../components/dataset/DatasetHistory";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.username;

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataset, setDataset] = useState(null);
  const [profile, setProfile] = useState(null);
  const [datasets, setDatasets] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const loadDatasets = async () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const response = await getDatasets(token);

      if (response.success) {
        setDatasets(response.datasets);
      }
    } catch (error) {
      console.error("Error loading datasets:", error);
    }
  };

  useEffect(() => {
    loadDatasets();
  }, []);

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a dataset first.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Session expired. Please login again.");
      navigate("/");
      return;
    }

    try {
      setLoading(true);

      const response = await uploadDataset(selectedFile, token);

      if (response.success) {
        setDataset(response.dataset);
        setProfile(response.profile);

        await loadDatasets();

        setSelectedFile(null);

        toast.success(response.message);

        console.log("Dataset:", response.dataset);
        console.log("Profile:", response.profile);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">
            Smart Dataset Analyzer
          </h1>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-8 px-5">
        {/* Welcome Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            👋 Welcome back,{" "}
            <span className="text-green-600 font-extrabold">{username}</span>
          </h2>

          <p className="text-base text-gray-500">
            Upload a CSV, Excel or JSON dataset to begin your
            data analysis journey.
          </p>
        </div>

        {/* Upload Card */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="border-2 border-dashed border-blue-300 rounded-2xl p-8 text-center bg-slate-50">
            <FaCloudUploadAlt className="text-6xl text-blue-600 mx-auto mb-4" />

            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              Upload Dataset
            </h2>

            <p className="text-gray-500 mb-4">
              Drag & Drop your dataset here
            </p>

            <p className="text-gray-400 my-3">OR</p>

            <input
              type="file"
              id="dataset"
              hidden
              accept=".csv,.xlsx,.xls,.json"
              onChange={handleFileChange}
            />

            <label
              htmlFor="dataset"
              className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              Choose Dataset
            </label>

            <p className="text-gray-400 mt-5 text-sm">
              Supported: CSV • XLSX • XLS • JSON
            </p>
          </div>

          {/* Selected File */}
          {selectedFile && (
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-4">
              <FaFileAlt className="text-2xl text-blue-600" />

              <div>
                <h3 className="font-semibold text-base">
                  {selectedFile.name}
                </h3>

                <p className="text-gray-500 text-sm">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={loading}
            className="w-full mt-5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-xl text-lg font-semibold transition"
          >
            {loading ? "Uploading..." : "Upload Dataset"}
          </button>
        </div>

        <DatasetSummary
          dataset={dataset}
          profile={profile}
        />

        <DatasetPreview
          profile={profile}
        />

        <DatasetHistory
          datasets={datasets}
        />
      </div>
    </div>
  );
}

export default Dashboard;