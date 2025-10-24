import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";

const Skils = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchskilldata = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/get-skills`
      );
      setData(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(true);
    }
  };

  useEffect(() => {
    fetchskilldata();
  }, []);
  return (
    <div className="mt-5 w-screen xl:w-[80%] mx-auto my-0">
      <div className="text-center text-[2em] font-bold mt-3">Skills</div>
      <div className="text-center text-[1.2em] opacity-60 mt-5 mb-14 px-10">
        Here are some of my skills on which I have learnt.
      </div>

      <div className="flex justify-center md:justify-evenly text-center flex-col lg:flex-row">
        <section className="border border-[#b14fc4] bg-[#171721] rounded-xl px-0 mx-[10%] my-5 md:px-1 pb-8 lg:mx-0 lg:my-0 opacity-80 shadow-[0_0_10px_#d607ed]">
          <div className="text-center text-[1.8em] my-4 font-bold">
            Frontend
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 px-[10%]">
            {data
              .filter((fill) => fill.Category === "Frontend")
              .map((sk, key) => (
                <div key={key}>
                  <h3 className="border border-white rounded-lg px-3 py-2 flex justify-center items-center gap-2">
                    <Icon icon={sk.Icon} width="30" height="30" className="flex-shrink-0"/>
                    {sk.Skill}
                  </h3>
                </div>
              ))}
          </div>
        </section>

        <section className="border border-[#b14fc4] bg-[#171721] rounded-xl px-0 mx-[10%] my-5 md:px-16 pb-8 lg:mx-0 lg:my-0 opacity-80 shadow-[0_0_10px_#d607ed]">
          <div className="text-center text-[1.8em] my-4 font-bold">Backend</div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 px-[10%]">
            {data
              .filter((fill) => fill.Category === "Backend")
              .map((sk, key) => (
                <div key={key}>
                  <h3 className="border border-white rounded-lg px-3 py-2 flex justify-center items-center gap-2">
                    <Icon icon={sk.Icon} width="30" height="30" className="flex-shrink-0"/>
                    {sk.Skill}
                  </h3>
                </div>
              ))}
          </div>
        </section>
      </div>

      <div className="flex justify-center md:justify-evenly text-center flex-col lg:flex-row mt-[1em] md:mt-[2em]">
        <section className="border border-[#b14fc4] bg-[#171721] rounded-xl px-0 mx-[10%] my-5 md:px-16 pb-8 lg:mx-0 lg:my-0 opacity-80 shadow-[0_0_10px_#d607ed]">
          <div className="text-center text-[1.8em] my-4 font-bold">Others</div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 px-[10%]">
            {data
              .filter((fill) => fill.Category === "Others")
              .map((sk, key) => (
                <div key={key}>
                  <h3 className="border border-white rounded-lg px-3 py-2 flex justify-center items-center gap-2">
                    <Icon icon={sk.Icon} width="30" height="30" className="flex-shrink-0"/>
                    {sk.Skill}
                  </h3>
                </div>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Skils;
