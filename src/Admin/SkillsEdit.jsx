import React, { useEffect, useState } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";

const SkillsEdit = () => {
  const [skillsData, setskillsData] = useState([]);
  const [form, setform] = useState({
    Skill: "",
    Icon: "",
    Category: "",
    Order: "",
  });

  const [editingId, seteditingId] = useState(null);

  const fetchSkillsData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/get-skills`
      );
      setskillsData(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchSkillsData();
  }, []);

  const HandleSubmit = async (e) => {
    e.preventDefault();

    const existingOrder = skillsData.find(
      (skill) =>
        Number(skill.Order) === Number(form.Order)
    );

    if (existingOrder) {
      alert("Order Already Exists");
      return;
    }
    try {
      if (editingId) {
        await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/update-skills/${editingId}`,
          form
        );
        alert("Skill Updated");
      } else {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/add-skills`,
          form
        );
        alert("Skill Added");
      }
      seteditingId(null);
      fetchSkillsData();
      setform({ Skill: "", Icon: "", Category: "", Order: "" });
    } catch (err) {
      console.log(err);
    }
  };

  const HandleDelete = async (editingId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/delete-skills/${editingId}`
      );
      fetchSkillsData();
      alert("Skill Deleted");
    } catch (err) {
      console.log(err);
    }
  };

  const HandleEdit = (item) => {
    setform({
      Skill: item.Skill,
      Icon: item.Icon,
      Category: item.Category,
      Order: item.Order,
    });
    seteditingId(item._id);
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <section className="p-6 max-w-2xl mx-auto">
        <div className="text-[1.2em] md:text-[1.7em] text-center uppercase my-2">
          Skills Edit Page
        </div>
        <form onSubmit={HandleSubmit} className="flex flex-col gap-3 my-5">
          <input
            required
            className="text-black border p-2 w-full"
            type="text"
            onChange={handleChange}
            value={form.Skill}
            name="Skill"
            placeholder="Enter Skill"
          />

          <input
            required
            className="text-black border p-2 w-full"
            type="text"
            onChange={handleChange}
            value={form.Icon}
            name="Icon"
            placeholder="Enter Icon"
          />

          <label htmlFor="Category">Select Category:</label>
          <select
            value={form.Category}
            onChange={handleChange}
            className="text-black border p-2 w-full"
            name="Category"
            id="Category"
          >
            <option value="">-- Select Category --</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Others">Others</option>
          </select>

          <input
            required
            className="text-black border p-2 w-full"
            type="number"
            onChange={handleChange}
            value={form.Order}
            name="Order"
            placeholder="Enter Order"
          />

          <button type="submit" className="bg-blue-500 text-white px-4 py-2">
            {editingId ? "Update Skill" : "Add Skill"}
          </button>
        </form>
      </section>

      <section className="max-w-5xl mx-auto">
        <div className="flex flex-col justify-center">
          {skillsData.map((item, id) => (
            <div
              key={id}
              className="border border-[#b14fc4] bg-[#171721] rounded-xl mx-[10%] my-5 px-16 pb-8  opacity-80 shadow-[0_0_10px_#d607ed]"
            >
              <div className="flex">
                <div className="text-center text-[1.3em] my-4 font-bold">
                  {item.Skill}
                </div>
                <Icon icon={item.Icon} width="32" height="32" />
              </div>
              <div className="text-center text-[1.3em] my-4 font-bold">
                {item.Category}
              </div>

              <div className="flex justify-center pt-4 pb-2">
                <button
                  onClick={() => {
                    HandleEdit(item);
                  }}
                  className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => HandleDelete(item._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SkillsEdit;
